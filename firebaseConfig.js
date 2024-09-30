// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRuwlvR_9XoGbd7hHO1xPFD4nhBIuG9VE",
  authDomain: "habit-tracker-42b3a.firebaseapp.com",
  projectId: "habit-tracker-42b3a",
  storageBucket: "habit-tracker-42b3a.appspot.com",
  messagingSenderId: "388542168091",
  appId: "1:388542168091:web:eb3753e1a16a0d26158cbe",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
