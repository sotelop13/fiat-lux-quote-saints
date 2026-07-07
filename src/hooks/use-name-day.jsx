import { useState } from 'react';

const KEY = 'fiat_lux_name_day';

export function useNameDay() {
  const [name, setName] = useState(() => localStorage.getItem(KEY) ?? '');
  const saveName = (n) => {
    localStorage.setItem(KEY, n);
    setName(n);
  };
  return [name, saveName];
}
