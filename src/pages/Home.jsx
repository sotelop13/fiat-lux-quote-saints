import { useState, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BottomNav from '@/components/BottomNav';
import SideNav from '@/components/SideNav';
import Today from './Today';

// Today is the default landing tab, so it stays eager (zero regression on first paint).
// The other four are code-split out of the main bundle — they only load when visited.
const Calendar = lazy(() => import('./Calendar'));
const SearchPage = lazy(() => import('./SearchPage'));
const Favorites = lazy(() => import('./Favorites'));
const SettingsPage = lazy(() => import('./SettingsPage'));

const TABS = {
  today: Today,
  calendar: Calendar,
  search: SearchPage,
  favorites: Favorites,
  settings: SettingsPage,
};

function TabFallback() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-4 border-secondary border-t-gold rounded-full animate-spin" />
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('today');
  const PageComponent = TABS[activeTab];

  return (
    <div className="min-h-screen bg-background pb-28 md:pb-0 md:pl-16 lg:pl-56 overflow-hidden">
      <SideNav activeTab={activeTab} onChange={setActiveTab} />
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >
          <Suspense fallback={<TabFallback />}>
            <PageComponent />
          </Suspense>
        </motion.div>
      </AnimatePresence>
      <BottomNav activeTab={activeTab} onChange={setActiveTab} />
    </div>
  );
}
