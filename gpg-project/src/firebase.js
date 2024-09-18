// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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