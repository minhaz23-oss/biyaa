'use client'

import Dashboard from "@/components/userComponents/Dashboard";
import EditBiodata from "@/components/userComponents/EditBiodata";
import LikedBiodata from "@/components/userComponents/LikedBiodata";
import UnlikedBiodata from "@/components/userComponents/UnlikedBiodata";
import DeleteBiodata from "@/components/userComponents/DeleteBiodata";
import Settings from "@/components/userComponents/Settings";
import Profile from "@/components/userComponents/Profile";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const UserPage = () => {
  const activeTab = useSelector((state: RootState) => state.user.activeTab);
  const renderContent = () => {
    switch(activeTab) {
      
      case 'dashboard':
        return <Dashboard />;
      case 'edit-biodata':
        return <EditBiodata />;
      case 'liked-biodatas':
        return <LikedBiodata />;
      case 'unliked-biodatas':
        return <UnlikedBiodata />;
      case 'delete-biodatas':
        return <DeleteBiodata />;
      case 'settings':
        return <Settings />;
        case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  }
  return (
    <div className="flex-1 overflow-auto">
      {renderContent()}
    </div>
  );
};

export default UserPage;
