import { motion, AnimatePresence } from "framer-motion";
import { X, Share2, CalendarPlus, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from '@/lib/LanguageContext';
import { T, VIRTUES_ES } from '@/lib/translations';
import { buildFeastICS } from '@/utils';

export default function SaintDetailModal({ saint, liturgical, open, onClose, context = 'calendar', lang: langProp }) {
  const [ctxLang] = useLanguage();
  const lang = langProp ?? ctxLang;
  const t = T[lang];
  const [bioExpanded, setBioExpanded] = useState(false);

  useEffect(() => { if (open) setBioExpanded(false); }, [open]);

  if (!saint) return null;

  const quote      = (lang === 'es' && saint.quote_es)      ? saint.quote_es      : saint.quote;
  const prayer     = (lang === 'es' && saint.prayer_es)     ? saint.prayer_es     : saint.prayer;
  const reflection = (lang === 'es' && saint.reflection_es) ? saint.reflection_es : saint.reflection;
  const biography  = (lang === 'es' && saint.biography_es)  ? saint.biography_es  : saint.biography;

  const handleShare = async () => {
    const text = quote ? `"${quote}" — ${saint.name}` : saint.name;
    if (navigator.share) {
      await navigator.share({ title: saint.name, text });
    } else {
      await navigator.clipboard.writeText(text);
    }
  };

  const handleAddToCalendar = () => {
    const ics = buildFeastICS(saint, t.feast_day);
    const blob = new Blob([ics], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${saint.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const defaultPrayer = lang === 'es'
    ? `Oh Señor, que nos has dado el ejemplo de ${saint.name}, concédenos la gracia de imitar las virtudes de tus santos y seguir su santo ejemplo. Por Cristo nuestro Señor. Amén.`
    : `O Lord, who hast given us the example of ${saint.name}, grant us the grace to imitate the virtues of Thy saints and to follow their holy example. Through Christ our Lord. Amen.`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="saint-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/40 flex items-end"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
            className="bg-card w-full rounded-t-3xl max-h-[90vh] overflow-y-auto pb-safe"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-muted rounded-full" />
            </div>

            {/* Hero image */}
            {saint.image_url && (
              <div className="relative h-52 overflow-hidden">
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

            {/* Header */}
            <div className="px-7 pt-4 pb-6 border-b border-border flex items-start justify-between">
              <div>
                <p className="font-inter text-xs font-medium tracking-[0.15em] uppercase text-gold">
                  {context === 'today' ? t.saint_of_the_day : t.feast_day}
                </p>
                <h2 className="font-playfair text-2xl font-bold text-foreground mt-1">{saint.name}</h2>
                {(saint.birth_year || saint.death_year) && (
                  <p className="font-inter text-sm text-muted-foreground mt-0.5">
                    {saint.birth_year && `${t.born} ${saint.birth_year}`}
                    {saint.birth_year && saint.death_year && " – "}
                    {saint.death_year && `${t.died} ${saint.death_year}`}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1 mt-1">
                {saint.feast_date && (
                  <button
                    onClick={handleAddToCalendar}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary text-muted-foreground hover:bg-muted transition-colors"
                    aria-label="Add to Calendar"
                  >
                    <CalendarPlus className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={handleShare}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary text-muted-foreground hover:bg-muted transition-colors"
                  aria-label="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary text-muted-foreground hover:bg-muted transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="px-7 py-6 flex flex-col gap-6">
              {/* Quote */}
              <div className="bg-secondary rounded-2xl px-5 py-5">
                <span className="font-playfair text-5xl text-gold/25 leading-none block -mb-2">"</span>
                <p className="font-playfair text-base italic text-foreground leading-relaxed">
                  {quote}
                </p>
              </div>

              {/* Patron & virtue */}
              <div className="flex gap-3">
                {saint.patron_of && (
                  <div className="flex-1 rounded-xl border border-border px-4 py-3">
                    <p className="font-inter text-xs uppercase tracking-widest text-muted-foreground mb-1">
                      {t.patron}
                    </p>
                    <p className="font-inter text-sm font-medium text-foreground">{saint.patron_of}</p>
                  </div>
                )}
                {saint.virtue && (
                  <div className="flex-1 rounded-xl border border-gold/30 bg-gold/5 px-4 py-3">
                    <p className="font-inter text-xs uppercase tracking-widest text-gold mb-1">
                      {t.virtue}
                    </p>
                    <p className="font-inter text-sm font-medium text-foreground">
                      {lang === 'es' ? (VIRTUES_ES[saint.virtue] ?? saint.virtue) : saint.virtue}
                    </p>
                  </div>
                )}
              </div>

              {/* Biography */}
              {biography && (() => {
                const paras = biography.split("\n\n");
                const PREVIEW = 2;
                const hasMore = paras.length > PREVIEW;
                const visible = bioExpanded ? paras : paras.slice(0, PREVIEW);
                return (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-5 h-px bg-gold" />
                      <p className="font-inter text-xs font-medium uppercase tracking-widest text-muted-foreground">
                        {t.biography}
                      </p>
                    </div>
                    <div className="font-inter text-sm text-foreground leading-relaxed space-y-3">
                      {visible.map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                    {hasMore && (
                      <button
                        onClick={() => setBioExpanded(x => !x)}
                        className="mt-3 flex items-center gap-1 font-inter text-xs font-semibold text-gold hover:underline"
                      >
                        {bioExpanded ? (
                          <><ChevronUp className="w-3.5 h-3.5" /> {t.read_less ?? 'Read less'}</>
                        ) : (
                          <><ChevronDown className="w-3.5 h-3.5" /> {t.read_more ?? 'Read more'}</>
                        )}
                      </button>
                    )}
                  </div>
                );
              })()}

              {/* Canonization */}
              {saint.canonization_year && (
                <div className="rounded-xl border border-border px-5 py-4">
                  <p className="font-inter text-xs uppercase tracking-widest text-muted-foreground mb-1">
                    {t.canonized}
                  </p>
                  <p className="font-inter text-sm font-medium text-foreground">{saint.canonization_year}</p>
                </div>
              )}

              {/* Prayer */}
              {(prayer || saint.name) && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-5 h-px bg-gold" />
                    <p className="font-inter text-xs font-medium uppercase tracking-widest text-muted-foreground">
                      {t.prayer}
                    </p>
                  </div>
                  <div className="bg-secondary rounded-2xl px-5 py-5">
                    <p className="font-playfair text-base italic text-foreground leading-loose">
                      {prayer || defaultPrayer}
                    </p>
                  </div>
                </div>
              )}

              {/* Reflection */}
              {reflection && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-5 h-px bg-gold" />
                    <p className="font-inter text-xs font-medium uppercase tracking-widest text-muted-foreground">
                      {t.reflection}
                    </p>
                  </div>
                  <div className="rounded-xl border border-gold/30 bg-gold/5 px-5 py-4">
                    <p className="font-inter text-sm text-foreground leading-relaxed">
                      {reflection}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="h-8" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
