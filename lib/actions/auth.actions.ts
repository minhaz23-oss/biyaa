"use server";
import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7 * 1000;

export async function signUp(params: SignUpParams) {
  const { uid, email, name } = params;
  try {
    const userRecord = await db.collection("users").doc(uid).get();

    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists. please sign in instead",
      };
    }

    await db.collection("users").doc(uid).set({
      email,
      name,
    });

    return {
      success: true,
      message: "Account created successfully. please sign in",
    };
  } catch (e: any) {
    console.log(e);
    if (e.code === "auth/email-already-exists") {
      return {
        success: false,
        message: "Email already in use",
      };
    }
    return {
      success: false,
      message: "Failed to create an account",
    };
  }
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();
  try {
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: ONE_WEEK,
    });

    cookieStore.set("session", sessionCookie, {
      maxAge: ONE_WEEK,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });
  } catch (error) {
    console.error("Error creating session cookie:", error);
    throw error;
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;
  try {
    const useRecord = await auth.getUserByEmail(email);
    if (!useRecord) {
      return {
        success: false,
        message: "User not found",
      };
    }
    await setSessionCookie(idToken);
    
    return {
      success: true,
      message: "Sign in successful",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to sign in",
    };
  }
}

export async function signInWithGoogle(params: SignInWithGoogle) {
  const { uid, name, email, idToken } = params;
  try {
    // First, verify the ID token
    const decodedToken = await auth.verifyIdToken(idToken);
    
    // Check if the UID matches
    if (decodedToken.uid !== uid) {
      return {
        success: false,
        message: "Invalid token: UID mismatch",
      };
    }

    // Check if user exists in Firestore
    const userRecord = await db.collection("users").doc(uid).get();

    if (!userRecord.exists) {
      // Create new user in Firestore
      await db.collection("users").doc(uid).set({
        name,
        email,
        provider: "google",
        createdAt: new Date().toISOString(),
      });
    }

    // Create session cookie
    await setSessionCookie(idToken);

    return {
      success: true,
      message: "successful",
    };
  } catch (error: any) {
    console.error("signInWithGoogle error:", error);
    
    // Handle specific Firebase Auth errors
    if (error.code === 'auth/id-token-expired') {
      return {
        success: false,
        message: "Token expired. Please sign in again.",
      };
    }
    
    if (error.code === 'auth/invalid-id-token') {
      return {
        success: false,
        message: "Invalid authentication token.",
      };
    }
    
    return {
      success: false,
      message: "Authentication failed. Please try again.",
    };
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    if (!sessionCookie) {
      return null;
    }

    //verify session cookie
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    //get user from firestore
    const user = await db.collection("users").doc(decodedClaims.uid).get();
    if (!user.exists) {
      return null;
    }

    const userData = user.data();
    
    // Serialize any Firestore timestamps
    const serializedUserData = {
      ...userData,
      id: user.id,
      // Convert any Firestore timestamps to ISO strings
      ...(userData?.createdAt && {
        createdAt: userData.createdAt._seconds 
          ? new Date(userData.createdAt._seconds * 1000).toISOString()
          : userData.createdAt
      }),
      ...(userData?.updatedAt && {
        updatedAt: userData.updatedAt._seconds 
          ? new Date(userData.updatedAt._seconds * 1000).toISOString()
          : userData.updatedAt
      })
    };

    return serializedUserData as User;
  } catch (error: any) {
    console.log("error verifying session:", error.message);
    
    // If session cookie is expired or invalid, clear it
    if (error.code === 'auth/session-cookie-expired' || error.code === 'auth/invalid-session-cookie') {
      try {
        const cookieStore = await cookies();
        cookieStore.delete("session");
      } catch (cookieError) {
        console.error("Error clearing invalid session cookie:", cookieError);
      }
    }
    
    return null;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}



export async function signOut() {
  try {
    const cookieStore = await cookies();

    cookieStore.set("session", "", {
      expires: new Date(0),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });

    return {
      success: true,
      message: "Logged out successfully",
    };
  } catch (error) {
    console.error("Error during logout:", error);
    return {
      success: false,
      message: "Failed to sign out",
    };
  }
}
