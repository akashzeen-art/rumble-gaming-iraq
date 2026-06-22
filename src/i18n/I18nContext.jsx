import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import en from './en';
import fr from './fr';

const STORAGE_KEY = 'gamifya_lang';
const messages = { en, fr };

const I18nContext = createContext(null);

function normalizeLang(code) {
  if (code === 'fr') return 'fr';
  return 'en';
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return normalizeLang(saved);
  });

  const t = messages[lang] || messages.en;

  const setLang = useCallback((code) => {
    const next = normalizeLang(code);
    setLangState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = 'ltr';
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useTranslation must be used within I18nProvider');
  return ctx;
}
