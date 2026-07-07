import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2, Loader2, Heart } from 'lucide-react';
import { UserFavorite, Saint, LiturgicalDay } from '@/api/entities';
import { formatFeastDate, daysUntilFeast } from '@/utils';
import SaintDetailModal from '@/components/SaintDetailModal';
import { useLanguage } from '@/lib/LanguageContext';
import { T, tx } from '@/lib/translations';
import { useRite } from '@/hooks/use-rite';

function parseSavedDate(dateStr) {
  if (!dateStr) return null;
  // Avoid UTC-midnight timezone shift by treating as local
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
}


function FeastCountdown({ feastMMDD, t }) {
  if (!feastMMDD) return null;
  const days = daysUntilFeast(feastMMDD);
  if (days === 0) return (
    <span className="font-inter text-xs font-semibold text-gold">{t.feast_today}</span>
  );
  if (days === 1) return (
    <span className="font-inter text-xs text-muted-foreground">{t.feast_tomorrow}</span>
  );
  return (
    <span className="font-inter text-xs text-muted-foreground">
      {tx(t.feast_in_n_days, { n: days })}
    </span>
  );
}

const SORT_KEYS = ['upcoming', 'name', 'saved'];

export default function Favorites() {
  const qc = useQueryClient();
  const [lang] = useLanguage();
  const t = T[lang];
  const [rite] = useRite();
  const [selectedSaint, setSelectedSaint] = useState(null);
  const [selectedLiturgical, setSelectedLiturgical] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState('upcoming');

  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ['favorites'],
    queryFn: () => UserFavorite.list(),
  });

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

  const saintsByDate = saints.reduce((acc, s) => {
    if (s.feast_date) acc[s.feast_date] = s;
    return acc;
  }, {});

  const liturgicalByDate = liturgicalDays.reduce((acc, d) => {
    if (d.date) acc[d.date] = d;
    return acc;
  }, {});

  const sortedFavorites = useMemo(() => {
    const copy = [...favorites];
    if (sortBy === 'name') return copy.sort((a, b) => a.saint_name.localeCompare(b.saint_name));
    if (sortBy === 'saved') return copy.sort((a, b) => {
      const da = parseSavedDate(a.saved_date);
      const db = parseSavedDate(b.saved_date);
      if (!da || !db) return 0;
      return db - da;
    });
    return copy.sort((a, b) => daysUntilFeast(a.feast_date) - daysUntilFeast(b.feast_date));
  }, [favorites, sortBy]);

  const { mutate: remove } = useMutation({
    mutationFn: (id) => UserFavorite.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['favorites'] }),
  });

  const handleCardClick = (fav) => {
    const saint = saintsByDate[fav.feast_date];
    if (!saint) return;
    setSelectedSaint(saint);
    setSelectedLiturgical(liturgicalByDate[fav.feast_date] ?? null);
    setModalOpen(true);
  };

  return (
    <div className="px-5 pt-12 pb-12 max-w-lg mx-auto">
      <p className="font-inter text-xs font-medium tracking-[0.15em] uppercase text-gold mb-1">
        {t.my_collection}
      </p>
      <div className="flex items-baseline gap-2 mb-6">
        <h1 className="font-playfair text-3xl font-bold text-foreground">{t.favorites_title}</h1>
        {favorites.length > 0 && (
          <span className="font-inter text-sm text-muted-foreground">{tx(t.n_saved, { n: favorites.length })}</span>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : favorites.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="font-playfair text-lg text-muted-foreground">{t.no_favorites}</p>
          <p className="font-inter text-sm text-muted-foreground mt-1">
            {t.no_favorites_hint}
          </p>
        </div>
      ) : (
        <>
          {favorites.length > 1 && (
            <div className="flex items-center gap-1.5 mb-4">
              {SORT_KEYS.map((key) => (
                <button
                  key={key}
                  onClick={() => setSortBy(key)}
                  className={`font-inter text-xs font-semibold px-3 py-1 rounded-full transition-colors ${
                    sortBy === key
                      ? 'bg-gold/15 text-gold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t[`fav_sort_${key}`]}
                </button>
              ))}
            </div>
          )}
        <div className="flex flex-col gap-3">
          {sortedFavorites.map((fav) => {
            const hasSaint = Boolean(saintsByDate[fav.feast_date]);
            const savedDate = parseSavedDate(fav.saved_date);
            return (
              <div
                key={fav.id}
                onClick={() => handleCardClick(fav)}
                className={`bg-card rounded-2xl border border-border px-5 py-4 flex items-start gap-4 transition-colors ${
                  hasSaint ? 'cursor-pointer hover:bg-secondary active:scale-[0.99]' : ''
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <p className="font-inter text-xs font-medium tracking-widest uppercase text-gold">
                      {fav.feast_date ? formatFeastDate(fav.feast_date, lang) : ''}
                    </p>
                    <FeastCountdown feastMMDD={fav.feast_date} t={t} />
                  </div>
                  <p className="font-playfair text-base font-semibold text-foreground">{fav.saint_name}</p>
                  <p className="font-playfair text-sm italic text-foreground/70 mt-1 leading-relaxed line-clamp-3">
                    "{fav.quote}"
                  </p>
                  {savedDate && (
                    <p className="font-inter text-xs text-muted-foreground mt-2">
                      {t.saved_on} {savedDate.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  )}
                  {hasSaint && (
                    <p className="font-inter text-xs text-gold/70 mt-1">{t.tap_for_bio_short}</p>
                  )}
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); navigator.vibrate?.(10); remove(fav.id); }}
                  className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                  aria-label="Remove favorite"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
        </>
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
