import { useMemo, useState } from 'react';
import { useTheme } from 'next-themes';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/lib/AuthContext';
import { useFontSize } from '@/hooks/use-font-size';
import { useLanguage } from '@/lib/LanguageContext';
import { useNameDay } from '@/hooks/use-name-day';
import { usePatronSaint } from '@/hooks/use-patron-saint';
import { T, tx } from '@/lib/translations';
import { Saint } from '@/api/entities';
import { formatFeastDate, daysUntilFeast } from '@/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { LogOut, User, Sun, Moon, Monitor, Languages, Star, X, Check, Download, Bell, Flame } from 'lucide-react';
import { useNotifications, notifSupported } from '@/hooks/use-notifications';
import { useStreak } from '@/hooks/use-streak';



const MONTHS_EN = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const MONTHS_ES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

function daysInMonth(month) {
  if (!month) return 31;
  const m = parseInt(month, 10);
  if (m === 2) return 28;
  if ([4, 6, 9, 11].includes(m)) return 30;
  return 31;
}

const THEME_OPTIONS = [
  { value: 'light',  icon: Sun     },
  { value: 'system', icon: Monitor },
  { value: 'dark',   icon: Moon    },
];

const FONT_SIZES = ['small', 'normal', 'large'];
const LANG_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español (Beta)' },
];

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [fontSize, setFontSize] = useFontSize();
  const [lang, setLang] = useLanguage();
  const [nameDayName, setNameDayName] = useNameDay();
  const [patronId, setPatronId] = usePatronSaint();
  const { permission, enabled, requestAndEnable, disable } = useNotifications();
  const { best: bestStreak } = useStreak();
  const t = T[lang];

  const [findMode, setFindMode] = useState('name');
  const [birthday, setBirthdayState] = useState(() => localStorage.getItem('fiat_lux_birthday') ?? '');
  const setBirthday = (val) => {
    setBirthdayState(val);
    if (val) localStorage.setItem('fiat_lux_birthday', val);
    else localStorage.removeItem('fiat_lux_birthday');
  };
  const birthdayMonth = birthday.slice(0, 2);
  const birthdayDay = birthday.slice(3, 5);

  const { data: saints = [] } = useQuery({
    queryKey: ['saints-all'],
    queryFn: () => Saint.list(),
  });

  const nameDayMatches = useMemo(() => {
    const n = nameDayName.trim().toLowerCase();
    if (!n) return [];
    return saints
      .filter(s => s.name?.toLowerCase().includes(n) && s.feast_date)
      .map(s => ({ ...s, daysAway: daysUntilFeast(s.feast_date) }))
      .sort((a, b) => a.daysAway - b.daysAway);
  }, [saints, nameDayName]);

  const patronSaint = useMemo(
    () => saints.find(s => s.id === patronId) ?? null,
    [saints, patronId]
  );

  const birthdaySaints = useMemo(() => {
    if (!birthday) return [];
    return saints
      .filter(s => s.feast_date === birthday)
      .map(s => ({ ...s, daysAway: daysUntilFeast(s.feast_date) }))
      .sort((a, b) => a.daysAway - b.daysAway);
  }, [saints, birthday]);

  function countdownLabel(days) {
    if (days === 0) return t.days_today;
    if (days === 1) return t.days_tomorrow;
    return tx(t.days_in_n, { n: days });
  }

  return (
    <div className="px-5 pt-12 pb-12 max-w-lg md:max-w-2xl mx-auto">
      <p className="font-inter text-xs font-medium tracking-[0.15em] uppercase text-gold mb-1">
        {t.account}
      </p>
      <h1 className="font-playfair text-3xl font-bold text-foreground mb-6">{t.settings_title}</h1>

      {/* Profile */}
      <div className="bg-card rounded-2xl border border-border px-5 py-4 mb-4 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
          <User className="w-5 h-5 text-gold" />
        </div>
        <div className="min-w-0">
          {user?.full_name && (
            <p className="font-inter text-sm font-semibold text-foreground truncate">{user.full_name}</p>
          )}
          <p className="font-inter text-sm text-muted-foreground truncate">{user?.email ?? 'Guest'}</p>
        </div>
        {bestStreak >= 2 && (
          <div className="flex items-center gap-1.5 shrink-0 pl-3 ml-auto border-l border-border">
            <Flame className="w-4 h-4 text-gold fill-gold/20" />
            <div className="leading-tight">
              <p className="font-inter text-sm font-semibold text-foreground">{tx(t.best_streak_days, { n: bestStreak })}</p>
              <p className="font-inter text-[10px] text-muted-foreground">{t.best_streak}</p>
            </div>
          </div>
        )}
      </div>

      <Separator className="my-4" />

      {/* Name Day / Patron Saint */}
      <div className="flex items-center gap-2 mb-1">
        <Star className="w-3.5 h-3.5 text-gold" />
        <p className="font-inter text-xs font-semibold tracking-[0.15em] uppercase text-gold">
          {t.name_day}
        </p>
      </div>
      <p className="font-inter text-xs text-muted-foreground mb-3">{t.name_day_hint}</p>

      {/* Patron hero card */}
      {patronSaint && (
        <div className="rounded-2xl border border-gold/40 bg-gold/5 px-5 py-4 mb-3">
          <div className="flex items-start justify-between">
            <p className="font-inter text-[10px] font-semibold tracking-[0.15em] uppercase text-gold">
              {t.your_patron_saint}
            </p>
            <button
              onClick={() => setPatronId('')}
              className="w-6 h-6 -mt-0.5 -mr-1 flex items-center justify-center rounded-full hover:bg-gold/10 transition-colors text-gold/50 hover:text-gold"
              aria-label="Clear patron"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <h3 className="font-playfair text-xl font-bold text-foreground mt-2">{patronSaint.name}</h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            {patronSaint.feast_date && (
              <p className="font-inter text-xs text-muted-foreground">
                {formatFeastDate(patronSaint.feast_date, lang)}
              </p>
            )}
            {patronSaint.feast_date && (
              <span className="font-inter text-xs font-semibold text-gold">
                · {countdownLabel(daysUntilFeast(patronSaint.feast_date))}
              </span>
            )}
          </div>
          {patronSaint.quote && (
            <>
              <div className="w-full h-px bg-gold/20 my-3" />
              <p className="font-playfair text-sm italic text-foreground/80 leading-relaxed">
                "{patronSaint.quote}"
              </p>
            </>
          )}
        </div>
      )}

      {/* Find by tabs */}
      <div className="flex gap-2 mb-4">
        {[{ key: 'name', label: t.find_by_name }, { key: 'birthday', label: t.find_by_birthday }].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFindMode(key)}
            className={`flex-1 py-2.5 rounded-xl border transition-all font-inter text-sm font-medium
              ${findMode === key ? 'border-gold bg-gold/5 text-gold' : 'border-border text-muted-foreground hover:text-foreground'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* By Name */}
      {findMode === 'name' && (
        <>
          <input
            type="text"
            value={nameDayName}
            onChange={e => setNameDayName(e.target.value)}
            placeholder={t.name_day_your_name}
            className="w-full bg-secondary border border-border rounded-xl px-4 py-3 font-inter text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-gold/40 transition mb-3"
          />
          {nameDayName.trim() && (
            nameDayMatches.length === 0 ? (
              <p className="font-inter text-xs text-muted-foreground mb-4">{t.name_day_no_match}</p>
            ) : (
              <div className="flex flex-col gap-2 mb-4">
                {!patronSaint && (
                  <p className="font-inter text-xs text-muted-foreground -mt-1 mb-0.5">
                    {t.name_day_tap_to_select}
                  </p>
                )}
                {nameDayMatches.map(s => {
                  const isSelected = s.id === patronId;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setPatronId(isSelected ? '' : s.id, isSelected ? '' : s.feast_date)}
                      className={`w-full text-left rounded-xl border px-4 py-3 flex items-start gap-3 transition-all active:scale-[0.99] ${
                        isSelected ? 'border-gold/40 bg-gold/5' : 'border-border bg-card hover:bg-secondary'
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <p className="font-inter text-sm font-semibold text-foreground">{s.name}</p>
                          <span className="font-inter text-xs font-semibold text-gold shrink-0">
                            {countdownLabel(s.daysAway)}
                          </span>
                        </div>
                        <p className="font-inter text-xs text-muted-foreground">{formatFeastDate(s.feast_date, lang)}</p>
                        {s.quote && (
                          <p className="font-playfair text-xs italic text-foreground/60 mt-1.5 line-clamp-2 leading-relaxed">
                            "{s.quote}"
                          </p>
                        )}
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />}
                    </button>
                  );
                })}
              </div>
            )
          )}
        </>
      )}

      {/* By Birthday */}
      {findMode === 'birthday' && (
        <>
          <div className="flex gap-2 mb-3">
            <select
              value={birthdayMonth}
              onChange={e => {
                const m = e.target.value;
                const maxD = daysInMonth(m);
                const d = birthdayDay && parseInt(birthdayDay) > maxD
                  ? String(maxD).padStart(2, '0')
                  : (birthdayDay || '01');
                setBirthday(m ? `${m}-${d}` : '');
              }}
              className="flex-1 bg-secondary border border-border rounded-xl px-3 py-3 font-inter text-sm text-foreground outline-none focus:ring-2 focus:ring-gold/40 transition"
            >
              <option value="">{t.birthday_month}</option>
              {(lang === 'es' ? MONTHS_ES : MONTHS_EN).map((name, i) => (
                <option key={i} value={String(i + 1).padStart(2, '0')}>{name}</option>
              ))}
            </select>
            <select
              value={birthdayDay}
              onChange={e => {
                const d = e.target.value;
                setBirthday(birthdayMonth ? `${birthdayMonth}-${d}` : '');
              }}
              disabled={!birthdayMonth}
              className="w-24 bg-secondary border border-border rounded-xl px-3 py-3 font-inter text-sm text-foreground outline-none focus:ring-2 focus:ring-gold/40 transition disabled:opacity-40"
            >
              <option value="">{t.birthday_day}</option>
              {Array.from({ length: daysInMonth(birthdayMonth) }, (_, i) => {
                const d = String(i + 1).padStart(2, '0');
                return <option key={d} value={d}>{i + 1}</option>;
              })}
            </select>
          </div>
          {birthday && (
            birthdaySaints.length === 0 ? (
              <p className="font-inter text-xs text-muted-foreground mb-4">{t.birthday_no_saints}</p>
            ) : (
              <div className="flex flex-col gap-2 mb-4">
                {!patronSaint && (
                  <p className="font-inter text-xs text-muted-foreground -mt-1 mb-0.5">
                    {t.name_day_tap_to_select}
                  </p>
                )}
                {birthdaySaints.map(s => {
                  const isSelected = s.id === patronId;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setPatronId(isSelected ? '' : s.id, isSelected ? '' : s.feast_date)}
                      className={`w-full text-left rounded-xl border px-4 py-3 flex items-start gap-3 transition-all active:scale-[0.99] ${
                        isSelected ? 'border-gold/40 bg-gold/5' : 'border-border bg-card hover:bg-secondary'
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <p className="font-inter text-sm font-semibold text-foreground">{s.name}</p>
                          <span className="font-inter text-xs font-semibold text-gold shrink-0">
                            {countdownLabel(s.daysAway)}
                          </span>
                        </div>
                        <p className="font-inter text-xs text-muted-foreground">{formatFeastDate(s.feast_date, lang)}</p>
                        {s.quote && (
                          <p className="font-playfair text-xs italic text-foreground/60 mt-1.5 line-clamp-2 leading-relaxed">
                            "{s.quote}"
                          </p>
                        )}
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />}
                    </button>
                  );
                })}
              </div>
            )
          )}
        </>
      )}

      <Separator className="my-4" />

      {/* Appearance */}
      <p className="font-inter text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-3">
        {t.appearance}
      </p>
      <div className="flex gap-2 mb-6">
        {THEME_OPTIONS.map(({ value, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setTheme(value)}
            className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl border transition-all font-inter text-xs font-medium
              ${theme === value
                ? 'border-gold bg-gold/5 text-gold'
                : 'border-border text-muted-foreground hover:text-foreground'}`}
          >
            <Icon className="w-4 h-4" />
            {t[value]}
          </button>
        ))}
      </div>

      <Separator className="my-4" />

      {/* Text Size */}
      <p className="font-inter text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-3">
        {t.text_size}
      </p>
      <div className="flex gap-2 mb-6">
        {FONT_SIZES.map((value) => (
          <button
            key={value}
            onClick={() => setFontSize(value)}
            className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl border transition-all font-inter text-xs font-medium
              ${fontSize === value
                ? 'border-gold bg-gold/5 text-gold'
                : 'border-border text-muted-foreground hover:text-foreground'}`}
          >
            <span className={`font-playfair font-bold leading-none ${value === 'small' ? 'text-sm' : value === 'large' ? 'text-xl' : 'text-base'}`}>A</span>
            {t[value]}
          </button>
        ))}
      </div>

      <Separator className="my-4" />

      {/* Language */}
      <div className="flex items-center gap-2 mb-3">
        <Languages className="w-3.5 h-3.5 text-muted-foreground" />
        <p className="font-inter text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
          {t.language}
        </p>
      </div>
      <div className="flex gap-2 mb-6">
        {LANG_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setLang(value)}
            className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl border transition-all font-inter text-sm font-medium
              ${lang === value
                ? 'border-gold bg-gold/5 text-gold'
                : 'border-border text-muted-foreground hover:text-foreground'}`}
          >
            {label}
          </button>
        ))}
      </div>

      <Separator className="my-4" />

      {/* Notifications */}
      <div className="flex items-center gap-2 mb-3">
        <Bell className="w-3.5 h-3.5 text-muted-foreground" />
        <p className="font-inter text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
          {t.notifications}
        </p>
      </div>
      <div className="bg-card rounded-2xl border border-border px-5 py-4 mb-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="font-inter text-sm font-semibold text-foreground">{t.notifications_daily}</p>
            <p className="font-inter text-xs text-muted-foreground mt-0.5">{t.notifications_hint}</p>
          </div>
          <button
            onClick={() => (enabled ? disable() : requestAndEnable())}
            disabled={!notifSupported() || permission === 'denied'}
            role="switch"
            aria-checked={enabled && permission === 'granted'}
            className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none disabled:opacity-40 ${
              enabled && permission === 'granted' ? 'bg-gold' : 'bg-muted-foreground/30'
            }`}
          >
            <span className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
              enabled && permission === 'granted' ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>
        {permission === 'denied' && notifSupported() && (
          <p className="font-inter text-xs text-muted-foreground mt-3 leading-relaxed">
            {t.notifications_blocked}
          </p>
        )}
        {!notifSupported() && (
          <p className="font-inter text-xs text-muted-foreground mt-3">
            {lang === 'es' ? 'No disponible en este navegador' : 'Not available on this browser'}
          </p>
        )}
      </div>

      <Separator className="my-4" />

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <Button
          variant="outline"
          className="w-full justify-start gap-3"
          onClick={() => {
            const favorites = JSON.parse(localStorage.getItem('fiat_lux_favorites') || '[]');
            const blob = new Blob([JSON.stringify(favorites, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'fiat-lux-favorites.json';
            a.click();
            URL.revokeObjectURL(url);
          }}
        >
          <Download className="w-4 h-4" />
          {t.export_favorites ?? 'Export Favorites'}
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start gap-3 text-destructive border-destructive/30 hover:bg-destructive/5"
          onClick={logout}
        >
          <LogOut className="w-4 h-4" />
          {t.sign_out}
        </Button>
      </div>

      <p className="font-inter text-xs text-center text-muted-foreground mt-8">
        Fiat Lux · Quote the Saints
      </p>
    </div>
  );
}
