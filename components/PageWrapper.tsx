'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

const PageWrapper = ({ children, className = '' }: PageWrapperProps) => {
  const { language } = useLanguage();
  
  const fontStyle = {
    fontFamily: language === 'bn' ? 'var(--font-mina)' : 'var(--font-parkinsans)'
  };
  
  return (
    <div 
      className={`w-full ${className}`}
      style={fontStyle}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
