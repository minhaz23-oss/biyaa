'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export const useFont = () => {
  const { language } = useLanguage();
  
  const getFontClass = () => {
    return 'font-parkinsans';
  };
  
  const getFontStyle = () => {
    return {
      fontFamily: 'var(--font-parkinsans)'
    };
  };
  
  return {
    fontClass: getFontClass(),
    fontStyle: getFontStyle(),
    isBengali: language === 'bn',
    isEnglish: language === 'en'
  };
};
