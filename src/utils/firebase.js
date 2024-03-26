// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6gZvaaez3DTZaCDzJA_TteOmafsL5q0k",
  authDomain: "netflix-gpt-6d0a5.firebaseapp.com",
  projectId: "netflix-gpt-6d0a5",
  storageBucket: "netflix-gpt-6d0a5.appspot.com",
  messagingSenderId: "516681069755",
  appId: "1:516681069755:web:a2e80906a00e289776a59e",
  measurementId: "G-7W3KX6HWV0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();