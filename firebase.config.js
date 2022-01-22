// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLP0KGri5oBxoYebyIsHQoQcYIGZHpMEQ",
  authDomain: "house-marketplace-projec-299ee.firebaseapp.com",
  projectId: "house-marketplace-projec-299ee",
  storageBucket: "house-marketplace-projec-299ee.appspot.com",
  messagingSenderId: "717148079349",
  appId: "1:717148079349:web:f4c90a4b10ce5a514b71bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();