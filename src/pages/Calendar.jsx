import { useState, useMemo, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getDaysInMonth, startOfMonth, getDay, format } from 'date-fns';
import { ChevronLeft, ChevronRight, Loader2, Heart, Share2, Star, BookOpen } from 'lucide-react';
import { getSaintsForYear, getLiturgicalForYear, UserFavorite } from '@/api/entities';
import { SUNDAY_READINGS } from '@/api/readingsData';
import SaintDetailModal from '@/components/SaintDetailModal';
import ReadingsModal from '@/components/ReadingsModal';
import { Button } from '@/components/ui/button';
import { useRite } from '@/hooks/use-rite';
import { usePatronSaint } from '@/hooks/use-patron-saint';
import { liturgicalColorDotClass, rankPriority } from '@/utils';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/lib/LanguageContext';
import { T } from '@/lib/translations';

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

// Maps liturgical color name → Tailwind left-border color class for commemoration cards
const BORDER_LEFT = {
  white:  'border-l-stone-300',
  red:    'border-l-red-500',
  green:  'border-l-green-600',
  purple: 'border-l-purple-700',
  rose:   'border-l-pink-400',
  black:  'border-l-gray-900',
};

const RANK_COLORS = {
  'Duplex I Classis':  'text-yellow-600',
  'Duplex II Classis': 'text-amber-600',
  'Duplex Majus':      'text-amber-500',
  'Duplex':            'text-gold',
  'Semiduplex':        'text-muted-foreground',
  'Simplex':           'text-muted-foreground',
  'Solemnity':         'text-yellow-600',
  'Feast':             'text-amber-600',
  'Memorial':          'text-gold',
  'Optional Memorial': 'text-muted-foreground',
  'Feria':             'text-muted-foreground',
};

function RiteToggle({ rite, onChange }) {
  return (
    <div className="flex items-center bg-secondary rounded-lg p-1 gap-1">
      {[
        { key: 'NO', label: 'Novus Ordo' },
        { key: 'VO', label: 'Vetus Ordo' },
      ].map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`flex-1 px-3 py-1.5 rounded-md text-xs font-inter font-semibold transition-all ${
            rite === key
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

// Returns true if an entry is a moveable feast (year-keyed ID)
function isMovable(entry, year) {
  return entry?.id?.includes(`-${year}`);
}

export default function Calendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const isCurrentMonthAndYear = month === today.getMonth() && year === today.getFullYear();
  const [selectedSaint, setSelectedSaint] = useState(null);
  const [selectedLiturgical, setSelectedLiturgical] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [readingsEntry, setReadingsEntry] = useState(null);
  const [readingsOpen, setReadingsOpen] = useState(false);
  const [rite, setRite] = useRite();
  const [,, patronFeastMMDD] = usePatronSaint();
  const { toast } = useToast();
  const qc = useQueryClient();
  const [lang] = useLanguage();
  const t = T[lang];

  const { data: saints = [], isLoading } = useQuery({
    queryKey: ['saints-for-year', year, rite],
    queryFn: () => getSaintsForYear(year, rite),
  });

  const { data: liturgicalDays = [] } = useQuery({
    queryKey: ['liturgical-for-year', year],
    queryFn: () => getLiturgicalForYear(year),
  });

  const { data: favorites = [] } = useQuery({
    queryKey: ['favorites'],
    queryFn: () => UserFavorite.list(),
  });

  const savedNames = useMemo(
    () => new Set(favorites.map(f => f.saint_name)),
    [favorites]
  );

  const { mutate: saveFavorite } = useMutation({
    mutationFn: (saint) => UserFavorite.create({
      saint_name: saint.name,
      quote: saint.quote,
      feast_date: saint.feast_date,
      saved_date: format(new Date(), 'yyyy-MM-dd'),
    }),
    onSuccess: (_, saint) => {
      qc.invalidateQueries({ queryKey: ['favorites'] });
      toast({ title: t.toast_saved, description: saint.name });
    },
  });

  const { mutate: removeFavorite } = useMutation({
    mutationFn: async (saintName) => {
      const fav = favorites.find(f => f.saint_name === saintName);
      if (fav) await UserFavorite.delete(fav.id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['favorites'] }),
  });

  // Primary liturgical entry per date: movable feasts always win, then rank
  const liturgicalByDate = useMemo(() => {
    const result = {};
    liturgicalDays.forEach(d => {
      if (!d.date) return;
      if (!result[d.date]) { result[d.date] = d; return; }
      const existing = result[d.date];
      const existingMovable = isMovable(existing, year);
      const newMovable = isMovable(d, year);
      if (existingMovable && !newMovable) return;
      if (!existingMovable && newMovable) { result[d.date] = d; return; }
      const existingRank = rite === 'VO' ? existing.vetus_ordo_rank : existing.novus_ordo_rank;
      const newRank = rite === 'VO' ? d.vetus_ordo_rank : d.novus_ordo_rank;
      if (rankPriority(newRank, rite) < rankPriority(existingRank, rite)) result[d.date] = d;
    });
    return result;
  }, [liturgicalDays, rite, year]);

  // Primary saint per date: movable saints always win
  const saintsByDate = useMemo(() => {
    const saintGroups = {};
    const litGroups   = {};
    saints.forEach(s => {
      if (!s.feast_date) return;
      (saintGroups[s.feast_date] = saintGroups[s.feast_date] || []).push(s);
    });
    liturgicalDays.forEach(l => {
      if (!l.date) return;
      (litGroups[l.date] = litGroups[l.date] || []).push(l);
    });
    const result = {};
    Object.keys(saintGroups).forEach(date => {
      const sArr = saintGroups[date];
      if (sArr.length === 1) { result[date] = sArr[0]; return; }
      const movable = sArr.find(s => isMovable(s, year));
      if (movable) { result[date] = movable; return; }
      const lArr = litGroups[date] || [];
      if (lArr.length === 0) { result[date] = sArr[0]; return; }
      let bestIdx = 0, bestP = Infinity;
      lArr.forEach((l, i) => {
        const r = rite === 'VO' ? l.vetus_ordo_rank : l.novus_ordo_rank;
        const p = rankPriority(r, rite);
        if (p < bestP) { bestP = p; bestIdx = i; }
      });
      result[date] = sArr[bestIdx] ?? sArr[0];
    });
    return result;
  }, [saints, liturgicalDays, rite, year]);

  // All liturgical entries per date, sorted movable-first then by rank priority
  const liturgicalGroupByDate = useMemo(() => {
    const result = {};
    liturgicalDays.forEach(d => {
      if (!d.date) return;
      (result[d.date] = result[d.date] || []).push(d);
    });
    Object.values(result).forEach(arr =>
      arr.sort((a, b) => {
        const aM = isMovable(a, year) ? 0 : 1;
        const bM = isMovable(b, year) ? 0 : 1;
        if (aM !== bM) return aM - bM;
        const ra = rite === 'VO' ? a.vetus_ordo_rank : a.novus_ordo_rank;
        const rb = rite === 'VO' ? b.vetus_ordo_rank : b.novus_ordo_rank;
        return rankPriority(ra, rite) - rankPriority(rb, rite);
      })
    );
    return result;
  }, [liturgicalDays, rite, year]);

  // All saints per date, movable-first
  const saintsGroupByDate = useMemo(() => {
    const result = {};
    saints.forEach(s => {
      if (!s.feast_date) return;
      (result[s.feast_date] = result[s.feast_date] || []).push(s);
    });
    Object.values(result).forEach(arr =>
      arr.sort((a, b) => (isMovable(a, year) ? 0 : 1) - (isMovable(b, year) ? 0 : 1))
    );
    return result;
  }, [saints, year]);

  const readingsDates = useMemo(
    () => new Set(SUNDAY_READINGS.map(r => r.date)),
    []
  );

  const daysInMonth = getDaysInMonth(new Date(year, month));
  const firstDayOfWeek = getDay(startOfMonth(new Date(year, month)));

  const touchStart    = useRef(null);
  const dayListRefs   = useRef({});

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  const handleTouchStart = (e) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const handleTouchEnd = (e) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
    if (dx < 0) nextMonth(); else prevMonth();
  };

  const getRiteInfo = (key) => {
    const l = liturgicalByDate[key];
    if (!l) return null;
    return rite === 'VO'
      ? { feast: l.vetus_ordo_feast, rank: l.vetus_ordo_rank, color: l.vetus_ordo_color }
      : { feast: l.novus_ordo_feast, rank: l.novus_ordo_rank, color: l.novus_ordo_color };
  };

  const isFeria = (feast) => !feast || feast === 'Feria';

  const handleDayClick = (day) => {
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    const key = `${mm}-${dd}`;
    const saint = saintsByDate[key];
    if (saint) {
      setSelectedSaint(saint);
      setSelectedLiturgical(liturgicalByDate[key] ?? null);
      setModalOpen(true);
      return;
    }
    const isoDate = `${year}-${mm}-${dd}`;
    if (readingsDates.has(isoDate)) {
      dayListRefs.current[key]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openEntryModal = (saint, liturgical) => {
    if (!saint) return;
    setSelectedSaint(saint);
    setSelectedLiturgical(liturgical ?? null);
    setModalOpen(true);
  };

  const handleShareFeast = async (e, info, saint, day) => {
    e.stopPropagation();
    const datePart = `${MONTH_NAMES[month]} ${day}`;
    const text = saint?.quote
      ? `"${saint.quote}" — ${saint.name}\n${info.feast} · ${datePart}`
      : `${info.feast} · ${datePart}`;
    if (navigator.share) {
      await navigator.share({ title: info.feast, text });
    } else {
      await navigator.clipboard.writeText(text);
      toast({ title: t.toast_copied });
    }
  };

  const toggleFavorite = (e, saint) => {
    e.stopPropagation();
    navigator.vibrate?.(10);
    if (savedNames.has(saint.name)) {
      removeFavorite(saint.name);
    } else {
      saveFavorite(saint);
    }
  };

  // All feast entries per day this month: primary entry first, then commemorations.
  // Saints are matched to liturgical entries by type (movable→movable, static→static)
  // so a generic Sunday doesn't steal the static saint away from its own entry.
  const monthFeasts = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    const key = `${mm}-${dd}`;
    const litGroup = liturgicalGroupByDate[key] || [];
    const saintGroup = saintsGroupByDate[key] || [];

    const movSaints  = saintGroup.filter(s =>  isMovable(s, year));
    const statSaints = saintGroup.filter(s => !isMovable(s, year));
    let movIdx = 0, statIdx = 0;

    const entries = litGroup
      .map((l) => {
        const info = rite === 'VO'
          ? { feast: l.vetus_ordo_feast, rank: l.vetus_ordo_rank, color: l.vetus_ordo_color }
          : { feast: l.novus_ordo_feast, rank: l.novus_ordo_rank, color: l.novus_ordo_color };
        if (!info || isFeria(info.feast)) return null;
        const saint = isMovable(l, year)
          ? (movSaints[movIdx++]  ?? null)
          : (statSaints[statIdx++] ?? null);
        return { info, saint, liturgical: l };
      })
      .filter(Boolean)
      .map((e, i) => ({ ...e, isPrimary: i === 0 }));

    if (entries.length === 0) return null;
    return { day, key, entries };
  }).filter(Boolean);

  const upcomingFeasts = isCurrentMonthAndYear
    ? monthFeasts.filter(({ day }) => day >= today.getDate())
    : monthFeasts;
  const pastFeasts = isCurrentMonthAndYear
    ? monthFeasts.filter(({ day }) => day < today.getDate())
    : [];

  return (
    <div className="px-5 pt-12 pb-12 max-w-lg mx-auto">
      <p className="font-inter text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-1">
        {t.liturgical_calendar}
      </p>
      <h1 className="font-playfair text-3xl font-bold text-foreground mb-4">{t.saints_title}</h1>

      {/* Rite toggle */}
      <RiteToggle rite={rite} onChange={setRite} />

      {/* Month navigator */}
      <div className="flex items-center justify-between mt-4 mb-3">
        <Button variant="ghost" size="icon" onClick={prevMonth}>
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div className="flex flex-col items-center">
          <h2 className="font-playfair text-xl font-semibold text-foreground">
            {MONTH_NAMES[month]} {year}
          </h2>
          {!isCurrentMonthAndYear && (
            <button
              onClick={() => { setMonth(today.getMonth()); setYear(today.getFullYear()); }}
              className="font-inter text-[10px] font-semibold tracking-wider uppercase text-gold hover:underline mt-0.5 transition-opacity"
            >
              ↩ Today
            </button>
          )}
        </div>
        <Button variant="ghost" size="icon" onClick={nextMonth}>
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Day headers */}
      <div
        className="grid grid-cols-7 mb-1"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
          <div key={d} className="text-center font-inter text-xs text-muted-foreground py-1">{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div
          className="grid grid-cols-7"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
            const mm = String(month + 1).padStart(2, '0');
            const dd = String(day).padStart(2, '0');
            const key = `${mm}-${dd}`;
            const info = getRiteInfo(key);
            const hasFeast = info && !isFeria(info.feast);
            const hasSaint = Boolean(saintsByDate[key]);
            const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            const isPast = isCurrentMonthAndYear && day < today.getDate();
            const isPatronFeast = patronFeastMMDD === key;
            const dotColor = hasFeast ? liturgicalColorDotClass(info.color) : null;
            const isoDate = `${year}-${mm}-${dd}`;
            const hasReadings = readingsDates.has(isoDate);

            return (
              <button
                key={day}
                onClick={() => handleDayClick(day)}
                className={`relative flex flex-col items-center py-1.5 rounded-lg transition-colors ${
                  hasSaint || hasReadings ? 'cursor-pointer hover:bg-secondary' : 'cursor-default'
                } ${isPast ? 'opacity-40' : ''}`}
              >
                {isPatronFeast && (
                  <span className="absolute top-0.5 right-1 pointer-events-none">
                    <Star className="w-2 h-2 text-gold" fill="currentColor" />
                  </span>
                )}
                <span className={`
                  w-8 h-8 flex items-center justify-center rounded-full text-sm font-inter transition-colors
                  ${isToday ? 'bg-gold text-white font-bold' : isPast ? 'text-muted-foreground' : 'text-foreground'}
                `}>
                  {day}
                </span>
                {/* Dot row — always rendered for consistent cell height */}
                <div className="flex items-center gap-0.5 mt-0.5 h-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${hasFeast ? dotColor : 'invisible'}`} />
                  <BookOpen className={`w-2 h-2 text-gold ${hasReadings ? '' : 'invisible'}`} />
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Feast list for this month */}
      {(upcomingFeasts.length > 0 || pastFeasts.length > 0) && (
        <div className="mt-6">
          <p className="font-inter text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-3">
            {MONTH_NAMES[month]} · {rite === 'NO' ? t.ordinary_form : t.extraordinary_form}
          </p>
          <div className="flex flex-col gap-3">
            {[
              ...upcomingFeasts,
              ...(pastFeasts.length > 0 && upcomingFeasts.length > 0 ? [{ divider: true }] : []),
              ...pastFeasts,
            ].map((item) => {
              if (item.divider) {
                return (
                  <div key="past-divider" className="flex items-center gap-3 my-1">
                    <div className="h-px flex-1 bg-border" />
                    <span className="font-inter text-[10px] font-semibold tracking-[0.12em] uppercase text-muted-foreground/60">Past</span>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                );
              }
              const { day, key, entries } = item;
              const isPastDay = isCurrentMonthAndYear && day < today.getDate();
              const isoDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const dayReadings = SUNDAY_READINGS.find(r => r.date === isoDate) ?? null;
              return (
              <div key={key} ref={el => { dayListRefs.current[key] = el; }} className={`flex flex-col gap-1.5 ${isPastDay ? 'opacity-50' : ''}`}>
                {entries.map(({ info, saint, liturgical, isPrimary }, idx) => {
                  const isSaved = saint && savedNames.has(saint.name);
                  const isDayToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                  const isPatronFeast = patronFeastMMDD === key;

                  // Primary entry with no saint — compact label row, no card chrome
                  // Skip if a readings card will serve as the primary card for this day
                  if (isPrimary && !saint) {
                    if (dayReadings) return null;
                    return (
                      <div key={`${key}-${idx}`} className="flex items-center gap-3 px-1 py-1.5">
                        <div className="flex flex-col items-center shrink-0 w-9">
                          <span className="font-inter text-[10px] text-muted-foreground/50 leading-none uppercase">{MONTH_NAMES[month].slice(0, 3)}</span>
                          <span className={`font-playfair text-base font-bold leading-tight ${isDayToday ? 'text-gold' : 'text-muted-foreground'}`}>{day}</span>
                        </div>
                        <span className={`w-2 h-2 rounded-full shrink-0 ${liturgicalColorDotClass(info.color)}`} />
                        <p className="font-inter text-xs text-muted-foreground flex-1 min-w-0 truncate">{info.feast}</p>
                      </div>
                    );
                  }

                  // Primary entry with saint — full card
                  if (isPrimary) {
                    return (
                      <button
                        key={`${key}-${idx}`}
                        onClick={() => openEntryModal(saint, liturgical)}
                        className={`flex items-start gap-3 text-left bg-card rounded-xl border px-4 py-3 transition-colors w-full hover:bg-secondary cursor-pointer ${isDayToday ? 'border-gold/30' : 'border-border'}`}
                      >
                        <div className="flex flex-col items-center shrink-0 w-9 pt-0.5">
                          <span className="font-inter text-xs text-muted-foreground leading-none">{MONTH_NAMES[month].slice(0, 3)}</span>
                          <span className={`font-playfair text-lg font-bold leading-tight ${isDayToday ? 'text-gold' : 'text-foreground'}`}>{day}</span>
                          {isDayToday && <span className="font-inter text-[9px] text-gold font-semibold uppercase leading-none mt-0.5">Today</span>}
                          {isPatronFeast && !isDayToday && <Star className="w-3 h-3 text-gold mt-0.5" fill="currentColor" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className={`w-2 h-2 rounded-full shrink-0 ${liturgicalColorDotClass(info.color)}`} />
                            <span className={`font-inter text-xs font-semibold ${RANK_COLORS[info.rank] ?? 'text-muted-foreground'}`}>
                              {info.rank}
                            </span>
                          </div>
                          <p className="font-inter text-sm font-semibold text-foreground">{info.feast}</p>
                          <p className="font-inter text-xs text-muted-foreground mt-0.5">{t.tap_for_bio}</p>
                        </div>
                        <div className="flex items-center gap-1 self-center">
                          <button
                            onClick={(e) => handleShareFeast(e, info, saint, day)}
                            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-secondary text-muted-foreground hover:text-foreground"
                            aria-label="Share feast"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => toggleFavorite(e, saint)}
                            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gold/10"
                            aria-label={isSaved ? 'Remove from favorites' : 'Save to favorites'}
                          >
                            <Heart className={`w-4 h-4 transition-colors ${isSaved ? 'fill-gold text-gold' : 'text-muted-foreground'}`} />
                          </button>
                        </div>
                      </button>
                    );
                  }

                  // Commemoration entry — colored left-accent card
                  return (
                    <button
                      key={`${key}-${idx}`}
                      onClick={() => openEntryModal(saint, liturgical)}
                      className={`flex items-start gap-3 text-left bg-card rounded-xl border border-border border-l-[3px] ${BORDER_LEFT[info.color] ?? 'border-l-border'} px-4 py-3 transition-colors w-full ${
                        saint ? 'hover:bg-secondary cursor-pointer' : 'cursor-default opacity-60'
                      }`}
                    >
                      <div className="shrink-0 w-9" />
                      <div className="flex-1 min-w-0">
                        <p className="font-inter text-[10px] font-semibold tracking-wider uppercase text-muted-foreground mb-1.5">
                          {t.commemoration}
                        </p>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className={`w-2 h-2 rounded-full shrink-0 ${liturgicalColorDotClass(info.color)}`} />
                          <span className={`font-inter text-xs font-semibold ${RANK_COLORS[info.rank] ?? 'text-muted-foreground'}`}>
                            {info.rank}
                          </span>
                        </div>
                        <p className="font-inter text-sm font-semibold text-foreground">{info.feast}</p>
                        {saint && <p className="font-inter text-xs text-muted-foreground mt-0.5">{t.tap_for_bio}</p>}
                      </div>
                      <div className="flex items-center gap-1 self-center">
                        <button
                          onClick={(e) => handleShareFeast(e, info, saint, day)}
                          className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-secondary text-muted-foreground hover:text-foreground"
                          aria-label="Share feast"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                        {saint && (
                          <button
                            onClick={(e) => toggleFavorite(e, saint)}
                            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gold/10"
                            aria-label={isSaved ? 'Remove from favorites' : 'Save to favorites'}
                          >
                            <Heart className={`w-4 h-4 transition-colors ${isSaved ? 'fill-gold text-gold' : 'text-muted-foreground'}`} />
                          </button>
                        )}
                      </div>
                    </button>
                  );
                })}
                {dayReadings && (() => {
                  const rd = rite === 'VO' ? dayReadings.vo : dayReadings.no;
                  const title = (lang === 'es' && rd.title_es) ? rd.title_es : rd.title;
                  const isDayToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                  return (
                    <button
                      onClick={() => { setReadingsEntry(dayReadings); setReadingsOpen(true); }}
                      className="flex items-start gap-3 text-left bg-gold/5 rounded-xl border border-gold/30 px-4 py-3 transition-colors w-full hover:bg-gold/10 cursor-pointer"
                    >
                      <div className="flex flex-col items-center shrink-0 w-9 pt-0.5">
                        <span className="font-inter text-xs text-gold/60 leading-none">{MONTH_NAMES[month].slice(0, 3)}</span>
                        <span className={`font-playfair text-lg font-bold leading-tight ${isDayToday ? 'text-gold' : 'text-foreground'}`}>{day}</span>
                        {isDayToday && <span className="font-inter text-[9px] text-gold font-semibold uppercase leading-none mt-0.5">Today</span>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <BookOpen className="w-3 h-3 text-gold shrink-0" />
                          <span className="font-inter text-xs font-semibold text-gold">
                            {lang === 'es' ? 'Lecturas de la Misa' : 'Mass Readings'}
                          </span>
                        </div>
                        <p className="font-inter text-sm font-semibold text-foreground">{title}</p>
                        <p className="font-inter text-xs text-muted-foreground mt-0.5">
                          {lang === 'es' ? 'Toca para leer' : 'Tap to read'}
                        </p>
                      </div>
                      <BookOpen className="w-4 h-4 text-gold self-center shrink-0" />
                    </button>
                  );
                })()}
              </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Colour legend */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-8 mb-6 justify-center">
        {[
          { color: 'white',  label: 'White' },
          { color: 'red',    label: 'Red' },
          { color: 'green',  label: 'Green' },
          { color: 'purple', label: 'Purple' },
          { color: 'rose',   label: 'Rose' },
          { color: 'black',  label: 'Black' },
        ].map(({ color, label }) => (
          <div key={color} className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${liturgicalColorDotClass(color)}`} />
            <span className="font-inter text-xs text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>

      <SaintDetailModal
        saint={selectedSaint}
        liturgical={selectedLiturgical}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        lang={lang}
      />
      <ReadingsModal
        entry={readingsEntry}
        open={readingsOpen}
        onClose={() => setReadingsOpen(false)}
        rite={rite}
        lang={lang}
      />
    </div>
  );
}
