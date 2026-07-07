import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { T } from '@/lib/translations';
import { formatFeastDate, liturgicalColorDotClass } from '@/utils';

const LABEL_RE = {
  gospel:   /gospel|evangelio/i,
  psalm:    /psalm|salmo/i,
  alleluia: /alleluia|aclamaci/i,
};

function isGospel(label)   { return LABEL_RE.gospel.test(label ?? ''); }
function isPsalm(label)    { return LABEL_RE.psalm.test(label ?? ''); }

function PsalmText({ text }) {
  return (
    <div className="font-inter text-[15px] text-foreground/90 leading-relaxed">
      {text.split('\n').map((line, i) => {
        const isRefrain = line.startsWith('R. ') || line === 'R.';
        return (
          <span
            key={i}
            className={`block ${isRefrain ? 'font-semibold text-gold/80 italic' : ''}`}
          >
            {line || ' '}
          </span>
        );
      })}
    </div>
  );
}

export default function ReadingsModal({ entry, rite: riteProp, open, onClose, lang: langProp }) {
  const [ctxLang] = useLanguage();
  const lang = langProp ?? ctxLang;
  const t = T[lang];

  const containerRef  = useRef(null);
  const stickyRef     = useRef(null);
  const prayerRef     = useRef(null);
  const readingRefs   = useRef([]);

  // Local rite so the user can peek at the other form without leaving the modal;
  // re-aligns with the app-wide rite each time the sheet opens.
  const [rite, setRite] = useState(riteProp ?? 'NO');
  useEffect(() => {
    if (open) setRite(riteProp ?? 'NO');
  }, [open, riteProp]);

  if (!entry) return null;

  const data       = rite === 'VO' ? entry.vo : entry.no;
  const title      = (lang === 'es' && data.title_es)      ? data.title_es      : data.title;
  const sourceUrl  = (lang === 'es' && data.source_url_es) ? data.source_url_es : data.source_url;
  const sourceName = (lang === 'es' && data.source_name_es) ? data.source_name_es : data.source_name;

  const hasVoSpanishGap =
    lang === 'es' && rite === 'VO' &&
    data.readings?.some(r => !r.text_es);

  const scrollTo = (el) => {
    const container = containerRef.current;
    if (!el || !container) return;
    const headerHeight = (stickyRef.current?.offsetHeight ?? 180) + 12;
    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const relativeTop = elRect.top - containerRect.top + container.scrollTop;
    container.scrollTo({ top: relativeTop - headerHeight, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="readings-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/40 flex items-end"
          onClick={onClose}
        >
          <motion.div
            ref={containerRef}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
            className="bg-card w-full rounded-t-3xl max-h-[90vh] overflow-y-auto pb-safe"
          >
            {/* Drag handle — not sticky so it scrolls away */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-muted rounded-full" />
            </div>

            {/* Sticky header: title + rite tabs + section jump chips */}
            <div ref={stickyRef} className="sticky top-0 bg-card z-10 border-b border-border">
              {/* Title row */}
              <div className="px-7 pt-2 pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0 pr-3">
                    <p className="font-inter text-xs font-medium tracking-[0.15em] uppercase text-gold">
                      {t.mass_readings}
                    </p>
                    <h2 className="font-playfair text-xl font-bold text-foreground mt-0.5 leading-tight">
                      {title}
                    </h2>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      {data.color && (
                        <span className={`w-2 h-2 rounded-full shrink-0 ${liturgicalColorDotClass(data.color)}`} />
                      )}
                      <p className="font-inter text-xs text-muted-foreground">
                        {formatFeastDate(entry.date.slice(5), lang)}
                        {rite === 'NO' && data.lectionary
                          ? ` · ${t.lectionary}: ${data.lectionary}${data.cycle ? ` (${data.cycle})` : ''}`
                          : ''}
                        {rite === 'VO' && data.rank ? ` · ${data.rank}` : ''}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary text-muted-foreground hover:bg-muted transition-colors mt-1 shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Rite tabs */}
                <div className="flex gap-1.5 mt-3">
                  {[{ key: 'NO', label: t.ordinary_form }, { key: 'VO', label: t.extraordinary_form }].map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => setRite(key)}
                      className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-inter font-semibold transition-all border ${
                        rite === key
                          ? 'bg-gold text-white border-gold'
                          : 'border-border text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Section jump chips */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar py-2 px-7">
                <button
                  onClick={() => scrollTo(prayerRef.current)}
                  className="shrink-0 px-3 py-1 rounded-full text-[11px] font-inter font-medium border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                >
                  {lang === 'es' ? 'Oración' : 'Prayer'}
                </button>
                {data.readings.map((r, i) => {
                  const label = (lang === 'es' && r.label_es) ? r.label_es : r.label;
                  const gospel = isGospel(label);
                  return (
                    <button
                      key={i}
                      onClick={() => scrollTo(readingRefs.current[i])}
                      className={`shrink-0 px-3 py-1 rounded-full text-[11px] font-inter font-medium border transition-colors ${
                        gospel
                          ? 'border-gold/50 text-gold bg-gold/5 hover:bg-gold/10'
                          : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              {/* chips bottom padding */}
              <div className="h-2" />
            </div>

            {/* Readings content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={rite}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="px-7 py-6 flex flex-col gap-7"
              >
                {/* VO Spanish gap notice */}
                {hasVoSpanishGap && (
                  <p className="font-inter text-[11px] text-muted-foreground/70 italic text-center -mb-2">
                    {t.vo_no_spanish}
                  </p>
                )}

                {/* Prayer before Mass */}
                <div ref={prayerRef} className="border border-border/60 rounded-2xl px-5 py-4 bg-muted/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-5 h-px bg-gold" />
                    <p className="font-inter text-xs font-medium uppercase tracking-widest text-muted-foreground">
                      {t.prayer_before_mass}
                    </p>
                  </div>
                  <p className="font-inter text-[14px] text-foreground/80 leading-relaxed italic">
                    Eternal Father, we humbly offer Thee our poor presence, and that of the whole of humanity, from the beginning to the end of the world at all the Masses that ever have or ever will be prayed. We offer Thee all the pains, sufferings, prayers, sacrifices, joys, and relaxations of our lives, in union with those of our Lord Jesus here on earth. May the Most Precious Blood of Christ, all His Blood, Wounds, and Agony save us, through the Sorrowful and Immaculate Heart of Mary. Amen.
                  </p>
                </div>

                {data.readings.map((r, i) => {
                  const label    = (lang === 'es' && r.label_es)    ? r.label_es    : r.label;
                  const citation = (lang === 'es' && r.citation_es) ? r.citation_es : r.citation;
                  const text     = (lang === 'es' && r.text_es)     ? r.text_es     : r.text;
                  const gospel   = isGospel(label);
                  const psalm    = isPsalm(label);

                  return (
                    <div
                      key={i}
                      ref={el => { readingRefs.current[i] = el; }}
                      className={gospel ? 'border-l-2 border-gold/50 pl-5 -ml-1' : ''}
                    >
                      <div className="flex items-center gap-3 mb-1">
                        <div className={`w-5 h-px ${gospel ? 'bg-gold' : 'bg-gold/60'}`} />
                        <p className={`font-inter text-xs font-medium uppercase tracking-widest ${gospel ? 'text-gold' : 'text-muted-foreground'}`}>
                          {label}
                        </p>
                        {gospel && (
                          <span className="font-playfair text-gold text-sm ml-0.5">✝</span>
                        )}
                      </div>
                      {citation && (
                        <p className="font-inter text-xs font-semibold text-gold mb-3 ml-8">{citation}</p>
                      )}
                      {psalm ? (
                        <PsalmText text={text} />
                      ) : (
                        <p className={`font-inter text-[15px] text-foreground/90 leading-relaxed whitespace-pre-line ${citation ? '' : 'mt-3'}`}>
                          {text}
                        </p>
                      )}
                    </div>
                  );
                })}

                {/* Source attribution */}
                {sourceUrl && (
                  <a
                    href={sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-inter text-xs text-muted-foreground hover:text-foreground transition-colors self-center"
                  >
                    {t.readings_source}: {sourceName}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="h-8" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
