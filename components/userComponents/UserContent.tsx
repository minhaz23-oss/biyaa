"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/userComponents/Sidebar";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { toast } from 'sonner';
import Link from "next/link";
import { signOut } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import { setActiveTab, setUserProfile } from '@/redux/userSlice';
import Loader from "../ui/Loader";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "../LanguageToggle";
import { useFont } from "@/lib/hooks/useFont";
import { sidebarItems } from "@/constants";


const UserContent = ({ children }: { children: React.ReactNode }) => {

 const [loading,setLoading] = useState(false);
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 const { sidebarOpen, activeTab } = useSelector((state: RootState) => state.user);
 const dispatch = useDispatch();
 const router = useRouter();
 const { t } = useLanguage();
 const { fontClass } = useFont();

 // Prevent body scrolling when mobile menu is open
 useEffect(() => {
   if (mobileMenuOpen) {
     // Prevent scrolling when menu is open
     document.body.style.overflow = 'hidden';
   } else {
     // Restore scrolling when menu is closed
     document.body.style.overflow = '';
   }

   // Cleanup on unmount
   return () => {
     document.body.style.overflow = '';
   };
 }, [mobileMenuOpen]);

 // Navigation items with translation keys
 const getNavigationItems = () => [
   {
     id: 1,
     name: t('nav.home'),
     label: t('nav.home'),
     href: "/",
     isActive: true,
     icon: "🏠",
   },
   {
     id: 2,
     name: t('nav.aboutUs'),
     label: t('nav.aboutUs'),
     href: "/aboutus",
     isActive: false,
     icon: "👥",
   },
   {
     id: 3,
     name: t('nav.qna'),
     label: t('nav.qna'),
     href: "/qna",
     isActive: false,
     icon: "❓",
   },
   {
     id: 4,
     name: t('nav.guide'),
     label: t('nav.guide'),
     href: "/guide",
     isActive: false,
     icon: "📚",
   },
   {
     id: 5,
     name: t('nav.contact'),
     label: t('nav.contact'),
     href: "/contact",
     isActive: false,
     icon: "📞",
   },
 ];

 const handleLogout = async () => {
   try {
    setLoading(true);
    const res = await signOut();
    
    if(res.success){
      // Clear Redux state
      dispatch(setActiveTab('dashboard'));
      dispatch(setUserProfile({ name: '', email: '' }));
      
      toast.success(t("user.dashboard.loggedOutSuccess"));
      router.push('/sign-in');
    } else {
      // Handle case where signOut returns success: false
      toast.error(res.message || t("user.dashboard.logoutError"));
    }
   } catch (error) {
    console.error('Logout error:', error);
    toast.error(t("user.dashboard.logoutErrorLater"));
   } finally {
    setLoading(false);
   }
 }


  return (
    
      <div className={`flex min-h-screen bg-gray-50 ${fontClass}`}>
        <Sidebar />

        <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-72' : 'lg:ml-16'
        }`}>
          
          <header className="bg-white border-b border-gray-500 px-3 sm:px-6 py-4 relative">
            <div className="flex items-center justify-between">
              {/* Navigation - Hidden on mobile, visible on tablet+ */}
              <div className="hidden md:flex gap-2 lg:gap-5 items-center flex-wrap"> 
                {getNavigationItems().map((item) => (
                  <Link
                    href={`/${item.href}`}
                    key={item.id}
                  >
                    <h1
                      className={`font-semibold text-gray-500 hover:scale-105 hover:bg-primary hover:text-white rounded-md px-2 py-1 transition-all duration-300 text-sm lg:text-base`}
                    >
                      {item.name}
                    </h1>
                  </Link>
                ))}
              </div>
              
              {/* Mobile hamburger menu button */}
              <div className="md:hidden flex items-center">
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200"
                  aria-label="Toggle mobile menu"
                >
                  <div className="w-5 h-5 flex flex-col justify-center items-center">
                    <span className={`bg-current block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm ${
                      mobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
                    }`}></span>
                    <span className={`bg-current block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm my-0.5 ${
                      mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                    }`}></span>
                    <span className={`bg-current block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm ${
                      mobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
                    }`}></span>
                  </div>
                </button>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Welcome text - Hidden on mobile */}
                <span className="hidden md:block text-sm lg:text-[18px] text-gray-600">{t("user.dashboard.welcomeBack")}</span>
                <LanguageToggle />
                <button onClick={handleLogout} className="btn-secondary text-sm lg:text-base px-2 sm:px-4">{
                   loading ? <Loader color="#D79E44" height={20} width={20} className="inline-block" /> : t("user.dashboard.logout")
                  }</button>
                
              </div>
            </div>
            
            {/* Mobile dropdown menu */}
            {mobileMenuOpen && (
              <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50 max-h-[80vh] overflow-y-auto">
                <div className="px-3 py-4">
                  <div className="mb-3 pb-3 border-b border-gray-100">
                    <span className="text-sm text-gray-600">{t("user.dashboard.welcomeBack")}</span>
                  </div>
                  
                  {/* Main Navigation Section */}
                  <div className="mb-4">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2 px-2">{t("nav.mainNavigation") || "Main Navigation"}</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {getNavigationItems().map((item) => (
                        <Link
                          href={`/${item.href}`}
                          key={item.id}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2 p-3 text-gray-700 hover:bg-primary hover:text-white rounded-lg transition-all duration-200"
                        >
                          <span className="text-lg">{item.icon}</span>
                          <span className="text-sm font-medium">{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  {/* Dashboard Navigation Section */}
                  <div className="border-t border-gray-100 pt-4">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2 px-2">{t("user.sidebar.dashboardNavigation") || "Dashboard"}</h3>
                    <div className="grid grid-cols-1 gap-1">
                      {sidebarItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              dispatch(setActiveTab(item.id));
                              setMobileMenuOpen(false);
                            }}
                            className={`flex items-center gap-3 p-3 text-left rounded-lg transition-all duration-200 ${
                              isActive
                                ? "bg-primary/20 text-primary border border-primary/30"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            <Icon className="w-5 h-5 flex-shrink-0" />
                            <span className="text-sm font-medium">{t(item.translationKey)}</span>
                            {isActive && (
                              <div className="ml-auto w-2 h-2 bg-primary rounded-full"></div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </header>

          <main className="flex-1 overflow-auto p-3 sm:p-6 lg:p-10">{children}</main>
        </div>
      </div>
    
  );
};

export default UserContent;