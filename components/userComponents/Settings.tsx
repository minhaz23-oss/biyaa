'use client';

import { useState, useCallback } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useDispatch } from 'react-redux';
import { setActiveTab } from '@/redux/userSlice';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFont } from '@/lib/hooks/useFont';
import { 
  FaBell, 
  FaLock, 
  FaUserCircle, 
  FaEnvelope, 
  FaInfoCircle, 
  FaEye,
  FaEdit,
  FaTrash,
  FaShieldAlt 
} from 'react-icons/fa';
import { IoSettings } from 'react-icons/io5';
import { toast } from 'sonner';

const Settings = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { t } = useLanguage();
  const fontClass = useFont();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState('public');
  const [matchNotifications, setMatchNotifications] = useState(true);

  const handleEditProfile = useCallback(() => {
    dispatch(setActiveTab('edit-biodata'));
  }, [dispatch]);

  const handleSaveNotificationSettings = useCallback(() => {
    toast.success(t('user.settings.notificationsSaved'));
  }, [t]);

  const handleChangePassword = useCallback(() => {
    toast.info(t('user.settings.passwordChangeSoon'));
  }, [t]);

  const handleContactSupport = useCallback(() => {
    toast.info(t('user.settings.redirectingToSupport'));
  }, [t]);

  return (
    <div className={`p-2 sm:p-6 space-y-6 ${fontClass}`}>
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-primary/20">
        <div className="flex items-center space-x-3">
          <IoSettings className="w-8 h-8 text-primary" />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{t('user.settings.title')}</h2>
            <p className="text-gray-600">{t('user.settings.subtitle')}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Management */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-primary/20">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <FaUserCircle className="w-5 h-5 mr-2 text-primary" />
            {t('user.settings.profileManagement')}
          </h3>
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">{t('user.settings.currentEmail')}:</p>
              <p className="font-medium">{user?.email || t('user.settings.notAvailable')}</p>
            </div>
            <div className="space-y-2">
              <button 
                onClick={handleEditProfile}
                className="w-full flex items-center justify-center space-x-2 btn-primary"
              >
                <FaEdit className="w-4 h-4" />
                <span>{t('user.settings.editBiodata')}</span>
              </button>
              <button 
                onClick={() => dispatch(setActiveTab('profile'))}
                className="w-full flex items-center justify-center space-x-2 btn-secondary"
              >
                <FaEye className="w-4 h-4" />
                <span>{t('user.settings.viewProfile')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-primary/20">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <FaBell className="w-5 h-5 mr-2 text-primary" />
            {t('user.settings.notifications')}
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700">{t('user.settings.emailNotifications')}</p>
                <p className="text-sm text-gray-500">{t('user.settings.receiveEmailUpdates')}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700">{t('user.settings.smsNotifications')}</p>
                <p className="text-sm text-gray-500">{t('user.settings.receiveSmsUpdates')}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={smsNotifications}
                  onChange={(e) => setSmsNotifications(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700">{t('user.settings.matchNotifications')}</p>
                <p className="text-sm text-gray-500">{t('user.settings.getMatchNotifications')}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={matchNotifications}
                  onChange={(e) => setMatchNotifications(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <button 
              onClick={handleSaveNotificationSettings}
              className="w-full btn-primary mt-4"
            >
              {t('user.settings.saveNotificationSettings')}
            </button>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-primary/20">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <FaShieldAlt className="w-5 h-5 mr-2 text-primary" />
            {t('user.settings.privacySecurity')}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('user.settings.profileVisibility')}
              </label>
              <select 
                value={profileVisibility}
                onChange={(e) => setProfileVisibility(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="public">{t('user.settings.visibilityPublic')}</option>
                <option value="members">{t('user.settings.visibilityMembers')}</option>
                <option value="premium">{t('user.settings.visibilityPremium')}</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <button 
                onClick={handleChangePassword}
                className="w-full flex items-center justify-center space-x-2 btn-secondary"
              >
                <FaLock className="w-4 h-4" />
                <span>{t('user.settings.changePassword')}</span>
              </button>
              
              <button 
                onClick={() => dispatch(setActiveTab('unliked-biodatas'))}
                className="w-full flex items-center justify-center space-x-2 btn-secondary"
              >
                <FaEye className="w-4 h-4" />
                <span>{t('user.settings.manageBlockedProfiles')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-primary/20">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <FaInfoCircle className="w-5 h-5 mr-2 text-primary" />
            {t('user.settings.accountActions')}
          </h3>
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800 mb-2">
                <strong>{t('user.settings.needHelp')}?</strong> {t('user.settings.supportTeamMessage')}
              </p>
              <button 
                onClick={handleContactSupport}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                <FaEnvelope className="w-4 h-4" />
                <span>{t('user.settings.contactSupport')}</span>
              </button>
            </div>
            
            <div className="p-3 bg-red-50 rounded-lg border border-red-200">
              <p className="text-sm text-red-800 mb-2">
                <strong>{t('user.settings.deleteAccount')}:</strong> {t('user.settings.deleteAccountMessage')}
              </p>
              <button 
                onClick={() => dispatch(setActiveTab('delete-biodatas'))}
                className="flex items-center space-x-2 text-red-600 hover:text-red-800 font-medium"
              >
                <FaTrash className="w-4 h-4" />
                <span>{t('user.settings.deleteAccount')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* App Information */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-primary/20">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('user.settings.appInformation')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div>
            <p className="font-medium text-gray-700">{t('user.settings.version')}</p>
            <p>1.0.0</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">{t('user.settings.lastUpdated')}</p>
            <p>{t('user.settings.lastUpdatedDate')}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">{t('user.settings.supportEmail')}</p>
            <p>support@biyaa.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
