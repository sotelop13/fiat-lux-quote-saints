import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BottomNav from '@/components/BottomNav';
import SideNav from '@/components/SideNav';
import Today from './Today';
import Calendar from './Calendar';
import SearchPage from './SearchPage';
import Favorites from './Favorites';
import SettingsPage from './SettingsPage';

const TABS = {
  today: Today,
  calendar: Calendar,
  search: SearchPage,
  favorites: Favorites,
  settings: SettingsPage,
};

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
          <PageComponent />
        </motion.div>
      </AnimatePresence>
      <BottomNav activeTab={activeTab} onChange={setActiveTab} />
    </div>
  );
}
