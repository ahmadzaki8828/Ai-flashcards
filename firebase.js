// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "flashcards-f3731.firebaseapp.com",
  projectId: "flashcards-f3731",
  storageBucket: "flashcards-f3731.appspot.com",
  messagingSenderId: "496517514513",
  appId: "1:496517514513:web:45dc465bf5cb3defcdf8b0",
  measurementId: "G-QYLSHK3PTV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
