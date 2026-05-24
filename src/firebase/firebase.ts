import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsa4qXixdV_JuEImKvPeWjV44yQMkfYtI",
  authDomain: "rjcc-church-management.firebaseapp.com",
  projectId: "rjcc-church-management",
  storageBucket: "rjcc-church-management.firebasestorage.app",
  messagingSenderId: "146482650268",
  appId: "1:146482650268:web:a658200ea8591924dd6159"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const loginWithEmail = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const demoLogin = async (role: string) => {
  // Mock implementation for instant demo access
  return { success: true };
};