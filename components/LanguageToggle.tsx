'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { FaGlobe } from 'react-icons/fa';

const LanguageToggle = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleLanguage = (lang: 'en' | 'bn') => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-primary transition-colors duration-200 border border-gray-300 rounded-md hover:border-primary"
        aria-label="Change language"
      >
        <FaGlobe className="text-sm" />
        <span className="hidden sm:inline">
          {language === 'bn' ? 'বাংলা' : 'English'}
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Overlay to close dropdown when clicking outside */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-20">
            <button
              onClick={() => toggleLanguage('en')}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors duration-200 ${
                language === 'en' ? 'text-primary font-medium' : 'text-gray-700'
              }`}
            >
              English
            </button>
            <button
              onClick={() => toggleLanguage('bn')}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors duration-200 ${
                language === 'bn' ? 'text-primary font-medium' : 'text-gray-700'
              }`}
            >
              বাংলা
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageToggle;
