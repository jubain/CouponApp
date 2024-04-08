// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDc0Ri66f8FUQ9NoxFjSO98Y6O2tybD_YU",
  authDomain: "coupon-8453a.firebaseapp.com",
  projectId: "coupon-8453a",
  storageBucket: "coupon-8453a.appspot.com",
  messagingSenderId: "1033460121120",
  appId: "1:1033460121120:web:5e2172352c4f8aa58c0645",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
