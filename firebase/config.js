// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics, isSupported } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: "506855800201",
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: "G-GQGNHXP41R",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);
const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage, app };

// # firebase

// # Next auth jwt secret
// NEXTAUTH_SECRET= ghc@india_iitm_2024
