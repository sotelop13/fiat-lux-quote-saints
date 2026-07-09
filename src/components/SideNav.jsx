import { Sun, Calendar, Search, Heart, Settings } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { T } from '@/lib/translations';
import { usePatronSaint } from '@/hooks/use-patron-saint';
import { config } from '@/lib/app-params';

const TAB_DEFS = [
  { id: 'today',     labelKey: 'tab_today',     icon: Sun      },
  { id: 'calendar',  labelKey: 'tab_calendar',  icon: Calendar },
  { id: 'search',    labelKey: 'tab_saints',    icon: Search   },
  { id: 'favorites', labelKey: 'tab_favorites', icon: Heart    },
  { id: 'settings',  labelKey: 'tab_settings',  icon: Settings },
];

export default function SideNav({ activeTab, onChange }) {
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

  return (
    <nav className="hidden md:flex flex-col fixed left-0 top-0 h-full w-16 lg:w-56 border-r border-border bg-background/90 backdrop-blur-xl z-40 py-6">
      {/* App name — lg+ only */}
      <div className="px-4 mb-8 hidden lg:block">
        <span className="font-playfair font-bold text-xl text-foreground">{config.appName}</span>
      </div>

      <div className="flex flex-col gap-1 flex-1">
        {TAB_DEFS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl transition-colors relative ${
                isActive
                  ? 'bg-foreground/10 text-foreground'
                  : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground'
              }`}
            >
              <span className="relative flex-shrink-0 flex items-center justify-center w-5 h-5">
                <tab.icon
                  className="w-5 h-5"
                  strokeWidth={isActive ? 2.2 : 1.6}
                />
                {tab.id === 'today' && showPatronBadge && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-gold ring-1 ring-background" />
                )}
              </span>
              <span className={`hidden lg:block font-inter text-sm leading-none ${isActive ? 'font-semibold' : 'font-medium'}`}>
                {t[tab.labelKey]}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
