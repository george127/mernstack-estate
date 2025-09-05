// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mernproject-919e4.firebaseapp.com",
  databaseURL: "https://mernproject-919e4-default-rtdb.firebaseio.com",
  projectId: "mernproject-919e4",
  storageBucket: "mernproject-919e4.firebasestorage.app",
  messagingSenderId: "981952093507",
  appId: "1:981952093507:web:19c5acb2bd00249d0263f6",
  measurementId: "G-SDCX0JMZX3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
