import { CgGenderMale } from "react-icons/cg";
import { IoMdArrowDropdown } from "react-icons/io";
import { GiCharacter } from "react-icons/gi";
import { FaLocationDot } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
export default function Home() {
  return (
    <div className="bg-[url('/images/wedding.png')] bg-cover grayscale-20 h-[500px] rounded-2xl px-[50px] py-[60px] text-white relative before:content-[''] before:absolute before:inset-0 before:bg-black/15 before:rounded-2xl">
      <div className="relative z-10">
        <h1
          lang="bn"
          className="text-[50px] font-bold text-gradient-primary h-fit max-w-[550px] leading-tight"
        >
          আপনার জীবনের নতুন অধ্যায় শুরু হোক আজই
        </h1>
        <p
          lang="bn"
          className="text-[25px] font-regular text-primary-light max-w-[500px]"
        >
          পাত্রী খোঁজার ঝামেলা আর নয়। এখন নিজ জেলায় খুঁজুন আপনার পছন্দের
          পাত্রী ।
        </p>
      </div>
      <div className=" z-10 absolute bottom-10 left-1/2 transform -translate-x-1/2 min-w-[900px] bg-white h-[60px] rounded-lg text-gray p-10 flex items-center gap-20">
         <div className=" flex gap-3 items-center w-fit">
            <CgGenderMale className=" text-[20px]" />
            <h1 className=" text-[20px] font-semibold">Gender</h1>
            <IoMdArrowDropdown className=" text-[20px]" />
         </div>
         <div className=" flex gap-3 items-center w-fit">
            <GiCharacter className=" text-[20px]" />
            <h1 className=" text-[20px] font-semibold text-nowrap">Marital Status</h1>
            <IoMdArrowDropdown className=" text-[20px]" />
         </div>
         <div className=" flex gap-3 items-center w-fit">
            <FaLocationDot className=" text-[20px]" />
            <h1 className=" text-[20px] font-semibold">Location</h1>
            <IoMdArrowDropdown className=" text-[20px]" />
         </div>
         <button className=" flex items-center gap-3 btn-primary text-white px-4 py-2 rounded-md">
          <FaSearch className=" text-[20px]" />
          Search
         </button>
      </div>
    </div>
  );
}
