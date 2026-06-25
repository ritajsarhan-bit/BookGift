'use client';

/**
 * Language context — provides the current language (en/he) and a switcher
 * throughout the entire app. Also sets the HTML dir attribute for RTL.
 */
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import en from '@/i18n/en.json';
import he from '@/i18n/he.json';

type Language = 'en' | 'he';
type Translations = typeof en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: en,
  isRTL: false,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    // Set RTL direction on the document
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  // Load saved language on first render
  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved === 'en' || saved === 'he') {
      setLanguage(saved);
    }
  }, []);

  const translations = language === 'he' ? he : en;

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations as Translations,
        isRTL: language === 'he',
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

/** Hook to use language anywhere in the app */
export function useLanguage() {
  return useContext(LanguageContext);
}
