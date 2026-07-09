import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLanguage } from '@/lib/LanguageContext';
import { T } from '@/lib/translations';

function getPrayerPeriod() {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return 'morning';
  if (h >= 12 && h < 18) return 'midday';
  if (h >= 18 && h < 21) return 'evening';
  return 'night';
}

const PERIODS = ['morning', 'midday', 'evening', 'night'];

function getPeriodContent(period, t) {
  switch (period) {
    case 'morning': return { label: t.morning_offering, text: t.morning_offering_text };
    case 'midday':  return { label: t.angelus,          text: t.angelus_text };
    case 'evening': return { label: t.evening_prayer,   text: t.evening_prayer_text };
    case 'night':   return { label: t.night_prayer,     text: t.night_prayer_text };
  }
}

function periodTabKey(period, t) {
  switch (period) {
    case 'morning': return t.prayer_period_morning;
    case 'midday':  return t.prayer_period_midday;
    case 'evening': return t.prayer_period_evening;
    case 'night':   return t.prayer_period_night;
  }
}

export default function PrayerModal({ saint, open, onClose, lang: langProp }) {
  const [ctxLang] = useLanguage();
  const lang = langProp ?? ctxLang;
  const t = T[lang];

  const [period, setPeriod] = useState(getPrayerPeriod);

  const prayer     = saint && ((lang === 'es' && saint.prayer_es)     ? saint.prayer_es     : saint.prayer);
  const reflection = saint && ((lang === 'es' && saint.reflection_es) ? saint.reflection_es : saint.reflection);

  const defaultPrayer = saint
    ? (lang === 'es'
        ? `Oh Señor, que nos has dado el ejemplo de ${saint.name}, concédenos la gracia de imitar las virtudes de tus santos y seguir su santo ejemplo. Por Cristo nuestro Señor. Amén.`
        : `O Lord, who hast given us the example of ${saint.name}, grant us the grace to imitate the virtues of Thy saints and to follow their holy example. Through Christ our Lord. Amen.`)
    : null;

  const { label: periodLabel, text: periodText } = getPeriodContent(period, t);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="prayer-modal"
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

            {/* Header */}
            <div className="px-7 pt-4 pb-6 border-b border-border flex items-start justify-between">
              <div>
                <p className="font-inter text-xs font-medium tracking-[0.15em] uppercase text-gold">
                  {t.prayer_and_reflection}
                </p>
                <h2 className="font-playfair text-2xl font-bold text-foreground mt-1">
                  {saint ? saint.name : t.daily_prayer}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary text-muted-foreground hover:bg-muted transition-colors mt-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-7 py-6 flex flex-col gap-6">
              {/* Saint's prayer — only when a saint is passed */}
              {saint && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-5 h-px bg-gold" />
                    <p className="font-inter text-xs font-medium uppercase tracking-widest text-muted-foreground">
                      {t.todays_prayer}
                    </p>
                  </div>
                  <div className="bg-secondary rounded-2xl px-5 py-5">
                    <p className="font-playfair text-base italic text-foreground leading-loose">
                      {prayer || defaultPrayer}
                    </p>
                  </div>
                </div>
              )}

              {/* Reflection — only when a saint is passed */}
              {saint && reflection && (
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

              {/* Time-based daily prayer */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-5 h-px bg-gold" />
                  <p className="font-inter text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    {t.daily_prayer}
                  </p>
                </div>

                {/* Period tabs */}
                <div className="flex gap-1.5 mb-4 overflow-x-auto pb-1 scrollbar-none">
                  {PERIODS.map(p => (
                    <button
                      key={p}
                      onClick={() => setPeriod(p)}
                      className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-inter font-semibold transition-all border ${
                        period === p
                          ? 'bg-gold text-white border-gold'
                          : 'border-border text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {periodTabKey(p, t)}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={period}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                  >
                    <p className="font-inter text-[10px] font-semibold uppercase tracking-widest text-gold mb-3">
                      {periodLabel}
                    </p>
                    <div className="bg-secondary rounded-2xl px-5 py-5">
                      <p className="font-playfair text-base italic text-foreground leading-loose whitespace-pre-line">
                        {periodText}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="h-8" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
