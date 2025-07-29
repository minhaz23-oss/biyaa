'use client';

import { FaGlobe, FaHandshake, FaHistory, FaUsers, FaHeart, FaShieldAlt, FaRocket, FaEye } from 'react-icons/fa';
import Footer from "@/components/Footer";
import Statistics from "@/components/Statistics";
import { useLanguage } from '@/contexts/LanguageContext';

import React, { useEffect, useState } from 'react';




const AboutUs = () => {
  const { t } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Or a loading spinner
  }
  
  return (
    <div className="w-full min-h-screen py-5">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 to-primary/30 py-20 rounded-md">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">{t('aboutUs.title')}</h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            {t('aboutUs.description')}
          </p>
        </div>
      </div>

      {/* Mission, Vision, Values */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Mission */}
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaHeart className="text-4xl text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('aboutUs.mission.title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('aboutUs.mission.description')}
              </p>
            </div>

            {/* Vision */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaEye className="text-4xl text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('aboutUs.vision.title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('aboutUs.vision.description')}
              </p>
            </div>

            {/* Values */}
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaShieldAlt className="text-4xl text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('aboutUs.values.title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('aboutUs.values.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('aboutUs.journey.title')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('aboutUs.journey.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('aboutUs.journey.beginningTitle')}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {t('aboutUs.journey.beginningText1')}
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {t('aboutUs.journey.beginningText2')}
              </p>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">5+</div>
                  <div className="text-sm text-gray-600">{t('aboutUs.journey.yearsOfService')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">50k+</div>
                  <div className="text-sm text-gray-600">{t('aboutUs.journey.happyMembers')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">10k+</div>
                  <div className="text-sm text-gray-600">{t('aboutUs.journey.successStories')}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaRocket className="text-3xl text-primary mb-3" />
                <h4 className="font-semibold text-gray-800 mb-2">{t('aboutUs.features.innovation.title')}</h4>
                <p className="text-sm text-gray-600">
                  {t('aboutUs.features.innovation.description')}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaUsers className="text-3xl text-blue-600 mb-3" />
                <h4 className="font-semibold text-gray-800 mb-2">{t('aboutUs.features.community.title')}</h4>
                <p className="text-sm text-gray-600">
                  {t('aboutUs.features.community.description')}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaGlobe className="text-3xl text-green-600 mb-3" />
                <h4 className="font-semibold text-gray-800 mb-2">{t('aboutUs.features.globalReach.title')}</h4>
                <p className="text-sm text-gray-600">
                  {t('aboutUs.features.globalReach.description')}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <FaHandshake className="text-3xl text-red-600 mb-3" />
                <h4 className="font-semibold text-gray-800 mb-2">{t('aboutUs.features.trust.title')}</h4>
                <p className="text-sm text-gray-600">
                  {t('aboutUs.features.trust.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <Statistics />

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('aboutUs.whyChoose.title')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('aboutUs.whyChoose.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-3xl text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('aboutUs.whyChoose.privacyTitle')}</h3>
              <p className="text-gray-600">
                {t('aboutUs.whyChoose.privacyDescription')}
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-3xl text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('aboutUs.whyChoose.verifiedTitle')}</h3>
              <p className="text-gray-600">
                {t('aboutUs.whyChoose.verifiedDescription')}
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaRocket className="text-3xl text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('aboutUs.whyChoose.smartMatchingTitle')}</h3>
              <p className="text-gray-600">
                {t('aboutUs.whyChoose.smartMatchingDescription')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
