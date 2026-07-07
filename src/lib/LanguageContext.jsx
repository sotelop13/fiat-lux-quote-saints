import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(
    () => localStorage.getItem('fiat_lux_language') ?? 'en'
  );

  const changeLang = (l) => {
    setLang(l);
    localStorage.setItem('fiat_lux_language', l);
  };

  return (
    <LanguageContext.Provider value={[lang, changeLang]}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
