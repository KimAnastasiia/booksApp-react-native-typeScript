// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwHxY8TErsVgVrjGyeLYwRJAMeqfJvWNE",
  authDomain: "books-store-4d6d7.firebaseapp.com",
  projectId: "books-store-4d6d7",
  storageBucket: "books-store-4d6d7.appspot.com",
  messagingSenderId: "109986577361",
  appId: "1:109986577361:web:b922c4be56fdc6b7b63ef0",
  measurementId: "G-EYRHHPSFGW"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);