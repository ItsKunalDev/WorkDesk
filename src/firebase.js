import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAguAOZfTiS3y-y_B6jVmrbRpiKNgMZSns",
  authDomain: "lumina-9c7e8.firebaseapp.com",
  projectId: "lumina-9c7e8",
  storageBucket: "lumina-9c7e8.firebasestorage.app",
  messagingSenderId: "449098973175",
  appId: "1:449098973175:web:d225afc00da7778044f8f2",
  measurementId: "G-5CFJ85KM83"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
