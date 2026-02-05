import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// Import all content files
import bannerContent from '@/content/banner.json';
import frCommon from '@/content/fr/common.json';
import enCommon from '@/content/en/common.json';
import frHome from '@/content/fr/home.json';
import enHome from '@/content/en/home.json';
import frDilia from '@/content/fr/dilia.json';
import enDilia from '@/content/en/dilia.json';
import frDilietta from '@/content/fr/dilietta.json';
import enDilietta from '@/content/en/dilietta.json';
import frLacave from '@/content/fr/lacave.json';
import enLacave from '@/content/en/lacave.json';
import frDistribution from '@/content/fr/distribution.json';
import enDistribution from '@/content/en/distribution.json';

export type Language = 'fr' | 'en';

const content = {
  fr: {
    common: frCommon,
    home: frHome,
    dilia: frDilia,
    dilietta: frDilietta,
    lacave: frLacave,
    distribution: frDistribution,
  },
  en: {
    common: enCommon,
    home: enHome,
    dilia: enDilia,
    dilietta: enDilietta,
    lacave: enLacave,
    distribution: enDistribution,
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (page: keyof typeof content.fr, path: string) => string;
  banner: typeof bannerContent & { text: string };
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = useCallback((page: keyof typeof content.fr, path: string): string => {
    const pageContent = content[language][page];
    const keys = path.split('.');
    let value: unknown = pageContent;
    
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = (value as Record<string, unknown>)[key];
      } else {
        return path;
      }
    }
    
    return typeof value === 'string' ? value : path;
  }, [language]);

  const banner = {
    ...bannerContent,
    text: bannerContent[language],
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, banner }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
