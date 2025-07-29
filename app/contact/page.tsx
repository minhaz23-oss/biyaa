
'use client';

import Footer from "@/components/Footer";
import ContactPageForm from "@/components/ContactPageForm";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaQuestionCircle, FaHeadset, FaBug } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';
import PageWrapper from '@/components/PageWrapper';

const ContactPage = () => {
  const { t } = useLanguage();
  
  return (
    <PageWrapper className="min-h-screen py-5">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 to-primary/20 py-20 rounded-md">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">{t('contact.getInTouch')}</h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            {t('contact.heroMessage')}
          </p>
          <ContactPageForm />
        </div>
      </div>

      {/* Contact Methods */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('contact.multipleWays')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('contact.multipleWaysDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaQuestionCircle className="text-3xl text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('contact.generalInquiries')}</h3>
              <p className="text-gray-600 mb-4">
                {t('contact.generalInquiriesDesc')}
              </p>
              <p className="text-primary font-medium">info@biyaa.com</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeadset className="text-3xl text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('contact.customerSupport')}</h3>
              <p className="text-gray-600 mb-4">
                {t('contact.customerSupportDesc')}
              </p>
              <p className="text-blue-600 font-medium">support@biyaa.com</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaBug className="text-3xl text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('contact.technicalIssues')}</h3>
              <p className="text-gray-600 mb-4">
                {t('contact.technicalIssuesDesc')}
              </p>
              <p className="text-red-600 font-medium">tech@biyaa.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('contact.visitOffice')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('contact.visitOfficeDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt className="text-xl text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('contact.address')}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    House 123, Road 15<br/>
                    Dhanmondi, Dhaka 1209<br/>
                    Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaPhone className="text-xl text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('contact.phone')}</h3>
                  <p className="text-gray-600">
                    +880 1712-345678<br/>
                    +880 2-55048576
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaEnvelope className="text-xl text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('contact.email')}</h3>
                  <p className="text-gray-600">
                    contact@biyaa.com<br/>
                    hello@biyaa.com
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <FaClock className="text-xl text-orange-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">{t('contact.officeHours')}</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('contact.monday')}</span>
                  <span className="text-gray-800 font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('contact.friday')}</span>
                  <span className="text-gray-800 font-medium">9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('contact.saturday')}</span>
                  <span className="text-gray-800 font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('contact.sunday')}</span>
                  <span className="text-red-600 font-medium">{t('contact.closed')}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
                <p className="text-sm text-gray-600">
                  <strong className="text-primary">{t('contact.note')}:</strong> {t('contact.holidayNote')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('contact.faq')}</h2>
            <p className="text-lg text-gray-600">
              {t('contact.faqDesc')}
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {t('contact.responseTime')}
              </h3>
              <p className="text-gray-600">
                {t('contact.responseTimeAnswer')}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {t('contact.messageInfo')}
              </h3>
              <p className="text-gray-600">
                {t('contact.messageInfoAnswer')}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {t('contact.phoneSupport')}
              </h3>
              <p className="text-gray-600">
                {t('contact.phoneSupportAnswer')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </PageWrapper>
  );
};

export default ContactPage;

