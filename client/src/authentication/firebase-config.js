// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPtw-gP6RyAn2isMN6_6oio3y9zxLN1x8",
  authDomain: "navnitam-1cfa9.firebaseapp.com",
  projectId: "navnitam-1cfa9",
  storageBucket: "navnitam-1cfa9.appspot.com",
  messagingSenderId: "67611751632",
  appId: "1:67611751632:web:8c36870a8e8ff5b9665ad5",
  measurementId: "G-F0HGN4XLTL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
