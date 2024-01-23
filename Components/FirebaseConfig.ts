// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4RXm6gcIIbd9oD353ggtmyZvQ9_xqgfE",
  authDomain: "books-store-cf637.firebaseapp.com",
  projectId: "books-store-cf637",
  storageBucket: "books-store-cf637.appspot.com",
  messagingSenderId: "979521315930",
  appId: "1:979521315930:web:26b69141ed2ef9173ce463",
  measurementId: "G-EYRHHPSFGW"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);