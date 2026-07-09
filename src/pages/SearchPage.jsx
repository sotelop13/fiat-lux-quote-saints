import { useState, useMemo, useRef, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Search, X, Heart } from 'lucide-react';
import { format } from 'date-fns';
import { Saint, LiturgicalDay, UserFavorite } from '@/api/entities';
import { formatFeastDate, liturgicalColorDotClass, daysUntilFeast } from '@/utils';
import SaintDetailModal from '@/components/SaintDetailModal';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/lib/LanguageContext';
import { T, tx, VIRTUES_ES } from '@/lib/translations';
import { useRite } from '@/hooks/use-rite';

const SORT_KEYS = ['upcoming', 'name', 'patron', 'virtue'];

function Highlight({ text = '', query = '' }) {
  if (!query.trim()) return <>{text}</>;
  const q = query.trim();
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-gold/20 text-gold not-italic rounded-sm">{text.slice(idx, idx + q.length)}</mark>
      {text.slice(idx + q.length)}
    </>
  );
}

function esMatchSnippet(saint, q) {
  for (const f of ['quote_es', 'biography_es', 'reflection_es', 'prayer_es']) {
    const text = saint[f];
    if (!text) continue;
    const idx = text.toLowerCase().indexOf(q);
    if (idx === -1) continue;
    const start = Math.max(0, idx - 40);
    const end = Math.min(text.length, idx + q.length + 60);
    return (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '');
  }
  return '';
}



export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('upcoming');
  const [filterVirtue, setFilterVirtue] = useState(null);
  const [selectedSaint, setSelectedSaint] = useState(null);
  const [selectedLiturgical, setSelectedLiturgical] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { toast } = useToast();
  const qc = useQueryClient();
  const [lang] = useLanguage();
  const t = T[lang];
  const [rite] = useRite();

  const resultsRef = useRef(null);
  const didMount = useRef(false);

  useEffect(() => {
    if (!didMount.current) { didMount.current = true; return; }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [sortBy, filterVirtue]);

  const { data: saints = [] } = useQuery({
    queryKey: ['saints-all', rite],
    queryFn: async () => {
      const all = await Saint.list();
      return all.filter(s => !s.rite || s.rite === rite);
    },
  });

  const { data: liturgicalDays = [] } = useQuery({
    queryKey: ['liturgical-all'],
    queryFn: () => LiturgicalDay.list(),
  });

  const { data: favorites = [] } = useQuery({
    queryKey: ['favorites'],
    queryFn: () => UserFavorite.list(),
  });

  const savedNames = useMemo(
    () => new Set(favorites.map(f => f.saint_name)),
    [favorites]
  );

  const liturgicalByDate = useMemo(() =>
    liturgicalDays.reduce((acc, d) => { acc[d.date] = d; return acc; }, {}),
    [liturgicalDays]
  );

  const virtues = useMemo(() =>
    [...new Set(saints.map(s => s.virtue).filter(Boolean))].sort(),
    [saints]
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

  const toggleFavorite = (e, saint) => {
    e.stopPropagation();
    navigator.vibrate?.(10);
    if (savedNames.has(saint.name)) {
      removeFavorite(saint.name);
    } else {
      saveFavorite(saint);
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const results = saints.filter(s => {
      if (filterVirtue && s.virtue?.trim() !== filterVirtue.trim()) return false;
      if (!q) return true;
      const feastStr = s.feast_date ? formatFeastDate(s.feast_date, lang).toLowerCase() : '';
      const virtueLabel = lang === 'es' ? (VIRTUES_ES[s.virtue] ?? s.virtue ?? '') : (s.virtue ?? '');
      if (
        s.name?.toLowerCase().includes(q) ||
        s.patron_of?.toLowerCase().includes(q) ||
        virtueLabel.toLowerCase().includes(q) ||
        feastStr.includes(q)
      ) return true;
      if (lang === 'es') {
        return (
          s.quote_es?.toLowerCase().includes(q) ||
          s.biography_es?.toLowerCase().includes(q) ||
          s.reflection_es?.toLowerCase().includes(q) ||
          s.prayer_es?.toLowerCase().includes(q)
        );
      }
      return false;
    });

    switch (sortBy) {
      case 'upcoming':
        results.sort((a, b) => daysUntilFeast(a.feast_date) - daysUntilFeast(b.feast_date));
        break;
      case 'name':
        results.sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));
        break;
      case 'patron':
        results.sort((a, b) => {
          if (!a.patron_of && !b.patron_of) return 0;
          if (!a.patron_of) return 1;
          if (!b.patron_of) return -1;
          return a.patron_of.localeCompare(b.patron_of);
        });
        break;
      case 'virtue':
        results.sort((a, b) => {
          if (!a.virtue && !b.virtue) return 0;
          if (!a.virtue) return 1;
          if (!b.virtue) return -1;
          return a.virtue.localeCompare(b.virtue);
        });
        break;
    }
    return results;
  }, [saints, query, sortBy, filterVirtue, lang]);

  const handleSelect = (saint) => {
    setSelectedSaint(saint);
    setSelectedLiturgical(liturgicalByDate[saint.feast_date] ?? null);
    setModalOpen(true);
  };

  return (
    <div className="px-5 pt-12 pb-12 max-w-lg md:max-w-2xl mx-auto">
      <p className="font-inter text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-1">
        {t.browse_label}
      </p>
      <h1 className="font-playfair text-3xl font-bold text-foreground mb-5">{t.browse_title}</h1>

      {/* Search input */}
      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={t.browse_placeholder}
          className="w-full bg-secondary border border-border rounded-xl pl-10 pr-10 py-3 font-inter text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-gold/40 transition"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Sort pills */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-none">
        {SORT_KEYS.map((key) => (
          <button
            key={key}
            onClick={() => setSortBy(key)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-inter font-semibold transition-all border touch-manipulation ${
              sortBy === key
                ? 'bg-gold text-white border-gold'
                : 'border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            {t[`sort_${key}`]}
          </button>
        ))}
      </div>

      {/* Virtue filter chips */}
      {virtues.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <p className="font-inter text-xs font-semibold uppercase tracking-widest text-muted-foreground">{t.virtue}</p>
            {filterVirtue && (
              <button onClick={() => setFilterVirtue(null)} className="font-inter text-xs text-gold hover:underline">
                {t.browse_filter_clear}
              </button>
            )}
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {virtues.map(v => (
              <button
                key={v}
                onClick={() => setFilterVirtue(f => f === v ? null : v)}
                className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-inter font-medium transition-all border touch-manipulation ${
                  filterVirtue === v
                    ? 'bg-gold text-white border-gold'
                    : 'border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {lang === 'es' ? (VIRTUES_ES[v] ?? v) : v}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Result count — scroll target when sort/filter changes */}
      <p ref={resultsRef} className="font-inter text-xs text-muted-foreground mb-3">
        {filtered.length} {filtered.length === 1 ? t.browse_result_saint : t.browse_result_saints}
        {filterVirtue ? ` ${tx(t.browse_with_virtue, { v: lang === 'es' ? (VIRTUES_ES[filterVirtue] ?? filterVirtue) : filterVirtue })}` : ''}
        {query ? ` ${tx(t.browse_matching, { q: query })}` : (!filterVirtue ? ` ${t.browse_in_calendar}` : '')}
      </p>

      {/* List */}
      <div className="flex flex-col gap-2">
        {filtered.map(saint => {
          const isSaved = savedNames.has(saint.name);
          const q = query.trim().toLowerCase();
          const esSnippet = (lang === 'es' && q &&
            !saint.name?.toLowerCase().includes(q) &&
            !saint.patron_of?.toLowerCase().includes(q))
            ? esMatchSnippet(saint, q) : '';
          return (
            <button
              key={saint.id}
              onClick={() => handleSelect(saint)}
              className="bg-card rounded-2xl border border-border px-5 py-4 text-left flex items-start gap-4 hover:bg-secondary transition-colors active:scale-[0.99]"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  {saint.feast_date && liturgicalByDate[saint.feast_date] && (
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${liturgicalColorDotClass(
                      rite === 'VO'
                        ? liturgicalByDate[saint.feast_date].vetus_ordo_color
                        : liturgicalByDate[saint.feast_date].novus_ordo_color
                    )}`} />
                  )}
                  <p className="font-inter text-xs text-muted-foreground">
                    {saint.feast_date ? formatFeastDate(saint.feast_date, lang) : ''}
                  </p>
                  {saint.virtue && (
                    <Badge variant="outline" className="text-gold border-gold/40 bg-gold/5 text-[10px] px-1.5 py-0">
                      {lang === 'es' ? (VIRTUES_ES[saint.virtue] ?? saint.virtue) : saint.virtue}
                    </Badge>
                  )}
                </div>
                <p className="font-playfair text-base font-semibold text-foreground">
                  <Highlight text={saint.name ?? ''} query={query} />
                </p>
                {saint.patron_of && (
                  <p className="font-inter text-xs text-muted-foreground mt-0.5 truncate">
                    {t.patron_of} <Highlight text={saint.patron_of} query={query} />
                  </p>
                )}
                {esSnippet && (
                  <p className="font-inter text-xs text-muted-foreground/80 mt-1 italic line-clamp-2">
                    <Highlight text={esSnippet} query={query} />
                  </p>
                )}
              </div>
              <button
                onClick={(e) => toggleFavorite(e, saint)}
                className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-gold/10"
                aria-label={isSaved ? 'Remove from favorites' : 'Save to favorites'}
              >
                <Heart
                  className={`w-4 h-4 transition-colors ${isSaved ? 'fill-gold text-gold' : 'text-muted-foreground'}`}
                />
              </button>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="font-playfair text-lg text-muted-foreground">{t.browse_no_saints}</p>
          <p className="font-inter text-sm text-muted-foreground mt-1">
            {filterVirtue
              ? tx(query ? t.browse_no_virtue_query : t.browse_no_virtue, { v: lang === 'es' ? (VIRTUES_ES[filterVirtue] ?? filterVirtue) : filterVirtue, q: query })
              : t.browse_try_different}
          </p>
          {filterVirtue && (
            <button onClick={() => setFilterVirtue(null)} className="font-inter text-sm text-gold mt-2 hover:underline">
              {t.browse_clear_virtue}
            </button>
          )}
        </div>
      )}

      <SaintDetailModal
        saint={selectedSaint}
        liturgical={selectedLiturgical}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
