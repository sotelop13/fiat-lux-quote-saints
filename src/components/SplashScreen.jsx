import { motion } from 'framer-motion';
import LatinCrossIcon from './LatinCrossIcon';

export default function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex flex-col items-center gap-5"
      >
        <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
          <LatinCrossIcon className="w-8 h-8 text-primary-foreground" />
        </div>
        <div className="text-center">
          <h1 className="font-playfair text-4xl font-bold text-foreground tracking-tight">
            Fiat Lux
          </h1>
          <p className="font-inter text-sm font-semibold tracking-[0.2em] uppercase text-gold mt-2">
            Quote the Saints
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
