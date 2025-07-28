import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoMdHeartDislike } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa6";
import { MdFamilyRestroom } from "react-icons/md";
import { FaBriefcase } from "react-icons/fa";
import { FaHeartCircleExclamation } from "react-icons/fa6";
import { MdFaceUnlock } from "react-icons/md";
import { FiFileText } from "react-icons/fi";
import { FaPhoneAlt } from "react-icons/fa";

export const navigationItems = [
  {
    id: 1,
    name: "Home",
    label: "Home",
    href: "/",
    isActive: true,
    icon: "🏠",
  },
  {
    id: 2,
    name: "About Us",
    label: "About Us",
    href: "/aboutus",
    isActive: false,
    icon: "👥",
  },
  {
    id: 3,
    name: "Q&A",
    label: "Q&A",
    href: "/qna",
    isActive: false,
    icon: "❓",
  },
  {
    id: 4,
    name: "Guide",
    label: "Guide",
    href: "/guide",
    isActive: false,
    icon: "📚",
  },
  {
    id: 5,
    name: "Contact",
    label: "Contact",
    href: "/contact",
    isActive: false,
    icon: "📞",
  },
];
export const sidebarItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    translationKey: 'user.sidebar.dashboard',
    icon: MdDashboard,
  },
  {
    id: 'edit-biodata',
    label: 'Edit Biodata',
    translationKey: 'user.sidebar.editBiodata',
    icon: FaUserEdit,
  },
  {
    id: 'liked-biodatas',
    label: 'Liked Biodatas',
    translationKey: 'user.sidebar.likedBiodatas',
    icon: FaHeart,
  },
  {
    id: 'unliked-biodatas',
    label: 'Unliked Biodatas',
    translationKey: 'user.sidebar.unlikedBiodatas',
    icon: IoMdHeartDislike,
  },
  {
    id: 'delete-biodatas',
    label: 'Delete Biodatas',
    translationKey: 'user.sidebar.deleteBiodatas',
    icon: FaRegTrashAlt,
  },
  {
    id: 'settings',
    label: 'Settings',
    translationKey: 'user.sidebar.settings',
    icon: IoSettings,
  },
  {
    id: 'profile',
    label: 'Profile',
    translationKey: 'user.sidebar.profile',
    icon: FaUser,
  }
];

export const formSteps = [
  { id: "general", label: "General Info", translationKey: "user.editBiodata.steps.general", icon: FaUser },
  { id: "address", label: "Address", translationKey: "user.editBiodata.steps.address", icon: FaLocationDot },
  { id: "education", label: "Education", translationKey: "user.editBiodata.steps.education", icon: FaGraduationCap },
  { id: "family", label: "Family Info", translationKey: "user.editBiodata.steps.family", icon: MdFamilyRestroom },
  { id: "personalDetails", label: "Personal Details", translationKey: "user.editBiodata.steps.personalDetails", icon: FaHeart },
  { id: "occupationalInfo", label: "Occupation", translationKey: "user.editBiodata.steps.occupationalInfo", icon: FaBriefcase },
  { id: "marriageInfo", label: "Marriage Info", translationKey: "user.editBiodata.steps.marriageInfo", icon: FaHeartCircleExclamation },
  { id: "expectedLifePartner", label: "Life Partner", translationKey: "user.editBiodata.steps.expectedLifePartner", icon: MdFaceUnlock },
  { id: "pledge", label: "Pledge", translationKey: "user.editBiodata.steps.pledge", icon: FiFileText },
  { id: "contact", label: "Contact", translationKey: "user.editBiodata.steps.contact", icon: FaPhoneAlt },
];
