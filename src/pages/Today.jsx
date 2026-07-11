import { useState, useMemo, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Heart, BookOpen, BookMarked, Loader2, Sparkles, Share2, CalendarDays, Star, ChevronRight, Flame } from 'lucide-react';
import { Saint, LiturgicalDay, UserFavorite } from '@/api/entities';
import { getUpcomingReadings } from '@/api/readingsData';
import { todayMMDD, formatFeastDate, formatFeastDateParts, liturgicalColorClass, liturgicalColorDotClass, rankPriority, daysUntilFeast } from '@/utils';
import LatinCrossIcon from '@/components/LatinCrossIcon';
import SaintDetailModal from '@/components/SaintDetailModal';
import PrayerModal from '@/components/PrayerModal';
import ReadingsModal from '@/components/ReadingsModal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useRite } from '@/hooks/use-rite';
import { computeSeason } from '@/api/movableFeasts';
import { useNameDay } from '@/hooks/use-name-day';
import { usePatronSaint } from '@/hooks/use-patron-saint';
import { useLanguage } from '@/lib/LanguageContext';
import { T, tx, VIRTUES_ES } from '@/lib/translations';
import { useNotifications, notifSupported } from '@/hooks/use-notifications';
import { useStreak } from '@/hooks/use-streak';

function RiteToggle({ rite, onChange }) {
  return (
    <div className="inline-flex items-center bg-secondary rounded-lg p-0.5 gap-0.5 shrink-0">
      {[{ key: 'NO', label: 'NO' }, { key: 'VO', label: 'VO' }].map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`px-2.5 py-1 rounded-md text-xs font-inter font-semibold transition-all ${
            rite === key ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

const PERIOD_NAMES = {
  en: { morning: 'Morning Offering', midday: 'The Angelus', evening: 'Evening Prayer', night: 'Night Prayer' },
  es: { morning: 'Ofrenda Matutina', midday: 'El Ángelus', evening: 'Oración de la Tarde', night: 'Oración de la Noche' },
};

function getDailyPrayerPeriod() {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return 'morning';
  if (h >= 12 && h < 18) return 'midday';
  if (h >= 18 && h < 21) return 'evening';
  return 'night';
}

function DailyPrayerCard({ lang, t, onOpen }) {
  const period = getDailyPrayerPeriod();
  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="w-3.5 h-3.5 text-gold" />
        <p className="font-inter text-xs font-semibold tracking-[0.12em] uppercase text-gold">
          {t.daily_prayer}
        </p>
      </div>
      <button
        onClick={onOpen}
        className="flex items-center gap-3 bg-card rounded-xl border border-border px-4 py-3 w-full text-left hover:bg-secondary transition-colors active:scale-[0.99]"
      >
        <p className="flex-1 font-inter text-sm font-semibold text-foreground">{PERIOD_NAMES[lang][period]}</p>
        <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
      </button>
    </div>
  );
}

export default function Today() {
  const today = todayMMDD();

  const BORDER_LEFT = {
    white:  'border-l-stone-300',
    red:    'border-l-red-500',
    green:  'border-l-green-600',
    purple: 'border-l-purple-700',
    rose:   'border-l-pink-400',
    black:  'border-l-gray-900',
  };
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [rite, setRite] = useRite();
  const [nameDayName] = useNameDay();
  const [patronId] = usePatronSaint();
  const [lang] = useLanguage();
  const t = T[lang];
  const { permission, enabled, isAlreadyNotifiedToday, markNotified } = useNotifications();
  const { streak } = useStreak();

  const [saintOpen, setSaintOpen] = useState(false);
  const [prayerOpen, setPrayerOpen] = useState(false);
  const [dailyPrayerOpen, setDailyPrayerOpen] = useState(false);
  const [readingsOpen, setReadingsOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [upcomingSaint, setUpcomingSaint] = useState(null);
  const [upcomingLiturgical, setUpcomingLiturgical] = useState(null);
  const [upcomingOpen, setUpcomingOpen] = useState(false);

  const { data: todaySaintsRaw = [], isLoading: saintLoading } = useQuery({
    queryKey: ['saint-today', today, rite],
    queryFn: async () => {
      const saints = await Saint.filter({ feast_date: today });
      return saints.filter(s => !s.rite || s.rite === rite);
    },
  });

  const { data: todayLiturgicalRaw = [] } = useQuery({
    queryKey: ['liturgical-today', today],
    queryFn: () => LiturgicalDay.filter({ date: today }),
  });

  // Pair each saint with its matching liturgical entry by type (movable→movable,
  // static→static) so a generic Sunday doesn't steal the static saint's slot.
  const todayPairs = useMemo(() => {
    const todayYear = new Date().getFullYear();
    const isMov = (e) => e?.id?.includes(`-${todayYear}`);
    const movLit  = todayLiturgicalRaw.filter(isMov);
    const statLit = todayLiturgicalRaw.filter(l => !isMov(l));
    const movS    = todaySaintsRaw.filter(isMov);
    const statS   = todaySaintsRaw.filter(s => !isMov(s));
    const pairs = [
      ...movLit.map((l, i)  => ({ saint: movS[i]  ?? null, liturgical: l })),
      ...statLit.map((l, i) => ({ saint: statS[i] ?? null, liturgical: l })),
    ];
    return pairs.sort((a, b) => {
      // Movable entries always lead
      const aM = isMov(a.liturgical) ? 0 : 1;
      const bM = isMov(b.liturgical) ? 0 : 1;
      if (aM !== bM) return aM - bM;
      const getP = ({ liturgical: l }) => {
        if (!l) return 50;
        const r = rite === 'VO' ? l.vetus_ordo_rank : l.novus_ordo_rank;
        return rankPriority(r, rite);
      };
      return getP(a) - getP(b);
    });
  }, [todaySaintsRaw, todayLiturgicalRaw, rite]);

  const saint     = todayPairs[0]?.saint     ?? null;
  const liturgical = todayPairs[0]?.liturgical ?? null;
  const commemorations = todayPairs.slice(1).filter(p => p.saint);

  // Fire a local notification the first time the user opens the app each day
  useEffect(() => {
    if (!saint || !enabled || permission !== 'granted' || !notifSupported()) return;
    if (isAlreadyNotifiedToday()) return;
    markNotified();
    const quote = (lang === 'es' && saint.quote_es) ? saint.quote_es : saint.quote;
    const body  = quote ? `"${quote.slice(0, 120)}${quote.length > 120 ? '…' : ''}"` : '';
    new Notification(saint.name, { body, icon: '/icon-192.png', badge: '/icon-192.png', tag: 'saint-of-the-day' });
  // saint.id is the stable identity; re-run if permission/enabled/lang change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saint?.id, permission, enabled, lang]);

  const { data: allSaintsRaw = [] } = useQuery({
    queryKey: ['saints-all'],
    queryFn: () => Saint.list(),
  });
  const allSaints = useMemo(
    () => allSaintsRaw.filter(s => !s.rite || s.rite === rite),
    [allSaintsRaw, rite]
  );

  const { data: allLiturgical = [] } = useQuery({
    queryKey: ['liturgical-all'],
    queryFn: () => LiturgicalDay.list(),
  });

  const liturgicalByDate = useMemo(() =>
    allLiturgical.reduce((acc, d) => { acc[d.date] = d; return acc; }, {}),
    [allLiturgical]
  );

  const patronSaint = useMemo(
    () => allSaintsRaw.find(s => s.id === patronId) ?? null,
    [allSaintsRaw, patronId]
  );
  const patronDaysAway = patronSaint ? daysUntilFeast(patronSaint.feast_date) : 999;

  const upcomingFeasts = useMemo(() =>
    [...allSaints]
      .filter(s => {
        if (!s.feast_date) return false;
        // Exclude today's saints — already shown as saint of the day or in commemorations
        if (s.feast_date === today) return false;
        // Skip patron saint when they're already shown in the banner above
        if (patronId && s.id === patronId && patronDaysAway <= 7) return false;
        const ld = liturgicalByDate[s.feast_date];
        if (!ld) return true;
        const feast = rite === 'VO' ? ld.vetus_ordo_feast : ld.novus_ordo_feast;
        return feast && feast !== 'Feria';
      })
      .map(s => ({ ...s, daysAway: daysUntilFeast(s.feast_date) }))
      .sort((a, b) => a.daysAway - b.daysAway)
      .slice(0, 3),
    [allSaints, liturgicalByDate, rite, patronId, patronDaysAway]
  );

  // Deterministic daily pick — same saint all day, changes at midnight
  const inspirationSaint = useMemo(() => {
    if (saint || allSaints.length === 0) return null;
    const now = new Date();
    const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86_400_000);
    return allSaints[dayOfYear % allSaints.length] ?? null;
  }, [saint, allSaints]);

  const nameDayFeasts = useMemo(() => {
    const n = nameDayName.trim().toLowerCase();
    if (!n) return [];
    return allSaints
      .filter(s => s.name?.toLowerCase().includes(n) && s.feast_date)
      .map(s => ({ ...s, daysAway: daysUntilFeast(s.feast_date) }))
      .filter(s => s.daysAway <= 7)
      .sort((a, b) => a.daysAway - b.daysAway);
  }, [allSaints, nameDayName]);

  // Today's Mass readings, or the upcoming Sunday's within the next 7 days
  const upcomingReadings = useMemo(() => getUpcomingReadings(), []);

  const handleUpcomingClick = (s) => {
    setUpcomingSaint(s);
    setUpcomingLiturgical(liturgicalByDate[s.feast_date] ?? null);
    setUpcomingOpen(true);
  };

  const todayYear = new Date().getFullYear();
  const riteData = liturgical
    ? rite === 'VO'
      ? {
          season: computeSeason(today, todayYear, 'VO') ?? liturgical.vetus_ordo_season,
          feast:  liturgical.vetus_ordo_feast,
          rank:   liturgical.vetus_ordo_rank,
          color:  liturgical.vetus_ordo_color,
        }
      : {
          season: computeSeason(today, todayYear, 'NO') ?? liturgical.novus_ordo_season,
          feast:  liturgical.novus_ordo_feast,
          rank:   liturgical.novus_ordo_rank,
          color:  liturgical.novus_ordo_color,
        }
    : null;

  const isFeria = !riteData?.feast || riteData.feast === 'Feria';

  // On a readings day with no saint, the Sunday Gospel card replaces both the
  // plain feast text and the top readings banner.
  const todayReadings = upcomingReadings?.daysAway === 0 ? upcomingReadings.entry : null;
  const showReadingsCard = Boolean(todayReadings) && !saint && !isFeria;

  const handleFavorite = async () => {
    if (!saint || saved) return;
    navigator.vibrate?.(10);
    await UserFavorite.create({
      saint_name: saint.name,
      quote: saint.quote,
      feast_date: saint.feast_date,
      saved_date: format(new Date(), 'yyyy-MM-dd'),
    });
    setSaved(true);
    queryClient.invalidateQueries({ queryKey: ['favorites'] });
    toast({ title: t.toast_saved, description: saint.name });
  };

  const handleShare = async () => {
    if (!saint) return;
    const text = `"${saint.quote}" — ${saint.name}`;
    if (navigator.share) {
      await navigator.share({ title: saint.name, text });
    } else {
      await navigator.clipboard.writeText(text);
      toast({ title: t.toast_copied });
    }
  };

  const handleShareVerse = async () => {
    if (!todayReadings) return;
    const rd = rite === 'VO' ? todayReadings.vo : todayReadings.no;
    const verse = (lang === 'es' && rd.verse_es) ? rd.verse_es : rd.verse;
    const citation = (lang === 'es' && rd.verse_citation_es) ? rd.verse_citation_es : rd.verse_citation;
    const title = (lang === 'es' && rd.title_es) ? rd.title_es : rd.title;
    if (!verse) return;
    const text = `"${verse}" — ${citation}`;
    if (navigator.share) {
      await navigator.share({ title, text });
    } else {
      await navigator.clipboard.writeText(text);
      toast({ title: t.toast_copied });
    }
  };

  const upcomingFeastsSection = upcomingFeasts.length > 0 ? (
    <div className="mt-6">
      <div className="flex items-center gap-2 mb-3">
        <CalendarDays className="w-3.5 h-3.5 text-gold" />
        <p className="font-inter text-xs font-semibold tracking-[0.12em] uppercase text-gold">
          {t.coming_up}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        {upcomingFeasts.map(s => (
          <button
            key={s.id}
            onClick={() => handleUpcomingClick(s)}
            className="flex items-center gap-3 bg-card rounded-xl border border-border px-4 py-3 text-left hover:bg-secondary transition-colors w-full active:scale-[0.99]"
          >
            <div className="flex flex-col items-center shrink-0 w-10 text-center">
              {(() => { const p = formatFeastDateParts(s.feast_date, lang); return (<>
                <span className="font-inter text-[10px] text-muted-foreground uppercase leading-none">{p.month}</span>
                <span className="font-playfair text-lg font-bold text-foreground leading-tight">{p.day}</span>
              </>); })()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-inter text-sm font-semibold text-foreground truncate">{s.name}</p>
              {s.virtue && (
                <p className="font-inter text-xs text-muted-foreground">
                  {lang === 'es' ? (VIRTUES_ES[s.virtue] ?? s.virtue) : s.virtue}
                </p>
              )}
            </div>
            <span className="font-inter text-xs text-gold shrink-0">
              {s.daysAway === 1 ? t.feast_tomorrow : tx(t.in_n_days, { n: s.daysAway })}
            </span>
          </button>
        ))}
      </div>
    </div>
  ) : null;

  if (saintLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="px-5 pt-12 pb-12 max-w-lg md:max-w-2xl mx-auto">

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-inter text-xs font-semibold tracking-[0.15em] uppercase text-gold">
            {format(new Date(), 'EEEE')}
          </p>
          <h1 className="font-playfair text-3xl font-bold text-foreground mt-0.5">
            {format(new Date(), 'MMMM d, yyyy')}
          </h1>
          {streak >= 2 && (
            <div className="flex items-center gap-1 mt-1.5">
              <Flame className="w-3.5 h-3.5 text-gold fill-gold/20" />
              <span className="font-inter text-xs font-semibold text-gold">
                {tx(t.streak_days, { n: streak })}
              </span>
            </div>
          )}
        </div>
        <RiteToggle rite={rite} onChange={setRite} />
      </div>

      {/* Liturgical day badge */}
      {riteData && (
        <div className="flex items-center gap-2 mb-5">
          <span className={`w-2 h-2 rounded-full shrink-0 ${liturgicalColorDotClass(riteData.color)}`} />
          <span className={`font-inter text-xs font-semibold ${liturgicalColorClass(riteData.color)}`}>
            {riteData.season}
          </span>
          {!isFeria && (
            <>
              <span className="text-border text-xs">·</span>
              <span className="font-inter text-xs text-muted-foreground truncate">{riteData.rank}</span>
            </>
          )}
          <span className="text-border text-xs">·</span>
          <span className="font-inter text-xs text-muted-foreground">
            {rite === 'NO' ? t.ordinary_form : t.extraordinary_form}
          </span>
        </div>
      )}

      {/* Mass readings — today's, or the upcoming Sunday's */}
      {upcomingReadings && !showReadingsCard && (() => {
        const { entry, daysAway } = upcomingReadings;
        const rd = rite === 'VO' ? entry.vo : entry.no;
        const rdTitle = (lang === 'es' && rd.title_es) ? rd.title_es : rd.title;
        const verse = (lang === 'es' && rd.verse_es) ? rd.verse_es : rd.verse;
        return (
          <button
            onClick={() => setReadingsOpen(true)}
            className="flex items-start gap-2.5 bg-card border border-border rounded-xl px-4 py-3 mb-4 text-left hover:bg-secondary transition-colors w-full active:scale-[0.99]"
          >
            <BookMarked className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="font-inter text-xs font-semibold text-gold">
                  {daysAway === 0 ? t.todays_readings : t.sunday_readings}
                </p>
                {daysAway > 0 && (
                  <span className="font-inter text-xs text-gold shrink-0">
                    {daysAway === 1 ? t.feast_tomorrow : tx(t.in_n_days, { n: daysAway })}
                  </span>
                )}
              </div>
              <p className="font-inter text-xs font-semibold text-foreground/80 truncate">
                {rdTitle}
                {daysAway > 0 && ` · ${formatFeastDate(entry.date.slice(5), lang)}`}
              </p>
              {verse && (
                <p className="font-inter text-[11px] text-muted-foreground italic line-clamp-2 mt-1">
                  "{verse}"
                </p>
              )}
            </div>
          </button>
        );
      })()}

      {/* Patron saint — celebration card (today) or upcoming banner (within 7 days) */}
      {patronSaint && patronDaysAway <= 7 && (
        patronDaysAway === 0 ? (
          <div className="rounded-2xl border border-gold/50 bg-gold/5 px-5 py-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-3.5 h-3.5 text-gold shrink-0" />
              <p className="font-inter text-xs font-semibold tracking-[0.15em] uppercase text-gold">
                {t.your_patron_saint}
              </p>
            </div>
            <h3 className="font-playfair text-xl font-bold text-foreground">{patronSaint.name}</h3>
            <p className="font-inter text-xs font-semibold text-gold mt-0.5">{t.name_day_today}</p>
            {(patronSaint.quote || (lang === 'es' && patronSaint.quote_es)) && (
              <>
                <div className="w-full h-px bg-gold/20 my-3" />
                <p className="font-playfair text-sm italic text-foreground/80 leading-relaxed">
                  "{(lang === 'es' && patronSaint.quote_es) ? patronSaint.quote_es : patronSaint.quote}"
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2.5 bg-gold/10 border border-gold/30 rounded-xl px-4 py-3 mb-4">
            <Star className="w-3.5 h-3.5 text-gold shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-inter text-xs font-semibold text-gold">{t.your_patron_saint}</p>
              <p className="font-inter text-xs text-foreground/70 truncate">
                {patronSaint.name} · {formatFeastDate(patronSaint.feast_date, lang)} · {patronDaysAway === 1 ? t.days_tomorrow : tx(t.days_in_n, { n: patronDaysAway })}
              </p>
            </div>
          </div>
        )
      )}

      {/* Fallback: name-match banners when no patron is explicitly selected */}
      {!patronId && nameDayFeasts.map(s => (
        <div
          key={s.id}
          className="flex items-center gap-2.5 bg-gold/10 border border-gold/30 rounded-xl px-4 py-3 mb-4"
        >
          <Star className="w-3.5 h-3.5 text-gold shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-inter text-xs font-semibold text-gold">
              {s.daysAway === 0
                ? t.name_day_today
                : s.daysAway === 1
                ? t.name_day_tomorrow
                : tx(t.name_day_in_n, { n: s.daysAway })}
            </p>
            <p className="font-inter text-xs text-foreground/70 truncate">{s.name} · {formatFeastDate(s.feast_date, lang)}</p>
          </div>
        </div>
      ))}

      {saint ? (
        <>
          {/* Saint card */}
          <div
            className="bg-card rounded-3xl border border-border overflow-hidden mb-4 cursor-pointer active:scale-[0.99] transition-transform"
            onClick={() => setSaintOpen(true)}
          >
            {saint.image_url && (
              <div className="relative h-44 overflow-hidden">
                <img
                  src={saint.image_url}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => { e.currentTarget.parentElement.style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/70 to-transparent pointer-events-none" />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0 pr-3">
                  <p className="font-inter text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-1">
                    {t.saint_of_the_day}
                  </p>
                  <h2 className="font-playfair text-2xl font-bold text-foreground">{saint.name}</h2>
                  {saint.feast_date && (
                    <p className="font-inter text-sm text-muted-foreground mt-0.5">
                      {t.feast_label}: {formatFeastDate(saint.feast_date, lang)}
                    </p>
                  )}
                </div>
                {saint.virtue && (
                  <Badge variant="outline" className="text-gold border-gold/40 bg-gold/5 shrink-0">
                    {lang === 'es' ? (VIRTUES_ES[saint.virtue] ?? saint.virtue) : saint.virtue}
                  </Badge>
                )}
              </div>

              <div className="relative">
                <span className="font-playfair text-5xl text-gold/20 leading-none absolute -top-2 -left-1">"</span>
                <p className="font-playfair text-xl italic text-foreground/80 leading-relaxed pl-5">
                  {(lang === 'es' && saint.quote_es) ? saint.quote_es : saint.quote}
                </p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mb-5">
            <Button
              variant="outline"
              className={`flex-1 gap-2 ${saved ? 'text-gold border-gold' : ''}`}
              onClick={handleFavorite}
              disabled={saved}
            >
              <Heart className={`w-4 h-4 ${saved ? 'fill-gold text-gold' : ''}`} />
              {saved ? t.saved : t.save}
            </Button>
            <Button
              variant="outline"
              className="gap-2 px-4"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4" />
            </Button>
            <Button
              className="flex-1 gap-2 bg-gold hover:bg-gold/90 text-white"
              onClick={() => setPrayerOpen(true)}
            >
              <BookOpen className="w-4 h-4" />
              {t.pray}
            </Button>
          </div>

          {/* Reflection */}
          {saint.reflection && (
            <div className="bg-secondary rounded-2xl px-5 py-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <p className="font-inter text-xs font-semibold tracking-[0.12em] uppercase text-gold">
                  {t.reflection}
                </p>
              </div>
              <p className="font-inter text-sm text-foreground/80 leading-relaxed">
                {(lang === 'es' && saint.reflection_es) ? saint.reflection_es : saint.reflection}
              </p>
            </div>
          )}

          {/* Patron */}
          {saint.patron_of && (
            <p className="font-inter text-xs text-center text-muted-foreground">
              {t.patron_of} {saint.patron_of}
            </p>
          )}
        </>
      ) : (
        <div className="py-6">
          {isFeria ? (
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                  <LatinCrossIcon className="w-7 h-7 text-muted-foreground" />
                </div>
                <p className="font-playfair text-xl text-foreground mb-1">{t.feria}</p>
                <p className="font-inter text-sm text-muted-foreground">{t.no_feast_today}</p>
                <p className="font-inter text-sm text-muted-foreground mt-1">
                  {rite === 'VO' ? t.ordinary_time_vo : t.ordinary_time_no}
                </p>
              </div>
              {inspirationSaint && (
                <div className="mt-2">
                  <p className="font-inter text-xs font-semibold tracking-[0.12em] uppercase text-gold mb-3 text-center">
                    {t.daily_inspiration}
                  </p>
                  <button
                    onClick={() => {
                      setUpcomingSaint(inspirationSaint);
                      setUpcomingLiturgical(liturgicalByDate[inspirationSaint.feast_date] ?? null);
                      setUpcomingOpen(true);
                    }}
                    className="w-full bg-card rounded-2xl border border-border p-5 text-left hover:bg-secondary transition-colors active:scale-[0.99]"
                  >
                    <p className="font-inter text-xs text-muted-foreground mb-1">
                      {formatFeastDate(inspirationSaint.feast_date, lang)}
                    </p>
                    <p className="font-playfair text-lg font-bold text-foreground mb-3">
                      {inspirationSaint.name}
                    </p>
                    <p className="font-playfair text-sm italic text-foreground/70 leading-relaxed line-clamp-3">
                      "{(lang === 'es' && inspirationSaint.quote_es) ? inspirationSaint.quote_es : inspirationSaint.quote}"
                    </p>
                  </button>
                </div>
              )}
              {upcomingFeastsSection}
            </>
          ) : showReadingsCard ? (() => {
            const rd = rite === 'VO' ? todayReadings.vo : todayReadings.no;
            const rdTitle = (lang === 'es' && rd.title_es) ? rd.title_es : rd.title;
            const verse = (lang === 'es' && rd.verse_es) ? rd.verse_es : rd.verse;
            const verseCitation = (lang === 'es' && rd.verse_citation_es) ? rd.verse_citation_es : rd.verse_citation;
            return (
              <>
                {/* Sunday Gospel card — mirrors the saint-of-the-day card */}
                <div
                  className="bg-card rounded-3xl border border-border p-6 mb-4 cursor-pointer active:scale-[0.99] transition-transform"
                  onClick={() => setReadingsOpen(true)}
                >
                  <div className="mb-4">
                    <p className="font-inter text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-1">
                      {t.sunday_gospel}
                    </p>
                    <h2 className="font-playfair text-2xl font-bold text-foreground">{rdTitle}</h2>
                    <p className="font-inter text-sm text-muted-foreground mt-0.5">
                      {rite === 'NO'
                        ? (rd.lectionary ? `${t.lectionary}: ${rd.lectionary}${rd.cycle ? ` (${rd.cycle})` : ''}` : '')
                        : rd.rank}
                    </p>
                  </div>
                  {verse && (
                    <div className="relative">
                      <span className="font-playfair text-5xl text-gold/20 leading-none absolute -top-2 -left-1">"</span>
                      <p className="font-playfair text-xl italic text-foreground/80 leading-relaxed pl-5">
                        {verse}
                      </p>
                    </div>
                  )}
                  {verseCitation && (
                    <p className="font-inter text-xs font-semibold text-gold mt-3 pl-5">{verseCitation}</p>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 mb-5">
                  <Button variant="outline" className="gap-2 px-4" onClick={handleShareVerse}>
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button
                    className="flex-1 gap-2 bg-gold hover:bg-gold/90 text-white"
                    onClick={() => setReadingsOpen(true)}
                  >
                    <BookMarked className="w-4 h-4" />
                    {t.mass_readings}
                  </Button>
                </div>
                {upcomingFeastsSection}
              </>
            );
          })() : (
            <>
              <div className={`w-2.5 h-2.5 rounded-full mx-auto mb-4 ${liturgicalColorDotClass(riteData?.color)}`} />
              <p className="font-playfair text-xl text-foreground mb-1">{riteData?.feast}</p>
              <p className="font-inter text-sm text-muted-foreground">{riteData?.rank}</p>
              {inspirationSaint && (
                <div className="mt-8 text-left w-full">
                  <p className="font-inter text-xs font-semibold tracking-[0.12em] uppercase text-gold mb-3 text-center">
                    {t.daily_inspiration}
                  </p>
                  <button
                    onClick={() => {
                      setUpcomingSaint(inspirationSaint);
                      setUpcomingLiturgical(liturgicalByDate[inspirationSaint.feast_date] ?? null);
                      setUpcomingOpen(true);
                    }}
                    className="w-full bg-card rounded-2xl border border-border p-5 text-left hover:bg-secondary transition-colors active:scale-[0.99]"
                  >
                    <p className="font-inter text-xs text-muted-foreground mb-1">
                      {formatFeastDate(inspirationSaint.feast_date, lang)}
                    </p>
                    <p className="font-playfair text-lg font-bold text-foreground mb-3">
                      {inspirationSaint.name}
                    </p>
                    <p className="font-playfair text-sm italic text-foreground/70 leading-relaxed line-clamp-3">
                      "{(lang === 'es' && inspirationSaint.quote_es) ? inspirationSaint.quote_es : inspirationSaint.quote}"
                    </p>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Commemorations — lower-ranked feasts sharing today's date */}
      {commemorations.length > 0 && (
        <div className="mt-5">
          <div className="flex items-center gap-2 mb-2">
            <p className="font-inter text-xs font-semibold tracking-[0.12em] uppercase text-muted-foreground">
              {t.also_today}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            {commemorations.map(({ saint: s, liturgical: l }) => {
              const riteInfo = l
                ? rite === 'VO'
                  ? { rank: l.vetus_ordo_rank, color: l.vetus_ordo_color }
                  : { rank: l.novus_ordo_rank, color: l.novus_ordo_color }
                : null;
              return (
                <button
                  key={s.id}
                  onClick={() => { setUpcomingSaint(s); setUpcomingLiturgical(l); setUpcomingOpen(true); }}
                  className={`flex items-center gap-3 bg-card rounded-xl border border-border border-l-[3px] ${BORDER_LEFT[riteInfo?.color] ?? 'border-l-border'} px-4 py-3 text-left hover:bg-secondary transition-colors w-full active:scale-[0.99]`}
                >
                  {riteInfo && (
                    <span className={`w-2 h-2 rounded-full shrink-0 ${liturgicalColorDotClass(riteInfo.color)}`} />
                  )}
                  <div className="flex-1 min-w-0">
                    {riteInfo?.rank && (
                      <p className="font-inter text-xs text-muted-foreground">{riteInfo.rank}</p>
                    )}
                    <p className="font-inter text-sm font-semibold text-foreground truncate">{s.name}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Upcoming feasts — only on saint days; feria days render this inline above */}
      {saint && upcomingFeastsSection}

      {/* Daily Prayer — always accessible */}
      <DailyPrayerCard lang={lang} t={t} onOpen={() => setDailyPrayerOpen(true)} />

      <SaintDetailModal
        saint={saint}
        liturgical={liturgical}
        open={saintOpen}
        onClose={() => setSaintOpen(false)}
        context="today"
        lang={lang}
      />
      <PrayerModal
        saint={saint}
        open={prayerOpen}
        onClose={() => setPrayerOpen(false)}
        lang={lang}
      />
      <PrayerModal
        open={dailyPrayerOpen}
        onClose={() => setDailyPrayerOpen(false)}
        lang={lang}
      />
      <SaintDetailModal
        saint={upcomingSaint}
        liturgical={upcomingLiturgical}
        open={upcomingOpen}
        onClose={() => setUpcomingOpen(false)}
        lang={lang}
      />
      <ReadingsModal
        entry={upcomingReadings?.entry}
        rite={rite}
        open={readingsOpen}
        onClose={() => setReadingsOpen(false)}
        lang={lang}
      />
    </div>
  );
}
