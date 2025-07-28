"use client";
import Link from "next/link";
import Image from "next/image";
import { navigationItems } from "@/constants";
import { useAuth } from "@/lib/hooks/useAuth";
import { signOut } from "@/lib/actions/auth.actions";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "./LanguageToggle";

const Nav = () => {
  const [signingOut, setSigningOut] = useState(false);
  const { user, loading } = useAuth();
  const { t, language } = useLanguage();
  const pathname = usePathname();
  
  // Get text size class based on language
  const getTextSizeClass = () => {
    return language === 'bn' ? 'text-lg' : 'text-base';
  };

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

  const handleSignOut = async () => {
    try {
      setSigningOut(true);
      const result = await signOut();
      if (result.success) {
        // Redirect to home page after successful logout
        window.location.href = "/";
      } else {
        console.error("Sign out failed:", result.message);
      }
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <nav className="flex items-center justify-between w-full h-[60px]">
      <Link href="/">
        <h1 className="text-3xl font-bold text-primary ">Biyaa</h1>
      </Link>
      <div className=" flex items-center gap-8">
        {getNavigationItems().map((item) => {
          // Determine if current item is active based on pathname
          const isActive = 
            (pathname === "/" && item.href === "/") ||
            (pathname !== "/" && pathname.includes(item.href) && item.href !== "/");
          
          return (
            <Link
              href={item.href}
              key={item.id}
            >
              <h1
                className={` font-semibold ${getTextSizeClass()} ${
                  isActive ? "text-primary" : "text-gray"
                } hover:scale-105 transition-all duration-300`}
              >
                {item.name}
              </h1>
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        {/* Language Toggle */}
        <LanguageToggle />
        
        {loading ? (
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 animate-pulse bg-gray-200 rounded-full"></div>
            <div className="w-16 h-8 animate-pulse bg-gray-200 rounded"></div>
          </div>
        ) : user ? (
          <>
            <Link href="/user">
              <Image
                src="/images/profiles/male.jpeg"
                alt={user.displayName || t('nav.profile')}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 hover:border-primary transition-colors duration-200"
              />
            </Link>

            <button
              onClick={handleSignOut}
              disabled={signingOut}
              className={`btn-secondary ${
                signingOut ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {signingOut ? t('common.loading') : t('nav.logout')}
            </button>
          </>
        ) : (
          <>
            <Link href="/sign-in">
              <button className="btn-primary">{t('nav.signIn')}</button>
            </Link>
            <Link href="/sign-up">
              <button className="btn-secondary">{t('nav.signUp')}</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
