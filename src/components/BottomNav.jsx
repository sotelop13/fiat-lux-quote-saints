import { motion, useMotionValue, animate } from 'framer-motion';
import { Sun, Calendar, Search, Heart, Settings } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { usePatronSaint } from '@/hooks/use-patron-saint';
import { T } from '@/lib/translations';

const TAB_DEFS = [
  { id: 'today',     labelKey: 'tab_today',     icon: Sun      },
  { id: 'calendar',  labelKey: 'tab_calendar',  icon: Calendar },
  { id: 'search',    labelKey: 'tab_saints',    icon: Search   },
  { id: 'favorites', labelKey: 'tab_favorites', icon: Heart    },
  { id: 'settings',  labelKey: 'tab_settings',  icon: Settings },
];

export default function BottomNav({ activeTab, onChange }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const containerRef = useRef(null);
  const loupeX = useMotionValue(0);
  const [tabWidth, setTabWidth] = useState(0);
  const [containerPad, setContainerPad] = useState(4);
  const isFirstPos = useRef(true);
  const [lang] = useLanguage();
  const t = T[lang];
  const [,, patronFeastMMDD] = usePatronSaint();

  const patronDaysAway = (() => {
    if (!patronFeastMMDD) return 999;
    const [mm, dd] = patronFeastMMDD.split('-').map(Number);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    let feast = new Date(now.getFullYear(), mm - 1, dd);
    feast.setHours(0, 0, 0, 0);
    if (feast < now) feast.setFullYear(now.getFullYear() + 1);
    return Math.round((feast - now) / (1000 * 60 * 60 * 24));
  })();
  const showPatronBadge = patronDaysAway <= 1;
  const TABS = TAB_DEFS.map(tab => ({ ...tab, label: t[tab.labelKey] }));
  const activeIndex = TABS.findIndex(tab => tab.id === activeTab);

  // Position of loupe for tab index i — uses measured padding, not a hardcoded constant
  const posFor = (i) => containerPad + i * tabWidth;

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      // Read the actual rendered padding (rem-based, affected by font size setting)
      const padLeft = parseFloat(window.getComputedStyle(containerRef.current).paddingLeft);
      const innerW = containerRef.current.clientWidth - padLeft * 2;
      setContainerPad(padLeft);
      setTabWidth(innerW / TABS.length);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Position loupe: snap on first mount, spring-animate on tab switches
  useEffect(() => {
    if (tabWidth === 0) return;
    const targetX = posFor(activeIndex);
    if (isFirstPos.current) {
      loupeX.set(targetX);
      isFirstPos.current = false;
    } else {
      animate(loupeX, targetX, {
        type: 'spring',
        stiffness: 480,
        damping: 36,
        mass: 0.9,
      });
    }
  }, [activeIndex, tabWidth, containerPad]);

  // Track finger live — loupe follows with no lag
  const handlePan = (_, info) => {
    if (!containerRef.current || tabWidth === 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relX = info.point.x - rect.left - containerPad - tabWidth / 2;
    const clamped = Math.max(0, Math.min((TABS.length - 1) * tabWidth, relX));
    loupeX.set(containerPad + clamped);
  };

  // Spring-snap to nearest tab on release
  const handlePanEnd = () => {
    if (tabWidth === 0) return;
    const nearest = Math.max(
      0,
      Math.min(TABS.length - 1, Math.round((loupeX.get() - containerPad) / tabWidth))
    );
    animate(loupeX, posFor(nearest), {
      type: 'spring',
      stiffness: 520,
      damping: 38,
    });
    navigator.vibrate?.(8);
    onChange(TABS[nearest].id);
  };

  const loupeStyle = {
    background: isDark
      ? 'linear-gradient(160deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.06) 100%)'
      : 'linear-gradient(160deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.58) 100%)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: isDark
      ? '1px solid rgba(255,255,255,0.20)'
      : '1px solid rgba(255,255,255,1)',
    boxShadow: isDark
      ? '0 2px 16px rgba(0,0,0,0.45), inset 0 1.5px 0 rgba(255,255,255,0.18)'
      : '0 2px 14px rgba(0,0,0,0.08), inset 0 1.5px 0 rgba(255,255,255,1)',
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 px-3 max-w-lg mx-auto inset-x-0"
      style={{ paddingBottom: 'max(10px, env(safe-area-inset-bottom, 10px))' }}
    >
      <motion.div
        ref={containerRef}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        className="relative flex items-center px-1 py-1.5"
        style={{
          borderRadius: 28,
          background: isDark ? 'rgba(16, 16, 20, 0.82)' : 'rgba(255, 255, 255, 0.74)',
          backdropFilter: 'blur(28px) saturate(200%)',
          WebkitBackdropFilter: 'blur(28px) saturate(200%)',
          border: isDark
            ? '1px solid rgba(255,255,255,0.09)'
            : '1px solid rgba(255,255,255,0.78)',
          boxShadow: isDark
            ? '0 8px 32px rgba(0,0,0,0.52), 0 2px 8px rgba(0,0,0,0.36), inset 0 1px 0 rgba(255,255,255,0.07)'
            : '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.92)',
        }}
      >
        {/* Glass loupe — top/bottom inset matches container py-1.5 exactly */}
        {tabWidth > 0 && (
          <motion.div
            className="absolute top-1.5 bottom-1.5 pointer-events-none"
            style={{
              x: loupeX,
              width: tabWidth,
              borderRadius: 22,
              ...loupeStyle,
            }}
          />
        )}

        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => { navigator.vibrate?.(8); onChange(tab.id); }}
              className="relative flex-1 flex flex-col items-center gap-0.5 py-2 px-0.5 z-10"
              style={{ borderRadius: 20 }}
            >
              <span className="relative inline-flex">
                <motion.div
                  animate={{ scale: isActive ? 1.13 : 1 }}
                  transition={{ type: 'spring', stiffness: 600, damping: 32 }}
                >
                  <tab.icon
                    className={`w-[22px] h-[22px] transition-colors duration-150 ${
                      isActive ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                    strokeWidth={isActive ? 2.2 : 1.6}
                  />
                </motion.div>
                {tab.id === 'today' && showPatronBadge && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-gold ring-1 ring-background" />
                )}
              </span>
              <span
                className={`font-inter text-[9.5px] leading-none transition-all duration-150 ${
                  isActive ? 'text-foreground font-semibold' : 'text-muted-foreground font-medium'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </motion.div>
    </div>
  );
}
