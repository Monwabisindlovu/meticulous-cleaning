// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // for Firestore
import { getAnalytics } from "firebase/analytics"; // optional

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAej-dT13byvqxnEV0fWltAu3naEfGyn40",
  authDomain: "meticulous-bookings.firebaseapp.com",
  projectId: "meticulous-bookings",
  storageBucket: "meticulous-bookings.appspot.com",
  messagingSenderId: "633280551405",
  appId: "1:633280551405:web:dc6116c6cb54f48bf46fe4",
  measurementId: "G-6XCELDJTQ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // for Firestore
const analytics = getAnalytics(app); // optional

export { db };
