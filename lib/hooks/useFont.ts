'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export const useFont = () => {
  const { language } = useLanguage();
  
  const getFontClass = () => {
    return language === 'bn' ? 'font-mina' : 'font-parkinsans';
  };
  
  const getFontStyle = () => {
    return {
      fontFamily: language === 'bn' ? 'var(--font-mina)' : 'var(--font-parkinsans)'
    };
  };
  
  return {
    fontClass: getFontClass(),
    fontStyle: getFontStyle(),
    isBengali: language === 'bn',
    isEnglish: language === 'en'
  };
};
