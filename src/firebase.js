// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase web app configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaPXkKR_j-4Kz54voIFMyZERr6pRlCccg",
  authDomain: "vagabond-roommate.firebaseapp.com",
  projectId: "vagabond-roommate",
  storageBucket: "vagabond-roommate.firebasestorage.app",
  messagingSenderId: "903910833704",
  appId: "1:903910833704:web:e40ff809ab7d2cecbb7f1d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);