// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-82cfc.firebaseapp.com",
  projectId: "mern-estate-82cfc",
  storageBucket: "mern-estate-82cfc.appspot.com",
  messagingSenderId: "803062241998",
  appId: "1:803062241998:web:0153e8bf5d50efc9604e9f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);