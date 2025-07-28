'use client';

import { useLanguage } from '@/contexts/LanguageContext';

const FontTest = () => {
  const { language, fontClass, t } = useLanguage();
  
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-bold mb-2">Font Test Component</h3>
      <p className="mb-2">Current Language: <strong>{language}</strong></p>
      <p className="mb-2">Font Class: <strong>{fontClass}</strong></p>
      
      <div className={`p-2 border bg-gray-50 ${fontClass}`}>
        {language === 'bn' ? (
          <p>এই টেক্সটটি বাংলা ফন্টে (Mina) রেন্ডার হওয়া উচিত।</p>
        ) : (
          <p>This text should render in English font (Parkinsans).</p>
        )}
      </div>
      
      <div className="mt-2" style={{ fontFamily: language === 'bn' ? 'var(--font-mina)' : 'var(--font-parkinsans)' }}>
        <p><strong>Using inline style:</strong></p>
        <p>{t('contact.getInTouch')}</p>
      </div>
    </div>
  );
};

export default FontTest;
