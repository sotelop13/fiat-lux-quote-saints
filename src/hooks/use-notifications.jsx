import { useState } from 'react';

const ENABLED_KEY   = 'fiat_lux_notifications';
const LAST_DATE_KEY = 'fiat_lux_last_notification';

export const notifSupported = () => 'Notification' in window;

export function useNotifications() {
  const [permission, setPermission] = useState(() =>
    notifSupported() ? Notification.permission : 'denied'
  );
  const [enabled, setEnabled] = useState(() =>
    localStorage.getItem(ENABLED_KEY) === 'true'
  );

  const requestAndEnable = async () => {
    if (!notifSupported()) return 'unsupported';
    if (Notification.permission === 'denied') return 'denied';
    const result = await Notification.requestPermission();
    setPermission(result);
    if (result === 'granted') {
      localStorage.setItem(ENABLED_KEY, 'true');
      setEnabled(true);
    }
    return result;
  };

  const disable = () => {
    localStorage.setItem(ENABLED_KEY, 'false');
    setEnabled(false);
  };

  // Mark today as notified without showing (for external callers that handle rendering themselves)
  const markNotified = () =>
    localStorage.setItem(LAST_DATE_KEY, new Date().toDateString());

  const isAlreadyNotifiedToday = () =>
    localStorage.getItem(LAST_DATE_KEY) === new Date().toDateString();

  return {
    permission,
    enabled,
    requestAndEnable,
    disable,
    markNotified,
    isAlreadyNotifiedToday,
  };
}
