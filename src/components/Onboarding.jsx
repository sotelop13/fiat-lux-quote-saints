import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Languages, ChevronRight, Heart, Calendar, Star } from 'lucide-react';
import LatinCrossIcon from './LatinCrossIcon';
import { useLanguage } from '@/lib/LanguageContext';
import { useRite } from '@/hooks/use-rite';

const variants = {
  enter: (dir) => ({ x: dir > 0 ? '55%' : '-55%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (dir) => ({ x: dir > 0 ? '-55%' : '55%', opacity: 0 }),
};

const FEATURES = {
  en: [
    { Icon: Sun,      text: 'A new saint, quote, and prayer every day.' },
    { Icon: Calendar, text: 'The liturgical year, month by month, in colour.' },
    { Icon: Heart,    text: 'Save favourites, sorted by upcoming feast day.' },
    { Icon: Star,     text: 'Set your patron saint and track your name day.' },
  ],
  es: [
    { Icon: Sun,      text: 'Un nuevo santo, cita y oración cada día.' },
    { Icon: Calendar, text: 'El año litúrgico, mes a mes, en color.' },
    { Icon: Heart,    text: 'Guarda favoritos, ordenados por próxima fiesta.' },
    { Icon: Star,     text: 'Elige tu santo patrón y sigue tu onomástica.' },
  ],
};

export default function Onboarding({ onDone }) {
  const [page, setPage] = useState(0);
  const [dir, setDir]   = useState(1);
  const [lang, setLang] = useLanguage();
  const [rite, setRite] = useRite();

  // Slides defined inside component so they react to language changes instantly
  const SLIDES = [
    {
      type:  'info',
      Icon:  LatinCrossIcon,
      tag:   lang === 'es' ? 'Bienvenido'     : 'Welcome',
      title: 'Fiat Lux',
      body:  lang === 'es'
        ? 'Compañero diario para la vida litúrgica.\nCamina con los santos a través del año sagrado.'
        : 'A daily companion for the liturgical life.\nWalk with the saints through the sacred year.',
    },
    {
      type:  'setup',
      Icon:  Languages,
      tag:   lang === 'es' ? 'Configuración'  : 'Set Up',
      title: lang === 'es' ? 'Hazlo tuyo'     : 'Make it yours',
      body:  null,
    },
    {
      type:  'features',
      Icon:  Sun,
      tag:   lang === 'es' ? 'Descubre'       : 'Discover',
      title: lang === 'es' ? 'Todo en uno'    : 'All in one place',
      body:  null,
    },
    {
      type:  'info',
      Icon:  LatinCrossIcon,
      tag:   lang === 'es' ? 'Listo'          : 'Ready',
      title: lang === 'es' ? 'Empieza hoy'    : 'Begin today',
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

  const slide  = SLIDES[page];
  const isLast = page === SLIDES.length - 1;
  const isSetup = slide.type === 'setup';
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

      {/* Swipeable slide area — overflow-x-hidden clips the side animation;
          overflow-y-auto allows scrolling on short screens */}
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
            className="flex flex-col items-center text-center max-w-sm w-full"
          >
            {/* Icon badge */}
            <div className="w-20 h-20 rounded-[24px] bg-gold/10 border border-gold/20 flex items-center justify-center mb-5">
              <slide.Icon className="w-10 h-10 text-gold" />
            </div>

            {/* Tag */}
            <p className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-2">
              {slide.tag}
            </p>

            {/* Title */}
            <h2 className="font-playfair text-3xl font-bold text-foreground mb-5 leading-tight">
              {slide.title}
            </h2>

            {/* Body — varies by slide type */}
            {slide.type === 'info' && (
              <p className="font-inter text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {slide.body}
              </p>
            )}

            {slide.type === 'setup' && (
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
            )}

            {slide.type === 'features' && (
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
          className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold/90 active:bg-gold/80 text-white font-inter font-semibold text-sm py-4 rounded-2xl transition-colors"
        >
          {ctaLabel}
          {!isLast && <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
    </motion.div>
  );
}
