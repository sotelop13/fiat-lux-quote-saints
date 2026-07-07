import { useEffect, useState } from 'react';
import { todayMMDD } from '@/utils';

// Tracks today's MM-DD and updates when the date changes while the app stays
// mounted — across midnight, or when an installed PWA resumes from memory on a
// later day (resume never remounts React, so date-derived UI would stay stale).
// Re-checks on window focus / visibility changes and on a 1-minute heartbeat;
// setState with an unchanged string is a no-op, so idle cost is negligible.
export function useToday() {
  const [today, setToday] = useState(todayMMDD);

  useEffect(() => {
    const check = () => setToday(todayMMDD());
    window.addEventListener('focus', check);
    document.addEventListener('visibilitychange', check);
    const id = setInterval(check, 60_000);
    return () => {
      window.removeEventListener('focus', check);
      document.removeEventListener('visibilitychange', check);
      clearInterval(id);
    };
  }, []);

  return today;
}
