"use client";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/hooks/useAuth";
import { signOut } from "@/lib/actions/auth.actions";
import { signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "@/firebase/client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "./LanguageToggle";
import { IoMdMenu, IoMdClose } from "react-icons/io";

const Nav = () => {
  const [signingOut, setSigningOut] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, loading } = useAuth();
  const { t, language } = useLanguage();
  const pathname = usePathname();
  
  // Get text size class based on language
  const getTextSizeClass = () => {
    return language === 'bn' ? 'text-lg' : 'text-base';
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

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
      
      // Sign out from Firebase Auth (client-side)
      await firebaseSignOut(auth);
      
      // Clear server-side session
      const result = await signOut();
      
      if (result.success) {
        // Redirect to home page after successful logout
        window.location.href = "/";
      } else {
        console.error("Server sign out failed:", result.message);
        // Even if server signout fails, client signout succeeded, so redirect anyway
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error signing out:", error);
      // Even if there's an error, try to redirect to clear the state
      window.location.href = "/";
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <nav className="flex items-center justify-between w-full h-[60px] p-4 md:px-8 bg-white shadow-md rounded-md">
      <Link href="/">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">Biyaa</h1>
      </Link>

      {/* Desktop Items */}
      <div className="hidden lg:flex items-center gap-8">
        {getNavigationItems().map((item) => {
          const isActive = 
            (pathname === "/" && item.href === "/") ||
            (pathname !== "/" && pathname.includes(item.href) && item.href !== "/");

          return (
            <Link key={item.id} href={item.href}>
              <h1 className={`font-semibold ${getTextSizeClass()} ${
                  isActive ? "text-primary" : "text-gray-700"
                } hover:scale-105 transition-all duration-300`}>
                {item.name}
              </h1>
            </Link>
          );
        })}
      </div>

      {/* Mobile Navigation and User Section */}
      <div className="flex lg:hidden items-center gap-3">
        {/* Mobile Menu Button */}
        <button 
          className="text-gray-600 hover:text-primary transition-colors duration-200 p-1" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <IoMdMenu className="w-6 h-6" />
        </button>
        
        <LanguageToggle />
        
        {loading ? (
          <div className="text-sm text-gray-500">Loading...</div>
        ) : user ? (
          <div className="flex items-center gap-2">
            <Link href="/user">
              <Image 
                src="/images/profiles/male.jpeg" 
                alt={user.displayName || t('nav.profile')} 
                width={32} 
                height={32} 
                className="w-8 h-8 rounded-full object-cover border-2 border-gray-200 hover:border-primary transition-colors duration-200"
              />
            </Link>
            {/* <button 
              onClick={handleSignOut} 
              disabled={signingOut} 
              className={`btn-secondary text-xs px-2 py-1 ${signingOut ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {signingOut ? t('common.loading') : t('nav.logout')}
            </button> */}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/sign-in">
              <button className="btn-primary text-xs px-2 py-1">{t('nav.signIn')}</button>
            </Link>
            <Link href="/sign-up">
              <button className="btn-secondary text-xs px-2 py-1">{t('nav.signUp')}</button>
            </Link>
          </div>
        )}
      </div>

      {/* Desktop User Section */}
      <div className="hidden lg:flex items-center gap-4">
        <LanguageToggle />
        {loading ? ("Loading...") : user ? (
          <>
            <Link href="/user">
              <Image src="/images/profiles/male.jpeg" alt={user.displayName || t('nav.profile')} width={40} height={40} className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 hover:border-primary transition-colors duration-200"/>
            </Link>
            <button onClick={handleSignOut} disabled={signingOut} className={`btn-secondary ${signingOut ? "opacity-50 cursor-not-allowed" : ""}`}>
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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          
          {/* Mobile Menu Panel */}
          <div className="fixed inset-y-0 right-0 flex max-w-full">
            <div className="w-screen max-w-sm">
              <div className="flex h-full flex-col bg-white shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Nav menu</h2>
                  <button
                    type="button"
                    className="rounded-md p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <IoMdClose className="h-6 w-6" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 px-4 py-6">
                  <nav className="space-y-1">
                    {getNavigationItems().map((item) => {
                      const isActive = 
                        (pathname === "/" && item.href === "/") ||
                        (pathname !== "/" && pathname.includes(item.href) && item.href !== "/");

                      return (
                        <Link
                          key={item.id}
                          href={item.href}
                          className={`group flex items-center px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                            isActive
                              ? "bg-primary text-white"
                              : "text-gray-700 hover:bg-gray-100 hover:text-primary"
                          }`}
                        >
                          <span className="mr-3 text-lg" role="img" aria-label={item.name}>
                            {item.icon}
                          </span>
                          <span className={getTextSizeClass()}>{item.name}</span>
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                {/* User Section */}
                <div className="border-t border-gray-200 px-4 py-6">
                  {user ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Image 
                          src="/images/profiles/male.jpeg" 
                          alt={user.displayName || t('nav.profile')} 
                          width={40} 
                          height={40} 
                          className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {user.displayName || user.email}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={handleSignOut} 
                        disabled={signingOut}
                        className={`w-full btn-secondary ${signingOut ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        {signingOut ? t('common.loading') : t('nav.logout')}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Link href="/sign-in" className="block">
                        <button className="btn-primary w-full">{t('nav.signIn')}</button>
                      </Link>
                      <Link href="/sign-up" className="block">
                        <button className="btn-secondary w-full">{t('nav.signUp')}</button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
