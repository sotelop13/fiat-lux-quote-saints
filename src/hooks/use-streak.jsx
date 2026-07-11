import { useEffect, useState } from 'react';
import { format, parseISO, differenceInCalendarDays } from 'date-fns';

const COUNT_KEY = 'fiat_lux_streak_count';
const LAST_KEY  = 'fiat_lux_streak_last_date';
const BEST_KEY  = 'fiat_lux_streak_best';

// Tracks consecutive calendar days the user has opened the Today tab.
// Call once from Today.jsx on mount. Uses parseISO (not `new Date(str)`,
// which parses bare yyyy-MM-dd as UTC) so the day-gap math stays correct
// across timezones near midnight.
export function useStreak() {
  const [streak, setStreak] = useState(() => Number(localStorage.getItem(COUNT_KEY)) || 0);
  const [best, setBest] = useState(() => Number(localStorage.getItem(BEST_KEY)) || 0);

  useEffect(() => {
    const todayStr = format(new Date(), 'yyyy-MM-dd');
    const lastStr = localStorage.getItem(LAST_KEY);

    if (lastStr === todayStr) return; // already counted today

    const gap = lastStr ? differenceInCalendarDays(parseISO(todayStr), parseISO(lastStr)) : null;
    const next = gap === 1 ? streak + 1 : 1;

    localStorage.setItem(COUNT_KEY, String(next));
    localStorage.setItem(LAST_KEY, todayStr);
    setStreak(next);

    if (next > best) {
      localStorage.setItem(BEST_KEY, String(next));
      setBest(next);
    }
  // Runs once per mount to evaluate the day gap; streak/best are read via
  // localStorage inside, not stale closures, since they only ever update once here.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { streak, best };
}
