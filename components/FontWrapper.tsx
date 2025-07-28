'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { ReactNode } from 'react';

interface FontWrapperProps {
  children: ReactNode;
  className?: string;
}

const FontWrapper = ({ children, className = '' }: FontWrapperProps) => {
  const { language } = useLanguage();
  
  // Apply appropriate font class based on language
  const fontClass = language === 'bn' ? 'font-mina' : 'font-parkinsans';
  
  return (
    <div className={`${fontClass} ${className}`}>
      {children}
    </div>
  );
};

export default FontWrapper;
