"use client";

import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormField from "./FormField";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/firebase/client";
import { useRouter } from "next/navigation";
import { signUp, signInWithGoogle } from "@/lib/actions/auth.actions";
import { signIn } from "@/lib/actions/auth.actions";
import Link from "next/link";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
    confirmPassword:
      type === "sign-up" ? z.string().min(3) : z.string().optional(),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const formSchema = authFormSchema(type);
  const router = useRouter();
  const { t, fontClass } = useLanguage();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if(type === "sign-up"){

      if (values.password !== values.confirmPassword) {
        window.alert("Password and Confirm Password do not match");
        return;
      }
    }
    try {
      if (type === "sign-up") {
        const { email, password, name } = values;
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await signUp({
          uid: userCredentials.user.uid,
          email,
          password,
          name: name!,
        });

        if (!result?.success) {
          return;
        }

        router.push("/sign-in");
      } else {
        const { email, password } = values;
        const userCredentials = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const idToken = await userCredentials.user.getIdToken();

        if (!idToken) {
          toast.error("failed to sign in");
          return;
        }

        const result = await signIn({
          email,
          idToken,
        });
        
        if (!result?.success) {
          toast.error(result?.message || "Failed to sign in");
          return;
        }

        console.log("sign in successfully");
        router.push("/");
      }
    } catch (error) {
      window.alert("threre was an error" + error);
    }
  }
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      
      // Add additional scopes if needed
      provider.addScope('email');
      provider.addScope('profile');
      
      const userCredentials = await signInWithPopup(auth, provider);
      const idToken = await userCredentials.user.getIdToken(true); // Force refresh
      
      if (!idToken) {
        console.error("No ID token received from Google authentication");
        window.alert("Authentication failed. Please try again.");
        return;
      }
      
      const { uid, displayName, email } = userCredentials.user;
      
      if (!email) {
        console.error("No email received from Google authentication");
        window.alert("Unable to get email from Google. Please try again.");
        return;
      }
      
      const result = await signInWithGoogle({
        uid,
        name: displayName || "",
        email: email,
        idToken
      });

      if (!result?.success) {
        console.error("Server-side authentication failed:", result?.message);
        window.alert(result?.message || "Authentication failed. Please try again.");
        return;
      }
      
      console.log("Google sign-in successful");
      router.push('/');
      
    } catch (error: any) {
      console.error("Google sign-in error:", error);
      
      // Handle specific Firebase Auth errors
      if (error.code === 'auth/popup-closed-by-user') {
        window.alert("Sign-in was cancelled. Please try again.");
      } else if (error.code === 'auth/popup-blocked') {
        window.alert("Popup was blocked. Please allow popups and try again.");
      } else if (error.code === 'auth/network-request-failed') {
        window.alert("Network error. Please check your connection and try again.");
      } else {
        window.alert("Google sign-in failed. Please try again.");
      }
    }
  };
  return (
    <div className=" w-full h-screen flex flex-col gap-3 items-center py-5">
      <div className=" flex flex-col gap-2">
        <h1 className={`text-3xl font-regular text-center ${fontClass}`}>
          {type === "sign-in" ? t('auth.signInTitle') : t('auth.signUpTitle')}
        </h1>
        <h1 className={`text-2xl font-regular text-center text-gray-500 ${fontClass}`}>
          {type === "sign-in" ? t('auth.signInSubtitle') : t('auth.signUpSubtitle')}
        </h1>
      </div>
      <div className=" min-w-[780px] bg-primary/50 h-fit flex rounded-lg overflow-hidden">
        <div className=" w-fit h-fit  relative">
          <Image
            src="/images/loveletter.png"
            alt="auth-bg"
            width={350}
            height={450}
            className=" object-cover"
          />
        </div>
        <div className=" w-[calc(100%-350px)] h-full  relative">
          <div className=" w-full h-full flex flex-col gap-2  text-black font-regular text-[18px] px-5 py-4">
            <h1 className=" text-gray-500 font-bold text-[30px] text-center leading-none">
              Biyaa.com
            </h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3 w-full mt-4 form"
              >
                {type === "sign-up" && (
                  <FormField
                    control={form.control}
                    name="name"
                    label={t('auth.name')}
                    placeholder={t('auth.namePlaceholder')}
                    type="name"
                  />
                )}
                <FormField
                  control={form.control}
                  name="email"
                  label={t('auth.email')}
                  placeholder={t('auth.emailPlaceholder')}
                  type="email"
                />
                <FormField
                  control={form.control}
                  name="password"
                  label={t('auth.password')}
                  placeholder={t('auth.passwordPlaceholder')}
                  type="password"
                />
                {type === "sign-up" && (
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    label={t('auth.confirmPassword')}
                    placeholder={t('auth.confirmPasswordPlaceholder')}
                    type="password"
                  />
                )}
                <Button className="btn-primary w-full" type="submit">
                  {type === "sign-in" ? t('auth.signInButton') : t('auth.signUpButton')}
                </Button>
              </form>
            </Form>
            <div className="mt-2">
              <div className="relative flex items-center justify-center">
                <span className="absolute px-2 text-sm text-black font-bold">
                  {t('auth.or')}
                </span>
              </div>

              <Button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full mt-4 flex items-center justify-center gap-2 bg-white text-black font-semibold cursor-pointer hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="20px"
                  height="20px"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                </svg>
                {t('auth.continueWithGoogle')}
              </Button>
            </div>
            <h1 className={`text-black text-center text-[16px] ${fontClass}`}>
              {type === "sign-up" ? t('auth.alreadyHaveAccount') : t('auth.dontHaveAccount')}
              <Link href={`${type === "sign-up" ? "/sign-in" : "/sign-up"}`} className=" text-blue-500 font-bold ">
                {type === "sign-up" ? t('auth.signInLink') : t('auth.signUpLink')}
              </Link>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
