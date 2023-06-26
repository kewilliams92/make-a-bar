import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9VKveu-04JwX6IH0UFVNdtfgiOT0lP4A",
  authDomain: "make-a-bar.firebaseapp.com",
  projectId: "make-a-bar",
  storageBucket: "make-a-bar.appspot.com",
  messagingSenderId: "119049733958",
  appId: "1:119049733958:web:8553622595b908150d0747"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const firebaseAuth = getAuth(app);