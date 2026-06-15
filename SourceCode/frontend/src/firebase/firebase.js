import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8-vacnf9vTEDFW4wEFTcp99iAlSRGUe0",
  authDomain: "healthy-store-final.firebaseapp.com",
  projectId: "healthy-store-final",
  storageBucket: "healthy-store-final.firebasestorage.app",
  messagingSenderId: "1089933019524",
  appId: "1:1089933019524:web:fc2f437bfb548f9d2f75d1",
  measurementId: "G-2E0T2DDZXG"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);