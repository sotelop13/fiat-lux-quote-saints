import { useState } from 'react';

const ID_KEY    = 'fiat_lux_patron_saint_id';
const FEAST_KEY = 'fiat_lux_patron_feast_date';

// Returns [id, set(id, feastMMDD), feastMMDD]
// set('', '') clears the patron; set(id, 'MM-DD') stores both.
export function usePatronSaint() {
  const [id, setIdState]           = useState(() => localStorage.getItem(ID_KEY)    ?? '');
  const [feastDate, setFeastState] = useState(() => localStorage.getItem(FEAST_KEY) ?? '');

  const set = (newId, newFeast) => {
    if (newId) {
      localStorage.setItem(ID_KEY, newId);
      if (newFeast) localStorage.setItem(FEAST_KEY, newFeast);
      else localStorage.removeItem(FEAST_KEY);
    } else {
      localStorage.removeItem(ID_KEY);
      localStorage.removeItem(FEAST_KEY);
    }
    setIdState(newId ?? '');
    setFeastState(newFeast ?? '');
  };

  return [id, set, feastDate];
}
