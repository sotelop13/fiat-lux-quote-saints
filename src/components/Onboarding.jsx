import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Languages, ChevronRight, Heart, Calendar, Star, Bell, Check } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import LatinCrossIcon from './LatinCrossIcon';
import { useLanguage } from '@/lib/LanguageContext';
import { useRite } from '@/hooks/use-rite';
import { usePatronSaint } from '@/hooks/use-patron-saint';
import { Saint } from '@/api/entities';
import { formatFeastDate, daysUntilFeast } from '@/utils';

const variants = {
  enter: (dir) => ({ x: dir > 0 ? '55%' : '-55%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (dir) => ({ x: dir > 0 ? '-55%' : '55%', opacity: 0 }),
};

const FEATURES = {
  en: [
    { Icon: Sun,      text: "Today's saint — biography, quote, prayer, and Sunday Mass readings, renewed each midnight." },
    { Icon: Calendar, text: 'The full liturgical year: feast days, ranks, and vestment colors displayed month by month.' },
    { Icon: Heart,    text: 'Bookmark saints you love. They sort automatically by upcoming feast day.' },
    { Icon: Bell,     text: 'Optional daily notifications so you never miss a feast.' },
  ],
  es: [
    { Icon: Sun,      text: 'El santo del día — biografía, cita, oración y lecturas dominicales, renovado cada medianoche.' },
    { Icon: Calendar, text: 'El año litúrgico completo: fiestas, rangos y colores de vestiduras mes a mes.' },
    { Icon: Heart,    text: 'Guarda los santos que más te gustan. Se ordenan automáticamente por fecha de fiesta.' },
    { Icon: Bell,     text: 'Notificaciones diarias opcionales para no perderte ninguna fiesta.' },
  ],
};

export default function Onboarding({ onDone }) {
  const [page, setPage] = useState(0);
  const [dir, setDir]   = useState(1);
  const [lang, setLang] = useLanguage();
  const [rite, setRite] = useRite();
  const [patronId, setPatronId] = usePatronSaint();
  const [patronSearch, setPatronSearch] = useState('');

  const { data: saints = [] } = useQuery({
    queryKey: ['saints-all'],
    queryFn: () => Saint.list(),
  });

  const patronMatches = useMemo(() => {
    const q = patronSearch.trim().toLowerCase();
    if (!q || saints.length === 0) return [];
    return saints
      .filter(s => s.name?.toLowerCase().includes(q) && s.feast_date)
      .map(s => ({ ...s, daysAway: daysUntilFeast(s.feast_date) }))
      .sort((a, b) => a.daysAway - b.daysAway)
      .slice(0, 6);
  }, [patronSearch, saints]);

  const selectedPatron = useMemo(
    () => saints.find(s => s.id === patronId) ?? null,
    [saints, patronId]
  );

  // Slides defined inside component so they react to language changes instantly
  const SLIDES = [
    {
      type:  'welcome',
      tag:   lang === 'es' ? 'Bienvenido'    : 'Welcome',
      title: 'Fiat Lux',
      body:  lang === 'es'
        ? 'Compañero diario para la vida litúrgica.\nCamina con los santos a través del año sagrado.'
        : 'A daily companion for the liturgical life.\nWalk with the saints through the sacred year.',
    },
    {
      type:  'setup',
      tag:   lang === 'es' ? 'Configuración' : 'Set Up',
      title: lang === 'es' ? 'Hazlo tuyo'    : 'Make it yours',
    },
    {
      type:  'patron',
      tag:   lang === 'es' ? 'Tu patrón'     : 'Your Patron',
      title: lang === 'es' ? 'Elige tu santo patrón' : 'Choose your patron saint',
    },
    {
      type:  'features',
      tag:   lang === 'es' ? 'Descubre'      : 'Discover',
      title: lang === 'es' ? 'Todo en uno'   : 'All in one place',
    },
    {
      type:  'info',
      tag:   lang === 'es' ? 'Listo'         : 'Ready',
      title: lang === 'es' ? 'Empieza hoy'   : 'Begin today',
      body:  lang === 'es'
        ? '"La gloria de Dios es el hombre plenamente vivo,\ny la vida del hombre es la visión de Dios."\n\n— San Ireneo de Lyon'
        : '"The glory of God is man fully alive,\nand the life of man is the vision of God."\n\n— Saint Irenaeus of Lyon',
    },
  ];

  const go = (next) => {
    if (next === page) return;
    setDir(next > page ? 1 : -1);
    setPage(next);
  };

  const advance = () => (page < SLIDES.length - 1 ? go(page + 1) : onDone());

  const handlePanEnd = (_, info) => {
    if (info.offset.x < -50 && page < SLIDES.length - 1) go(page + 1);
    else if (info.offset.x > 50 && page > 0) go(page - 1);
  };

  const slide    = SLIDES[page];
  const isLast   = page === SLIDES.length - 1;
  const features = FEATURES[lang];

  const ctaLabel = isLast
    ? (lang === 'es' ? 'Entrar' : 'Enter')
    : (lang === 'es' ? 'Siguiente' : 'Next');

  return (
    <motion.div
      key="onboarding"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 bg-background flex flex-col select-none"
    >
      {/* Skip — hidden on last slide */}
      <div className="flex justify-end px-6 shrink-0" style={{ paddingTop: 'max(40px, env(safe-area-inset-top, 40px))', minHeight: 48 }}>
        {!isLast && (
          <button
            onClick={onDone}
            className="font-inter text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
          >
            {lang === 'es' ? 'Omitir' : 'Skip'}
          </button>
        )}
      </div>

      {/* Swipeable slide area */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <motion.div
          onPanEnd={handlePanEnd}
          className="min-h-full flex items-center justify-center px-8 py-4"
        >
          <AnimatePresence custom={dir} mode="wait">
            <motion.div
              key={page}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 320, damping: 32, mass: 0.9 }}
              className="flex flex-col items-center text-center max-w-sm md:max-w-md w-full"
            >

              {/* ── Welcome ─────────────────────────────────────────────── */}
              {slide.type === 'welcome' && (
                <>
                  {/* Large icon with glow ring */}
                  <div className="relative mb-7">
                    <div className="absolute inset-0 rounded-full bg-gold/20 blur-2xl scale-110" />
                    <div className="relative w-24 h-24 rounded-[28px] bg-gold/10 border border-gold/30 flex items-center justify-center">
                      <LatinCrossIcon className="w-12 h-12 text-gold" />
                    </div>
                  </div>
                  <p className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-2">
                    {slide.tag}
                  </p>
                  <h2 className="font-playfair text-4xl font-bold text-foreground mb-5 leading-tight">
                    {slide.title}
                  </h2>
                  <p className="font-inter text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {slide.body}
                  </p>
                  {/* Liturgical color dots */}
                  <div className="flex items-center gap-2 mt-7">
                    {['bg-purple-500', 'bg-green-600', 'bg-white border border-border', 'bg-red-600', 'bg-pink-400'].map((c, i) => (
                      <div key={i} className={`w-2.5 h-2.5 rounded-full ${c}`} />
                    ))}
                  </div>
                </>
              )}

              {/* ── Language & Rite ──────────────────────────────────────── */}
              {slide.type === 'setup' && (
                <>
                  <div className="w-20 h-20 rounded-[24px] bg-gold/10 border border-gold/20 flex items-center justify-center mb-5">
                    <Languages className="w-10 h-10 text-gold" />
                  </div>
                  <p className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-2">
                    {slide.tag}
                  </p>
                  <h2 className="font-playfair text-3xl font-bold text-foreground mb-5 leading-tight">
                    {slide.title}
                  </h2>

                  <div className="w-full flex flex-col gap-5 text-left">
                    {/* Language */}
                    <div>
                      <p className="font-inter text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2.5">
                        {lang === 'es' ? 'Idioma' : 'Language'}
                      </p>
                      <div className="flex gap-2.5">
                        {[{ value: 'en', label: 'English' }, { value: 'es', label: 'Español (Beta)' }].map(({ value, label }) => (
                          <button
                            key={value}
                            onClick={() => setLang(value)}
                            className={`flex-1 py-3 px-2 rounded-xl border font-inter text-xs font-semibold transition-all leading-snug ${
                              lang === value
                                ? 'bg-gold text-white border-gold'
                                : 'border-border text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Rite */}
                    <div>
                      <p className="font-inter text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2.5">
                        {lang === 'es' ? 'Forma litúrgica' : 'Liturgical Form'}
                      </p>
                      <div className="flex gap-2.5">
                        {[
                          { value: 'NO', name: 'Novus Ordo',  sub: lang === 'es' ? 'Forma Ordinaria'       : 'Ordinary Form' },
                          { value: 'VO', name: 'Vetus Ordo',  sub: lang === 'es' ? 'Forma Extraordinaria'  : 'Extraordinary Form' },
                        ].map(({ value, name, sub }) => (
                          <button
                            key={value}
                            onClick={() => setRite(value)}
                            className={`flex-1 py-3 px-2 rounded-xl border transition-all ${
                              rite === value
                                ? 'bg-gold/10 border-gold'
                                : 'border-border text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            <p className={`font-inter text-sm font-bold ${rite === value ? 'text-gold' : 'text-foreground'}`}>
                              {name}
                            </p>
                            <p className="font-inter text-xs text-muted-foreground mt-0.5">{sub}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <p className="font-inter text-xs text-muted-foreground text-center">
                      {lang === 'es'
                        ? 'Puedes cambiar esto más tarde en Ajustes.'
                        : 'You can change these anytime in Settings.'}
                    </p>
                  </div>
                </>
              )}

              {/* ── Patron Saint ─────────────────────────────────────────── */}
              {slide.type === 'patron' && (
                <>
                  <div className="w-20 h-20 rounded-[24px] bg-gold/10 border border-gold/20 flex items-center justify-center mb-5">
                    <Star className="w-10 h-10 text-gold" />
                  </div>
                  <p className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-2">
                    {slide.tag}
                  </p>
                  <h2 className="font-playfair text-3xl font-bold text-foreground mb-2 leading-tight">
                    {slide.title}
                  </h2>
                  <p className="font-inter text-xs text-muted-foreground mb-5 leading-relaxed">
                    {lang === 'es'
                      ? 'Tu patrón aparecerá en el menú y recibirás una cuenta regresiva hasta su fiesta.'
                      : 'Your patron appears in the nav and you\'ll get a countdown to their feast day.'}
                  </p>

                  <div className="w-full flex flex-col gap-3 text-left">
                    {/* Selected patron card */}
                    {selectedPatron && (
                      <div className="rounded-xl border border-gold/40 bg-gold/5 px-4 py-3 flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-playfair text-base font-bold text-foreground leading-tight">{selectedPatron.name}</p>
                          {selectedPatron.feast_date && (
                            <p className="font-inter text-xs text-gold mt-0.5">{formatFeastDate(selectedPatron.feast_date, lang)}</p>
                          )}
                          {selectedPatron.quote && (
                            <p className="font-playfair text-xs italic text-foreground/60 mt-1.5 line-clamp-2 leading-relaxed">
                              "{selectedPatron.quote}"
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => { setPatronId('', ''); setPatronSearch(''); }}
                          className="font-inter text-xs text-muted-foreground hover:text-foreground shrink-0 mt-0.5"
                        >
                          {lang === 'es' ? 'Cambiar' : 'Change'}
                        </button>
                      </div>
                    )}

                    {/* Search input */}
                    {!selectedPatron && (
                      <input
                        type="text"
                        value={patronSearch}
                        onChange={e => setPatronSearch(e.target.value)}
                        placeholder={lang === 'es' ? 'Busca por nombre…' : 'Search by name…'}
                        className="w-full bg-secondary border border-border rounded-xl px-4 py-3 font-inter text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-gold/40 transition"
                      />
                    )}

                    {/* Matches */}
                    {!selectedPatron && patronSearch.trim() && (
                      patronMatches.length === 0 ? (
                        <p className="font-inter text-xs text-muted-foreground text-center py-2">
                          {lang === 'es' ? 'Sin resultados — prueba otro nombre.' : 'No matches — try another name.'}
                        </p>
                      ) : (
                        <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto no-scrollbar">
                          {patronMatches.map(s => (
                            <button
                              key={s.id}
                              onClick={() => { setPatronId(s.id, s.feast_date); setPatronSearch(''); }}
                              className="w-full text-left rounded-xl border border-border bg-card hover:bg-secondary px-4 py-2.5 flex items-center justify-between gap-2 transition-all active:scale-[0.99]"
                            >
                              <div className="min-w-0">
                                <p className="font-inter text-sm font-semibold text-foreground truncate">{s.name}</p>
                                {s.feast_date && (
                                  <p className="font-inter text-xs text-muted-foreground">{formatFeastDate(s.feast_date, lang)}</p>
                                )}
                              </div>
                              <span className="font-inter text-xs font-semibold text-gold shrink-0">
                                {s.daysAway === 0
                                  ? (lang === 'es' ? 'hoy' : 'today')
                                  : s.daysAway === 1
                                  ? (lang === 'es' ? 'mañana' : 'tomorrow')
                                  : `${s.daysAway}d`}
                              </span>
                            </button>
                          ))}
                        </div>
                      )
                    )}

                    {!selectedPatron && !patronSearch.trim() && saints.length === 0 && (
                      <p className="font-inter text-xs text-muted-foreground text-center py-2">
                        {lang === 'es' ? 'Cargando santos…' : 'Loading saints…'}
                      </p>
                    )}

                    <p className="font-inter text-xs text-muted-foreground text-center">
                      {lang === 'es'
                        ? 'Opcional — puedes configurarlo más tarde en Ajustes.'
                        : 'Optional — you can set this later in Settings.'}
                    </p>
                  </div>
                </>
              )}

              {/* ── Features ─────────────────────────────────────────────── */}
              {slide.type === 'features' && (
                <>
                  <div className="w-20 h-20 rounded-[24px] bg-gold/10 border border-gold/20 flex items-center justify-center mb-5">
                    <Sun className="w-10 h-10 text-gold" />
                  </div>
                  <p className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-2">
                    {slide.tag}
                  </p>
                  <h2 className="font-playfair text-3xl font-bold text-foreground mb-5 leading-tight">
                    {slide.title}
                  </h2>
                  <div className="w-full flex flex-col gap-3 text-left">
                    {features.map(({ Icon, text }, i) => (
                      <div key={i} className="flex items-start gap-4 bg-secondary rounded-2xl px-4 py-4">
                        <div className="w-8 h-8 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Icon className="w-4 h-4 text-gold" />
                        </div>
                        <p className="font-inter text-sm text-foreground/80 leading-relaxed pt-1">{text}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* ── Closing quote ─────────────────────────────────────────── */}
              {slide.type === 'info' && (
                <>
                  <div className="relative mb-7">
                    <div className="absolute inset-0 rounded-full bg-gold/20 blur-2xl scale-110" />
                    <div className="relative w-20 h-20 rounded-[24px] bg-gold/10 border border-gold/20 flex items-center justify-center">
                      <LatinCrossIcon className="w-10 h-10 text-gold" />
                    </div>
                  </div>
                  <p className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-2">
                    {slide.tag}
                  </p>
                  <h2 className="font-playfair text-3xl font-bold text-foreground mb-6 leading-tight">
                    {slide.title}
                  </h2>
                  <p className="font-inter text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {slide.body}
                  </p>
                </>
              )}

            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Bottom controls */}
      <div className="shrink-0 px-6 flex flex-col items-center gap-5 pt-3" style={{ paddingBottom: 'max(32px, env(safe-area-inset-bottom, 32px))' }}>
        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => go(i)}
              animate={{ width: i === page ? 28 : 8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className={`h-2 rounded-full transition-colors duration-200 ${
                i === page ? 'bg-gold' : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={advance}
          className="w-full max-w-sm md:max-w-md flex items-center justify-center gap-2 bg-gold hover:bg-gold/90 active:bg-gold/80 text-white font-inter font-semibold text-sm py-4 rounded-2xl transition-colors"
        >
          {ctaLabel}
          {!isLast && <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
    </motion.div>
  );
}
