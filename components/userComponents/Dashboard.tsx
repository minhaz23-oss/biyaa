'use client';

import { useAuth } from '@/lib/hooks/useAuth';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setActiveTab } from '@/redux/userSlice';
import { useEffect, useState, useCallback } from 'react';
import { getBiodataByUserId } from '@/lib/actions/biodata.actions';
import { getFavorites, getIgnoreList } from '@/lib/actions/user.actions';
import { FaHeart, FaUserEdit } from 'react-icons/fa';
import { IoMdHeartDislike } from 'react-icons/io';
import { IoSettings } from 'react-icons/io5';
import { MdDashboard } from 'react-icons/md';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

const Dashboard = () => {
  const { user } = useAuth();
  const { isBiodataExists } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [biodata, setBiodata] = useState<Biodata | null>(null);
  const [stats, setStats] = useState({
    favoriteCount: 0,
    ignoredCount: 0
  });
  const { t } = useLanguage();

  const fetchUserData = useCallback(async () => {
    if (!user?.uid) return;
    
    setLoading(true);
    try {
      // Fetch biodata
      const biodataResponse = await getBiodataByUserId(user.uid);
      if (biodataResponse.success && biodataResponse.data) {
        setBiodata(biodataResponse.data);
      }

      // Fetch favorites count
      const favoritesResponse = await getFavorites(user.uid);
      if (favoritesResponse.success) {
        setStats(prev => ({ ...prev, favoriteCount: favoritesResponse.data.length }));
      }

      // Fetch ignored count
      const ignoredResponse = await getIgnoreList(user.uid);
      if (ignoredResponse.success) {
        setStats(prev => ({ ...prev, ignoredCount: ignoredResponse.data.length }));
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  }, [user?.uid]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleQuickAction = (tabId: string) => {
    dispatch(setActiveTab(tabId));
  };

  const getProfilePicture = () => {
    if (!biodata?.biodataType) {
      return "/images/profiles/male.jpeg";
    }
    const biodataType = biodata.biodataType.toLowerCase();
    return biodataType.includes("female") || biodataType.includes("woman") 
      ? "/images/profiles/female.jpeg"
      : "/images/profiles/male.jpeg";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-primary/20">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20">
            <Image
              src={getProfilePicture()}
              alt="Profile Picture"
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {t("user.dashboard.welcomeMessage").replace('{name}', biodata?.fullName || user?.displayName || 'User')}
            </h2>
            <p className="text-gray-600">
              {t("user.dashboard.summaryMessage")}
            </p>
          </div>
        </div>
      </div>

      {/* Biodata Status Alert */}
      {!isBiodataExists && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-800">
                <strong>{t("user.dashboard.actionRequired")}</strong> {t("user.dashboard.completeMessage")}
                <button 
                  onClick={() => handleQuickAction('edit-biodata')}
                  className="ml-2 font-medium text-yellow-800 underline hover:text-yellow-900"
                >
                  {t("user.dashboard.completeNow")}
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-primary/80">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <MdDashboard className="w-5 h-5 mr-2 text-primary" />
            {t("user.dashboard.profileOverview")}
          </h3>
          {biodata ? (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">{t("user.dashboard.biodataType")}:</span>
                <span className="font-medium">{biodata.biodataType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t("user.dashboard.maritalStatus")}:</span>
                <span className="font-medium capitalize">{biodata.maritalStatus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t("user.dashboard.education")}:</span>
                <span className="font-medium">{biodata.highestDegree || t("user.dashboard.notSpecified")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t("user.dashboard.profession")}:</span>
                <span className="font-medium">{biodata.occupation || t("user.dashboard.notSpecified")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t("user.dashboard.location")}:</span>
                <span className="font-medium">{biodata.presentDistrict || t("user.dashboard.notSpecified")}</span>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">{t("user.dashboard.noBiodataInfo")}</p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-primary/80">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t("user.dashboard.quickActions")}</h3>
          <div className="space-y-3">
            <button 
              onClick={() => handleQuickAction('edit-biodata')}
              className="w-full flex items-center space-x-3 p-3 text-left hover:bg-primary/60 rounded-lg transition-colors"
            >
              <FaUserEdit className="w-5 h-5 text-primary" />
              <span>{t("user.quickActions.editBiodata")}</span>
            </button>
            <button 
              onClick={() => handleQuickAction('liked-biodatas')}
              className="w-full flex items-center space-x-3 p-3 text-left hover:bg-primary/60 rounded-lg transition-colors"
            >
              <FaHeart className="w-5 h-5 text-red-500" />
              <span>{t("user.quickActions.likedBiodatas").replace('{count}', stats.favoriteCount.toString())}</span>
            </button>
            <button 
              onClick={() => handleQuickAction('unliked-biodatas')}
              className="w-full flex items-center space-x-3 p-3 text-left hover:bg-primary/60 rounded-lg transition-colors"
            >
              <IoMdHeartDislike className="w-5 h-5 text-gray-500" />
              <span>{t("user.quickActions.ignoredBiodatas").replace('{count}', stats.ignoredCount.toString())}</span>
            </button>
            <button 
              onClick={() => handleQuickAction('settings')}
              className="w-full flex items-center space-x-3 p-3 text-left hover:bg-primary/60 rounded-lg transition-colors"
            >
              <IoSettings className="w-5 h-5 text-gray-600" />
              <span>{t("user.quickActions.settings")}</span>
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-primary/80">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Statistics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <FaHeart className="w-5 h-5 text-red-500" />
                <span className="text-sm font-medium">Liked Profiles</span>
              </div>
              <span className="text-xl font-bold text-red-600">{stats.favoriteCount}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <IoMdHeartDislike className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium">Ignored Profiles</span>
              </div>
              <span className="text-xl font-bold text-gray-600">{stats.ignoredCount}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
              <div className="flex items-center space-x-3">
                <MdDashboard className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Profile Status</span>
              </div>
              <span className={`text-sm font-bold ${
                isBiodataExists ? 'text-green-600' : 'text-orange-600'
              }`}>
                {isBiodataExists ? 'Complete' : 'Incomplete'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-primary/80">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
        <div className="text-center py-8">
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4m0 0V24a8 8 0 0116 0v12M24 16a4 4 0 00-4 4v8a4 4 0 008 0v-8a4 4 0 00-4-4z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No recent activities</h3>
          <p className="mt-1 text-sm text-gray-500">Your recent profile interactions will appear here.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
