
import React, { ReactNode } from "react";
import { isAuthenticated } from "@/lib/actions/auth.actions";
import { redirect } from "next/navigation";
import UserContent from "@/components/userComponents/UserContent";

const UserLayout = async ({ children }: { children: ReactNode }) => {
  // Check if the user is authenticated
  const isAuth = await isAuthenticated();
  if (!isAuth) {
    // If not authenticated, redirect to the login page
    redirect("/sign-in");
  }
 
  return (
    <UserContent>
      {children}
    </UserContent>
  );
};

export default UserLayout;
