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
    
    // Update body class to use default font for all languages
    const body = document.body;
    body.classList.remove('font-parkinsans', 'font-mina');
    body.classList.add('font-parkinsans');
  }, [language]);

  return <>{children}</>;
};

export default DynamicLayout;
