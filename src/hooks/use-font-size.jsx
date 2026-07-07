import { useState, useEffect } from 'react';

const KEY = 'fiat_lux_font_size';
const SIZE_MAP = { small: '13px', normal: '16px', large: '19px' };

export function useFontSize() {
  const [size, setSize] = useState(() => localStorage.getItem(KEY) ?? 'normal');

  useEffect(() => {
    document.documentElement.style.fontSize = SIZE_MAP[size] ?? '16px';
    localStorage.setItem(KEY, size);
  }, [size]);

  return [size, setSize];
}

// Call once on app boot to restore saved preference before first render
export function initFontSize() {
  const saved = localStorage.getItem(KEY) ?? 'normal';
  document.documentElement.style.fontSize = SIZE_MAP[saved] ?? '16px';
}
