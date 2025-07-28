'use client';

import CreateBioBtn from "@/components/CreateBioBtn";
import SearchBar from "@/components/SearchBar";
import Statistics from "@/components/Statistics";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/hooks/useAuth";
import { getBiodataByUserId } from "@/lib/actions/biodata.actions";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { user, loading: authLoading } = useAuth();
  const { t, fontClass } = useLanguage();
  const [hasBiodata, setHasBiodata] = useState<boolean | null>(null);
  const [biodataLoading, setBiodataLoading] = useState(false);

  useEffect(() => {
    const checkBiodata = async () => {
      if (!user?.uid) {
        setHasBiodata(false);
        return;
      }

      setBiodataLoading(true);
      try {
        const response = await getBiodataByUserId(user.uid);
        setHasBiodata(response.success && response.data !== null);
      } catch (error) {
        console.error('Error checking biodata:', error);
        setHasBiodata(false);
      } finally {
        setBiodataLoading(false);
      }
    };

    if (!authLoading) {
      checkBiodata();
    }
  }, [user?.uid, authLoading]);

  // Show CreateBioBtn only if user is authenticated and doesn't have biodata
  const shouldShowCreateBioBtn = user && !hasBiodata && !biodataLoading;

  return (
    <div className=" w-full min-h-screen pb-10">
      <div className="bg-[url('/images/wedding.png')] bg-cover grayscale-20 h-[500px] rounded-2xl px-[50px] py-[60px] text-white relative before:content-[''] before:absolute before:inset-0 before:bg-black/15 before:rounded-2xl">
        <div className="relative z-10">
          <h1
            className={`text-[50px] font-bold text-gradient-primary h-fit max-w-[550px] leading-tight ${fontClass}`}
          >
            {t('home.heroTitle')}
          </h1>
          <p
            className={`text-[25px] font-regular text-primary-light max-w-[500px] ${fontClass}`}
          >
            {t('home.heroDescription')}
          </p>
        </div>
        <SearchBar />
      </div>
      {shouldShowCreateBioBtn && <CreateBioBtn />}
      
      {/* Statistics Section */}
      <Statistics />
      
      {/* How It Works Section */}
      <HowItWorks />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
