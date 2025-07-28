'use client';

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t, fontClass } = useLanguage();
  
  return (
  <footer className="bg-gray-800 text-white mt-20 py-12 px-3 rounded-xl">
    <div className="max-w-7xl mx-auto px-4">
      {/* Main Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Company Info */}
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-2xl font-bold text-primary mb-4">Biyaa</h3>
          <p className={`text-gray-300 mb-4 max-w-md leading-relaxed ${fontClass}`}>
            {t('footer.companyDescription')}
          </p>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
              <FaFacebook className="text-xl" />
            </a>
            <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
              <FaTwitter className="text-xl" />
            </a>
            <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-pink-500 transition-colors duration-300">
              <FaInstagram className="text-xl" />
            </a>
            <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-blue-600 transition-colors duration-300">
              <FaLinkedin className="text-xl" />
            </a>
          </div>
        </div>
        
        {/* Quick Links */}
        <div>
          <h4 className={`text-lg font-semibold mb-4 ${fontClass}`}>{t('footer.quickLinks')}</h4>
          <ul className={`space-y-2 text-gray-300 ${fontClass}`}>
            <li><a href="/search" className="hover:text-primary transition-colors duration-300">{t('footer.searchProfiles')}</a></li>
            <li><a href="/user" className="hover:text-primary transition-colors duration-300">{t('footer.myAccount')}</a></li>
            <li><a href="/sign-up" className="hover:text-primary transition-colors duration-300">{t('footer.register')}</a></li>
            <li><a href="/aboutus" className="hover:text-primary transition-colors duration-300">{t('footer.aboutUs')}</a></li>
            <li><a href="/contact" className="hover:text-primary transition-colors duration-300">{t('footer.contact')}</a></li>
          </ul>
        </div>
        
        {/* Contact Info */}
        <div>
          <h4 className={`text-lg font-semibold mb-4 ${fontClass}`}>{t('footer.contactInfo')}</h4>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-center space-x-2">
              <FaPhone className="text-primary" />
              <span>+880 1234 567890</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaEnvelope className="text-primary" />
              <a href="mailto:info@biyaa.com" className="hover:text-primary transition-colors duration-300">
                info@biyaa.com
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-primary" />
              <span>{t('footer.location')}</span>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Divider */}
      <hr className="border-gray-600 mb-8" />
      
      {/* Legal Links & Copyright */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex flex-wrap justify-center md:justify-start space-x-6 text-sm text-gray-400">
          <a href="/privacy-policy" className="hover:text-primary transition-colors duration-300">
            {t('footer.privacyPolicy')}
          </a>
          <a href="/terms-of-service" className="hover:text-primary transition-colors duration-300">
            {t('footer.termsOfService')}
          </a>
          <a href="/cookie-policy" className="hover:text-primary transition-colors duration-300">
            {t('footer.cookiePolicy')}
          </a>
          <a href="/help" className="hover:text-primary transition-colors duration-300">
            {t('footer.helpCenter')}
          </a>
        </div>
        
        <div className="text-center md:text-right">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Biyaa. {t('footer.allRightsReserved')}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {t('footer.madeWithLove')}
          </p>
        </div>
      </div>
    </div>
  </footer>
);
}

export default Footer;

