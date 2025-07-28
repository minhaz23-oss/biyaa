'use client';

import { useAuth } from '@/lib/hooks/useAuth';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { FaEdit, FaUser } from 'react-icons/fa';
import { setActiveTab } from '@/redux/userSlice';
import { useFont } from '@/lib/hooks/useFont';
import { useLanguage } from '@/contexts/LanguageContext';

const Profile = () => {
  const fontClass = useFont();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { t } = useLanguage();

  return (
    <div className={`${fontClass} p-6 space-y-6`}>
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-primary/80">
        <div className="flex items-center space-x-3">
          <FaUser className="w-8 h-8 text-primary" />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{t('user.profile.title')}</h2>
            <p className="text-gray-600">{t('user.profile.subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-primary/80">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary/80">
            <Image
              src={user?.photoURL || '/images/profiles/male.jpeg'}
              alt={t('user.profile.profilePicture')}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-800">
              {user?.displayName || t('user.profile.anonymousUser')}
            </h3>
            <p className="text-gray-600 mb-2">{user?.email}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>{t('user.profile.accountType')}: {t('user.profile.user')}</span>
              <span>{t('user.profile.status')}: {t('user.profile.active')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-primary/80">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('user.profile.contactInfo')}</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600 font-medium">{t('user.profile.email')}</span>
            <span className="text-gray-800">{user?.email || t('user.profile.notProvided')}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600 font-medium">{t('user.profile.displayName')}</span>
            <span className="text-gray-800">{user?.displayName || t('user.profile.notSet')}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600 font-medium">{t('user.profile.accountCreated')}</span>
            <span className="text-gray-800">
              {user?.metadata?.creationTime
                ? new Date(user.metadata.creationTime).toLocaleDateString()
                : t('user.profile.unknown')}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-primary/80">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('user.profile.quickActions')}</h3>
        <div className="space-y-3">
          <button
            onClick={() => dispatch(setActiveTab('edit-biodata'))}
            className="w-full flex items-center justify-center space-x-2 btn-primary"
          >
            <FaEdit className="w-4 h-4" />
            <span>{t('user.profile.editBiodata')}</span>
          </button>
          <button
            onClick={() => dispatch(setActiveTab('settings'))}
            className="w-full flex items-center justify-center space-x-2 btn-secondary"
          >
            <span>{t('user.profile.accountSettings')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
