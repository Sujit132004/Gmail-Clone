// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJd63C_MwebP_VzsWjCoMHZ63LeTEYCfE",
  authDomain: "clone-sk-eace6.firebaseapp.com",
  projectId: "clone-sk-eace6",
  storageBucket: "clone-sk-eace6.firebasestorage.app",
  messagingSenderId: "705297867762",
  appId: "1:705297867762:web:d40ff38739caf4c695c16b",
  measurementId: "G-C76P8G44QX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth=getAuth(app);
export const db=getFirestore(app);
//provider matlab ki kisse login krna hai woh ye batata hai eg login with google ,login with facebook etc
export const provider= new GoogleAuthProvider();