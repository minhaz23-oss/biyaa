"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setActiveTab, setBiodataExists } from "@/redux/userSlice";
import { sidebarItems } from "@/constants";
import { IoIosLogOut } from "react-icons/io";
import { IoIosMenu } from "react-icons/io";
import { Button } from "../ui/button";
import { toggleSidebar } from "@/redux/userSlice";
import { useAuth } from "@/lib/hooks/useAuth";
import { useEffect, useState, useCallback } from "react";
import { getBiodataByUserId } from "@/lib/actions/biodata.actions";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFont } from "@/lib/hooks/useFont";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { activeTab, sidebarOpen, isBiodataExists } = useSelector(
    (state: RootState) => state.user
  );
  const [loading, setLoading] = useState(false);
  const [biodata, setBiodata] = useState<Biodata | null>(null);
  const { user } = useAuth();
  const userId = user?.uid;
  const { t } = useLanguage();

  const getBiodata = useCallback(async () => {
    try {
      if (!userId) {
        console.log("User ID not available yet");
        return;
      }

      setLoading(true);
      const response = await getBiodataByUserId(userId);

      if (response.success) {
        // Check if biodata actually exists (data is not null)
        if (response.data) {
          console.log("Biodata exists for user:", response.data);
          dispatch(setBiodataExists(true));
          setBiodata(response.data);
        } else {
          console.log("No biodata found for user");
          dispatch(setBiodataExists(false));
          setBiodata(null);
        }
      } else {
        console.error("Failed to fetch biodata:", response.message);
        dispatch(setBiodataExists(false));
        setBiodata(null);
      }
    } catch (error) {
      console.error("Error fetching biodata:", error);
      dispatch(setBiodataExists(false));
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    getBiodata();
  }, [getBiodata]);

  const handleTabClick = (tabId: string) => {
    dispatch(setActiveTab(tabId));
  };

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  // Get profile picture based on biodataType
  const getProfilePicture = () => {
    if (!biodata || !biodata.biodataType) {
      return "/images/profiles/male.jpeg"; // Default fallback
    }

    // Check if biodataType contains 'female' or 'Male' (case insensitive)
    const biodataType = biodata.biodataType.toLowerCase();
    if (biodataType.includes("female") || biodataType.includes("woman")) {
      return "/images/profiles/female.jpeg";
    } else {
      return "/images/profiles/male.jpeg";
    }
  };

  return (
    <div
      className={`fixed top-0 h-screen bg-white border-r border-gray-500 transition-all duration-300 z-50 ${
        sidebarOpen ? "w-72" : "w-16"
      }`}
    >
      {/* Sidebar Header */}
      <div className="p-4">
        <div
          className={`flex items-center ${
            sidebarOpen ? "space-x-3" : "justify-center"
          }`}
        >
          <div onClick={() => dispatch(setActiveTab('profile'))} className=" flex items-center justify-center space-x-3 cursor-pointer">
            {sidebarOpen && (
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
                <Image
                  src={getProfilePicture()}
                  alt="Profile Picture"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {sidebarOpen && (
              <div>
                <h2 className="font-semibold text-gray-900">{t("user.dashboard.title")}</h2>
                <p className="text-sm text-gray-500">{t("user.dashboard.subtitle")}</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(toggleSidebar())}
          >
            <IoIosMenu className="w-5 h-5" />
          </Button>
        </div>
        {sidebarOpen && (
          <div className="w-full mt-2 flex items-center justify-between">
            {loading ? (
              <p className="text-sm text-gray-500">{t("user.dashboard.loading")}</p>
            ) : !isBiodataExists ? (
              <p onClick={() => dispatch(setActiveTab('edit-biodata'))} className="text-sm p-1 px-2 w-fit rounded-md bg-red-300 text-black border border-red-500 cursor-pointer">
                {t("user.dashboard.pleaseCompleteBiodata")}
              </p>
            ) : (
              <p className="text-sm p-1 px-2 w-fit rounded-md bg-green-300 text-black border-green-500 ">
                {t("user.dashboard.biodataCompleted")}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <nav className={` ${sidebarOpen ? "p-4" : "p-3"} space-y-2`}>
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`w-full flex items-center ${
                sidebarOpen ? "justify-normal" : "justify-center"
              } space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                isActive
                  ? "bg-primary/50 text-black border border-primary"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-medium">{t(item.translationKey)}</span>}
            </button>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <IoIosLogOut className="w-5 h-5 flex-shrink-0" />
          {sidebarOpen && <span className="font-medium">{t("user.sidebar.logout")}</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
