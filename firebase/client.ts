import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: "biyaa-6ed8f.firebaseapp.com",
  projectId: "biyaa-6ed8f",
  storageBucket: "biyaa-6ed8f.firebasestorage.app",
  messagingSenderId: "143339743278",
  appId: "1:143339743278:web:c72954be8975bc2f6bd7bf",
  measurementId: "G-TFL4WTMK5Z"
};

// Initialize Firebase
let app;
try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  console.log('Firebase client initialized successfully');
} catch (error) {
  console.error('Firebase client initialization error:', error);
  throw error;
}

export const auth = getAuth(app);
export const db = getFirestore(app);
