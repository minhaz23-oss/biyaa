'use client'
import React, { ReactNode, useEffect } from "react";
import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import Link from 'next/link';

const SearchLayout = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/sign-in');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Optional: Add a minimal header if needed */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">{t('search.title')}</h1>
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <LanguageToggle />
            <Link href="/" className="text-sm text-gray-600 hover:text-white hover:bg-primary rounded-md px-3 py-2">
              ← {t('nav.home')}
            </Link>
          </div>
        </div>
      </header>
      
      {/* Full-width content area */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default SearchLayout;
