'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect } from 'react';

interface DynamicLayoutProps {
  children: React.ReactNode;
}

const DynamicLayout = ({ children }: DynamicLayoutProps) => {
  const { language } = useLanguage();

  useEffect(() => {
    // Update HTML lang attribute
    document.documentElement.lang = language;
    
    // Update body class for font switching
    const body = document.body;
    body.classList.remove('font-parkinsans', 'font-mina');
    
    if (language === 'bn') {
      body.classList.add('font-mina');
    } else {
      body.classList.add('font-parkinsans');
    }
  }, [language]);

  return <>{children}</>;
};

export default DynamicLayout;
