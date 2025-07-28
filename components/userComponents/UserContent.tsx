"use client";

import { useState } from "react";
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


const UserContent = ({ children }: { children: React.ReactNode }) => {

 const [loading,setLoading] = useState(false);
 const { sidebarOpen } = useSelector((state: RootState) => state.user);
 const dispatch = useDispatch();
 const router = useRouter();
 const { t } = useLanguage();
 const { fontClass } = useFont();

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
          sidebarOpen ? 'ml-72' : 'ml-16'
        }`}>
          
          <header className="bg-white border-b border-gray-500 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className=" flex gap-5 items-centers"> {getNavigationItems().map((item) => (
                <Link
           
            href={`/${item.href}`}
            key={item.id}
          >
            <h1
              className={` font-semibold text-gray-500 hover:scale-105 hover:bg-primary hover:text-white rounded-md px-2 py-1 transition-all duration-300`}
            >
              {item.name}
            </h1>
          </Link>
              ))}</div>
              <div className="flex items-center gap-3 ">
                <span className="text-[18px] text-gray-600">{t("user.dashboard.welcomeBack")}</span>
                <LanguageToggle />
                <button onClick={handleLogout} className=" btn-secondary">{
                   loading ? <Loader color="#D79E44" height={20} width={20} className="inline-block" /> : t("user.dashboard.logout")
                  }</button>
                
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-10">{children}</main>
        </div>
      </div>
    
  );
};

export default UserContent;