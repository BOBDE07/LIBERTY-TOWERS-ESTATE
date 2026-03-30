// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-4e324.firebaseapp.com",
  projectId: "real-estate-4e324",
  storageBucket: "real-estate-4e324.firebasestorage.app",
  messagingSenderId: "293374816740",
  appId: "1:293374816740:web:9230b2c59d17ea95eb17f1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);