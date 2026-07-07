import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff } from 'lucide-react';
import { useIsOnline } from '@/hooks/use-online';
import { useLanguage } from '@/lib/LanguageContext';
import { T } from '@/lib/translations';

export default function OfflineBanner() {
  const isOnline = useIsOnline();
  const [lang] = useLanguage();
  const t = T[lang];

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ y: -56 }}
          animate={{ y: 0 }}
          exit={{ y: -56 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-center gap-2 bg-muted-foreground text-background text-xs font-inter font-semibold px-4"
          style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 8px)', paddingBottom: 8 }}
        >
          <WifiOff className="w-3.5 h-3.5 shrink-0" />
          {t.offline_message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
