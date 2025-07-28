'use client';

import { useState } from 'react';
import { FaQuestionCircle, FaChevronDown, FaChevronUp, FaSearch, FaShieldAlt, FaUsers, FaHeart } from 'react-icons/fa';
import Footer from "@/components/Footer";
import { useLanguage } from '@/contexts/LanguageContext';

const QnA = () => {
  const { t } = useLanguage();

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqData = [
    {
      category: t('qna.categories.gettingStarted'),
      icon: FaUsers,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      questions: [
        {
          question: t('qna.questions.howToCreateAccount'),
          answer: t('qna.questions.howToCreateAccountAnswer')
        },
        {
          question: t('qna.questions.isFreeToJoin'),
          answer: t('qna.questions.isFreeToJoinAnswer')
        },
        {
          question: t('qna.questions.howToCompleteBiodata'),
          answer: t('qna.questions.howToCompleteBiodataAnswer')
        },
        {
          question: t('qna.questions.whatInfoToInclude'),
          answer: t('qna.questions.whatInfoToIncludeAnswer')
        }
      ]
    },
    {
      category: t('qna.categories.safetyPrivacy'),
      icon: FaShieldAlt,
      color: "text-green-600",
      bgColor: "bg-green-100",
      questions: [
        {
          question: t('qna.questions.howToEnsureSafety'),
          answer: t('qna.questions.howToEnsureSafetyAnswer')
        },
        {
          question: t('qna.questions.canControlWhoSees'),
          answer: t('qna.questions.canControlWhoSeesAnswer')
        },
        {
          question: t('qna.questions.howProfilesVerified'),
          answer: t('qna.questions.howProfilesVerifiedAnswer')
        },
        {
          question: t('qna.questions.whatToDoSuspiciousProfile'),
          answer: t('qna.questions.whatToDoSuspiciousProfileAnswer')
        }
      ]
    },
    {
      category: t('qna.categories.findingMatches'),
      icon: FaSearch,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      questions: [
        {
          question: t('qna.questions.howMatchingAlgorithmWorks'),
          answer: t('qna.questions.howMatchingAlgorithmWorksAnswer')
        },
        {
          question: t('qna.questions.canSearchSpecificCriteria'),
          answer: t('qna.questions.canSearchSpecificCriteriaAnswer')
        },
        {
          question: t('qna.questions.howOftenNewMatches'),
          answer: t('qna.questions.howOftenNewMatchesAnswer')
        },
        {
          question: t('qna.questions.whatIfNoSuitableMatches'),
          answer: t('qna.questions.whatIfNoSuitableMatchesAnswer')
        }
      ]
    },
    {
      category: t('qna.categories.communication'),
      icon: FaHeart,
      color: "text-red-600",
      bgColor: "bg-red-100",
      questions: [
        {
          question: t('qna.questions.howToContactInterested'),
          answer: t('qna.questions.howToContactInterestedAnswer')
        },
        {
          question: t('qna.questions.isMessagingFree'),
          answer: t('qna.questions.isMessagingFreeAnswer')
        },
        {
          question: t('qna.questions.canShareContactInfo'),
          answer: t('qna.questions.canShareContactInfoAnswer')
        },
        {
          question: t('qna.questions.whatToIncludeFirstMessage'),
          answer: t('qna.questions.whatToIncludeFirstMessageAnswer')
        }
      ]
    },
    {
      category: t('qna.categories.accountTechnical'),
      icon: FaQuestionCircle,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      questions: [
        {
          question: t('qna.questions.howToUpdateProfile'),
          answer: t('qna.questions.howToUpdateProfileAnswer')
        },
        {
          question: t('qna.questions.canTemporarilyHideProfile'),
          answer: t('qna.questions.canTemporarilyHideProfileAnswer')
        },
        {
          question: t('qna.questions.howToDeleteAccount'),
          answer: t('qna.questions.howToDeleteAccountAnswer')
        },
        {
          question: t('qna.questions.forgotPassword'),
          answer: t('qna.questions.forgotPasswordAnswer')
        },
        {
          question: t('qna.questions.mobileAppAvailable'),
          answer: t('qna.questions.mobileAppAvailableAnswer')
        }
      ]
    },
    {
      category: t('qna.categories.successSupport'),
      icon: FaHeart,
      color: "text-pink-600",
      bgColor: "bg-pink-100",
      questions: [
        {
          question: t('qna.questions.foundLifePartner'),
          answer: t('qna.questions.foundLifePartnerAnswer')
        },
        {
          question: t('qna.questions.contactCustomerSupport'),
          answer: t('qna.questions.contactCustomerSupportAnswer')
        },
        {
          question: t('qna.questions.matchmakingServices'),
          answer: t('qna.questions.matchmakingServicesAnswer')
        },
        {
          question: t('qna.questions.refundPremiumFeatures'),
          answer: t('qna.questions.refundPremiumFeaturesAnswer')
        }
      ]
    }
  ];

  const filteredFAQs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="w-full min-h-screen py-5">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 to-primary/30 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaQuestionCircle className="text-4xl text-primary" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">{t('qna.title')}</h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8">
            {t('qna.subtitle')}
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t('qna.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-primary/80 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* FAQ Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">{t('qna.noResultsFound')}</h3>
              <p className="text-gray-500">{t('qna.noResultsMessage')}</p>
            </div>
          ) : (
            filteredFAQs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12">
                {/* Category Header */}
                <div className="flex items-center mb-8">
                  <div className={`w-12 h-12 ${category.bgColor} rounded-full flex items-center justify-center mr-4`}>
                    <category.icon className={`text-2xl ${category.color}`} />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800">{category.category}</h2>
                </div>

                {/* Questions */}
                <div className="space-y-4">
                  {category.questions.map((faq, questionIndex) => {
                    const globalIndex = categoryIndex * 100 + questionIndex;
                    const isOpen = openFAQ === globalIndex;
                    
                    return (
                      <div key={questionIndex} className="border border-primary/80 rounded-lg overflow-hidden shadow-md">
                        <button
                          onClick={() => toggleFAQ(globalIndex)}
                          className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
                        >
                          <span className="font-semibold text-gray-800 text-lg">{faq.question}</span>
                          {isOpen ? (
                            <FaChevronUp className="text-primary text-xl flex-shrink-0 ml-4" />
                          ) : (
                            <FaChevronDown className="text-gray-400 text-xl flex-shrink-0 ml-4" />
                          )}
                        </button>
                        
                        {isOpen && (
                          <div className="px-6 py-4 bg-white border-t border-primary/80">
                            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">{t('qna.stillHaveQuestions')}</h2>
          <p className="text-lg text-gray-600 mb-8">
            {t('qna.supportMessage')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-primary/80">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaQuestionCircle className="text-2xl text-primary" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{t('qna.helpCenter')}</h3>
              <p className="text-gray-600 text-sm mb-4">{t('qna.helpCenterDescription')}</p>
              <button className="btn-primary text-sm">{t('qna.visitHelpCenter')}</button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-primary/80">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeart className="text-2xl text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{t('qna.liveChat')}</h3>
              <p className="text-gray-600 text-sm mb-4">{t('qna.liveChatDescription')}</p>
              <button className="btn-secondary text-sm">{t('qna.startChat')}</button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-primary/80">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-2xl text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{t('qna.emailSupport')}</h3>
              <p className="text-gray-600 text-sm mb-4">{t('qna.emailSupportDescription')}</p>
              <a href="mailto:support@biyaa.com" className="btn-primary text-sm inline-block">
                {t('qna.emailUs')}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default QnA;
