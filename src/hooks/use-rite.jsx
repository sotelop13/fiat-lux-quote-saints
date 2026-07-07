import { useState } from 'react';

const KEY = 'fiat_lux_rite';

export function useRite() {
  const [rite, setRite] = useState(() => localStorage.getItem(KEY) || 'NO');

  const changeRite = (newRite) => {
    setRite(newRite);
    localStorage.setItem(KEY, newRite);
  };

  return [rite, changeRite];
}
