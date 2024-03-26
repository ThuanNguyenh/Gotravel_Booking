// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdvbEvSYcIxDP4NAwzQ_To4Cr6joeOM2U",
  authDomain: "web-travel-eb829.firebaseapp.com",
  projectId: "web-travel-eb829",
  storageBucket: "web-travel-eb829.appspot.com",
  messagingSenderId: "293689938652",
  appId: "1:293689938652:web:86a99cc3ccd209ffef1a19",
  measurementId: "G-E0J3ZPG59V"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export default app;
