// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
const firebaseConfig = {
  apiKey: "AIzaSyCsLkA2-oUJFaCW7kA5tkMuqemDPfS9INw",
  authDomain: "alumnidekho-2fd65.firebaseapp.com",
  projectId: "alumnidekho-2fd65",
  storageBucket: "alumnidekho-2fd65.appspot.com",
  messagingSenderId: "816540763282",
  appId: "1:816540763282:web:d4cb4af56673332e22d24b",
  measurementId: "G-WSWB08XKQV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);