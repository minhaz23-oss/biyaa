"use client";

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
        console.error("Error checking biodata:", error);
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
    <div className=" w-full min-h-screen pb-10 mt-2 sm:mt-0">
      <div className="bg-white border-2 border-primary/80 md:bg-[url('/images/wedding.png')] md:bg-cover md:grayscale-20 md:border-0 h-[500px] rounded-2xl px-4 sm:px-8 md:px-12 lg:px-[50px] py-[60px] text-gray-800 md:text-white relative before:content-[''] before:absolute before:inset-0 md:before:bg-black/15 before:rounded-2xl">
        <div className="relative z-10 text-center md:text-left">
          <h1
            className={`text-3xl md:text-4xl lg:text-[50px] font-bold text-primary md:text-gradient-primary h-fit mx-auto md:mx-0 max-w-[280px] sm:max-w-[400px] md:max-w-[550px] leading-tight ${fontClass}`}
          >
            {t("home.heroTitle")}
          </h1>
          <p
            className={`text-base sm:text-lg md:text-xl lg:text-[25px] font-regular text-primary-light mx-auto md:mx-0 max-w-[260px] sm:max-w-[350px] md:max-w-[500px] mt-4 ${fontClass}`}
          >
            {t("home.heroDescription")}
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
