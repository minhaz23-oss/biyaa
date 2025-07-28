'use client';

import { FaUserPlus, FaSearch, FaComments, FaRing } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';

const HowItWorks = () => {
  const { t, fontClass } = useLanguage();
  const steps = [
    {
      id: 1,
      icon: FaUserPlus,
      titleKey: 'howItWorks.step1.title',
      descriptionKey: 'howItWorks.step1.description',
      color: 'primary',
      bgColor: 'bg-primary/10',
      hoverColor: 'group-hover:bg-primary/20',
      borderColor: 'border-primary/20',
      hoverBorderColor: 'hover:border-primary/50',
      iconColor: 'text-primary',
      buttonColor: 'bg-primary'
    },
    {
      id: 2,
      icon: FaSearch,
      titleKey: 'howItWorks.step2.title',
      descriptionKey: 'howItWorks.step2.description',
      color: 'blue',
      bgColor: 'bg-blue-100',
      hoverColor: 'group-hover:bg-blue-200',
      borderColor: 'border-blue-200',
      hoverBorderColor: 'hover:border-blue-400',
      iconColor: 'text-blue-600',
      buttonColor: 'bg-blue-600'
    },
    {
      id: 3,
      icon: FaComments,
      titleKey: 'howItWorks.step3.title',
      descriptionKey: 'howItWorks.step3.description',
      color: 'green',
      bgColor: 'bg-green-100',
      hoverColor: 'group-hover:bg-green-200',
      borderColor: 'border-green-200',
      hoverBorderColor: 'hover:border-green-400',
      iconColor: 'text-green-600',
      buttonColor: 'bg-green-600'
    },
    {
      id: 4,
      icon: FaRing,
      titleKey: 'howItWorks.step4.title',
      descriptionKey: 'howItWorks.step4.description',
      color: 'red',
      bgColor: 'bg-red-100',
      hoverColor: 'group-hover:bg-red-200',
      borderColor: 'border-red-200',
      hoverBorderColor: 'hover:border-red-400',
      iconColor: 'text-red-600',
      buttonColor: 'bg-red-600'
    }
  ];

  return (
    <section className="mt-[80px]">
      <div className="text-center mb-12">
        <h2 className={`text-4xl font-bold text-gray-800 mb-4 ${fontClass}`}>{t('howItWorks.title')}</h2>
        <p className={`text-lg text-gray-600 max-w-2xl mx-auto ${fontClass}`}>
          {t('howItWorks.description')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step) => {
          const Icon = step.icon;
          
          return (
            <div 
              key={step.id}
              className={`bg-white rounded-lg shadow-lg p-8 text-center border-2 ${step.borderColor} ${step.hoverBorderColor} transition-all duration-300 group`}
            >
              <div className={`w-20 h-20 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 ${step.hoverColor} transition-colors duration-300`}>
                <Icon className={`text-4xl ${step.iconColor}`} />
              </div>
              <div className={`w-8 h-8 ${step.buttonColor} text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold`}>
                {step.id}
              </div>
              <h3 className={`text-xl font-bold text-gray-800 mb-3 ${fontClass}`}>{t(step.titleKey)}</h3>
              <p className={`text-gray-600 leading-relaxed ${fontClass}`}>
                {t(step.descriptionKey)}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorks;
