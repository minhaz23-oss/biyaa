'use client';

import { useEffect, useState } from 'react';
import { FaUsers, FaMale, FaFemale, FaHeart } from 'react-icons/fa';
import { getPlatformStatistics } from '@/lib/actions/biodata.actions';
import { useLanguage } from '@/contexts/LanguageContext';

const Statistics = () => {
  const { t, fontClass } = useLanguage();
  const [statistics, setStatistics] = useState({
    totalBiodata: 0,
    maleBiodata: 0,
    femaleBiodata: 0,
    marriagesCompleted: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await getPlatformStatistics();
        if (response.success) {
          setStatistics(response.data);
        }
      } catch (error) {
        console.error('Error fetching statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <section className="mt-[80px]">
      <div className="text-center mb-12">
        <h2 className={`text-4xl font-bold text-gray-800 mb-4 ${fontClass}`}>{t('statistics.title')}</h2>
        <p className={`text-lg text-gray-600 max-w-2xl mx-auto ${fontClass}`}>
          {t('statistics.description')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Total Biodata */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center border border-primary/20 hover:shadow-xl transition-shadow duration-300">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaUsers className="text-3xl text-primary" />
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-2">
            {loading ? "..." : statistics.totalBiodata.toLocaleString()}
          </h3>
          <p className={`text-gray-600 font-medium ${fontClass}`}>{t('statistics.totalBiodata')}</p>
          <p className={`text-sm text-gray-500 mt-1 ${fontClass}`}>{t('statistics.registeredProfiles')}</p>
        </div>
        
        {/* Male Biodata */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center border border-blue-200 hover:shadow-xl transition-shadow duration-300">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaMale className="text-3xl text-blue-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-2">
            {loading ? "..." : statistics.maleBiodata.toLocaleString()}
          </h3>
          <p className={`text-gray-600 font-medium ${fontClass}`}>{t('statistics.maleProfiles')}</p>
          <p className={`text-sm text-gray-500 mt-1 ${fontClass}`}>{t('statistics.groomProfiles')}</p>
        </div>
        
        {/* Female Biodata */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center border border-pink-200 hover:shadow-xl transition-shadow duration-300">
          <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaFemale className="text-3xl text-pink-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-2">
            {loading ? "..." : statistics.femaleBiodata.toLocaleString()}
          </h3>
          <p className={`text-gray-600 font-medium ${fontClass}`}>{t('statistics.femaleProfiles')}</p>
          <p className={`text-sm text-gray-500 mt-1 ${fontClass}`}>{t('statistics.brideProfiles')}</p>
        </div>
        
        {/* Marriages Completed */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center border border-red-200 hover:shadow-xl transition-shadow duration-300">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaHeart className="text-3xl text-red-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-2">
            {loading ? "..." : statistics.marriagesCompleted.toLocaleString()}
          </h3>
          <p className={`text-gray-600 font-medium ${fontClass}`}>{t('statistics.successfulMarriages')}</p>
          <p className={`text-sm text-gray-500 mt-1 ${fontClass}`}>{t('statistics.happyCouples')}</p>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
