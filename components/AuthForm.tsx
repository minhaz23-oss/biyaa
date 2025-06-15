"use client";

import Image from "next/image";

const AuthForm = ({ type }: { type: FormType }) => {
  return (
    <div className=" w-full h-screen flex flex-col gap-5 items-center justify-center">
      <div className=" flex flex-col gap-2">
        <h1 lang="bn" className=" text-3xl font-regular text-center">
          {type === "sign-in"
            ? "আপনার অ্যাকাউন্ট এ লগইন  করুন"
            : "অ্যাকাউন্ট তৈরি করুন"}
        </h1>
        <h1 className=" text-2xl font-regular text-center text-gray-500">
          {type === "sign-in" ? "(Log in your account)" : "(Create an account)"}
        </h1>
      </div>
      <div className=" min-w-[750px] bg-primary/50 h-[450px] flex rounded-lg overflow-hidden">
        <div className=" w-1/2 h-full  relative">
          <Image
            src="/images/loveletter.png"
            alt="auth-bg"
            width={350}
            height={450}
            className=" object-cover"
          />
        </div>
        <div className=" w-1/2 h-full  relative">
        
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
