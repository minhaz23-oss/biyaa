'use client'
import { isAuthenticated } from "@/lib/actions/auth.actions";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { setActiveTab } from "@/redux/userSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "./ui/Loader";

const CreateBioBtn = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const authStatus = await isAuthenticated();
                setLoggedIn(authStatus);
            } catch (error) {
                console.error('Error checking authentication:', error);
                setLoggedIn(false);
            } finally {
                setLoading(false);
            }
        };
        
        checkAuth();
    }, []);

    const handleCreateBio = () => {
        router.push('/user');
        dispatch(setActiveTab('edit-biodata'));
    }
  return (
    <div className=" w-full h-[250px] border-2 border-primary flex flex-col justify-center items-center rounded-xl mt-[50px] gap-3">
        <h1 lang="bn" className=" text-[40px] font-bold text-primary">আপনার বায়োডাটা তৈরি করুন</h1>
        {loading ? <Loader color="#fff" width={'10px'} height={'10px'} /> : loggedIn ? (
        
          <button onClick={handleCreateBio} className="btn-primary flex justify-center items-center rounded-full text-[25px] gap-3">
            <FaPlus className="text-[20px]" />
            create your biodata
          </button>
       
      ) : (
        <Link href="/sign-in">
          <button className="btn-primary flex justify-center items-center rounded-full text-[25px] gap-3">
            Sign in to create biodata
          </button>
        </Link>
      )}
        
        
      </div>
  )
}

export default CreateBioBtn
