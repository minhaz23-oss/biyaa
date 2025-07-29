"use client";

import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { FaBookOpen,FaLightbulb,FaQuestion,FaArrowRight,FaCheckCircle  } from "react-icons/fa";
import { RiGuideFill } from "react-icons/ri";


const GuidePage = () => {
  const { t } = useLanguage();
  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-100 py-16 px-8 rounded-md mb-12 mt-2">
        <div className="max-w-4xl mx-auto text-center">
          <FaBookOpen className="h-16 w-16 text-indigo-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('guide.hero.title')}
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            {t('guide.hero.description')}
          </p>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
          <RiGuideFill className="h-8 w-8 text-blue-600 mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">{t('guide.quickNavigation.gettingStarted.title')}</h3>
          <p className="text-sm text-gray-600">{t('guide.quickNavigation.gettingStarted.description')}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
          <FaLightbulb className="h-8 w-8 text-yellow-600 mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">{t('guide.quickNavigation.tipsAndTricks.title')}</h3>
          <p className="text-sm text-gray-600">{t('guide.quickNavigation.tipsAndTricks.description')}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
          <FaQuestion className="h-8 w-8 text-green-600 mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">{t('guide.quickNavigation.faq.title')}</h3>
          <p className="text-sm text-gray-600">{t('guide.quickNavigation.faq.description')}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
          <FaCheckCircle className="h-8 w-8 text-purple-600 mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">{t('guide.quickNavigation.bestPractices.title')}</h3>
          <p className="text-sm text-gray-600">{t('guide.quickNavigation.bestPractices.description')}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Getting Started Section */}
        <section className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center mb-6">
            <RiGuideFill className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">{t('guide.sections.gettingStarted.title')}</h2>
          </div>
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('guide.sections.gettingStarted.steps.step1.title')}</h3>
              <p className="text-gray-700 mb-4">
                {t('guide.sections.gettingStarted.steps.step1.description')}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>{t('guide.sections.gettingStarted.steps.step1.bulletPoints.0')}</li>
                <li>{t('guide.sections.gettingStarted.steps.step1.bulletPoints.1')}</li>
                <li>{t('guide.sections.gettingStarted.steps.step1.bulletPoints.2')}</li>
                <li>{t('guide.sections.gettingStarted.steps.step1.bulletPoints.3')}</li>
                <li>{t('guide.sections.gettingStarted.steps.step1.bulletPoints.4')}</li>
              </ul>
            </div>

            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('guide.sections.gettingStarted.steps.step2.title')}</h3>
              <p className="text-gray-700 mb-4">
                {t('guide.sections.gettingStarted.steps.step2.description')}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>{t('guide.sections.gettingStarted.steps.step2.bulletPoints.0')}</li>
                <li>{t('guide.sections.gettingStarted.steps.step2.bulletPoints.1')}</li>
                <li>{t('guide.sections.gettingStarted.steps.step2.bulletPoints.2')}</li>
                <li>{t('guide.sections.gettingStarted.steps.step2.bulletPoints.3')}</li>
              </ul>
            </div>

            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('guide.sections.gettingStarted.steps.step3.title')}</h3>
              <p className="text-gray-700 mb-4">
                {t('guide.sections.gettingStarted.steps.step3.description')}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>{t('guide.sections.gettingStarted.steps.step3.bulletPoints.0')}</li>
                <li>{t('guide.sections.gettingStarted.steps.step3.bulletPoints.1')}</li>
                <li>{t('guide.sections.gettingStarted.steps.step3.bulletPoints.2')}</li>
                <li>{t('guide.sections.gettingStarted.steps.step3.bulletPoints.3')}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Tips & Tricks Section */}
        <section className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center mb-6">
            <FaLightbulb className="h-8 w-8 text-yellow-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">{t('guide.sections.tipsAndTricks.title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('guide.sections.tipsAndTricks.profileOptimization.title')}</h3>
              <ul className="text-gray-700 space-y-2">
                <li>{t('guide.sections.tipsAndTricks.profileOptimization.tips.0')}</li>
                <li>{t('guide.sections.tipsAndTricks.profileOptimization.tips.1')}</li>
                <li>{t('guide.sections.tipsAndTricks.profileOptimization.tips.2')}</li>
                <li>{t('guide.sections.tipsAndTricks.profileOptimization.tips.3')}</li>
                <li>{t('guide.sections.tipsAndTricks.profileOptimization.tips.4')}</li>
              </ul>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('guide.sections.tipsAndTricks.communicationTips.title')}</h3>
              <ul className="text-gray-700 space-y-2">
                <li>{t('guide.sections.tipsAndTricks.communicationTips.tips.0')}</li>
                <li>{t('guide.sections.tipsAndTricks.communicationTips.tips.1')}</li>
                <li>{t('guide.sections.tipsAndTricks.communicationTips.tips.2')}</li>
                <li>{t('guide.sections.tipsAndTricks.communicationTips.tips.3')}</li>
                <li>{t('guide.sections.tipsAndTricks.communicationTips.tips.4')}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center mb-6">
            <FaQuestion className="h-8 w-8 text-green-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">{t('guide.sections.faq.title')}</h2>
          </div>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('guide.sections.faq.questions.makeProfileStandOut.question')}</h3>
              <p className="text-gray-700">
                {t('guide.sections.faq.questions.makeProfileStandOut.answer')}
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('guide.sections.faq.questions.firstMessage.question')}</h3>
              <p className="text-gray-700">
                {t('guide.sections.faq.questions.firstMessage.answer')}
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('guide.sections.faq.questions.personalInfoSafe.question')}</h3>
              <p className="text-gray-700">
                {t('guide.sections.faq.questions.personalInfoSafe.answer')}
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('guide.sections.faq.questions.findMatchTime.question')}</h3>
              <p className="text-gray-700">
                {t('guide.sections.faq.questions.findMatchTime.answer')}
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('guide.sections.faq.questions.hideProfile.question')}</h3>
              <p className="text-gray-700">
                {t('guide.sections.faq.questions.hideProfile.answer')}
              </p>
            </div>
          </div>
        </section>

        {/* Best Practices Section */}
        <section className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center mb-6">
            <FaCheckCircle className="h-8 w-8 text-purple-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">{t('guide.sections.bestPractices.title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('guide.sections.bestPractices.organization.title')}</h3>
              <ul className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <FaArrowRight className="h-5 w-5 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                  {t('guide.sections.bestPractices.organization.practices.0')}
                </li>
                <li className="flex items-start">
                  <FaArrowRight className="h-5 w-5 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                  {t('guide.sections.bestPractices.organization.practices.1')}
                </li>
                <li className="flex items-start">
                  <FaArrowRight className="h-5 w-5 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                  {t('guide.sections.bestPractices.organization.practices.2')}
                </li>
                <li className="flex items-start">
                  <FaArrowRight className="h-5 w-5 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                  {t('guide.sections.bestPractices.organization.practices.3')}
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('guide.sections.bestPractices.collaboration.title')}</h3>
              <ul className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <FaArrowRight className="h-5 w-5 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                  {t('guide.sections.bestPractices.collaboration.practices.0')}
                </li>
                <li className="flex items-start">
                  <FaArrowRight className="h-5 w-5 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                  {t('guide.sections.bestPractices.collaboration.practices.1')}
                </li>
                <li className="flex items-start">
                  <FaArrowRight className="h-5 w-5 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                  {t('guide.sections.bestPractices.collaboration.practices.2')}
                </li>
                <li className="flex items-start">
                  <FaArrowRight className="h-5 w-5 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                  {t('guide.sections.bestPractices.collaboration.practices.3')}
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('guide.sections.contactSupport.title')}</h2>
          <p className="text-gray-700 mb-6">
            {t('guide.sections.contactSupport.description')}
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
              {t('guide.sections.contactSupport.contactButton')}
            </button>
            <button className="bg-white text-indigo-600 border border-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors">
              {t('guide.sections.contactSupport.communityButton')}
            </button>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
};

export default GuidePage;
