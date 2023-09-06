// firebaseConfig.js
import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAI87O7WIX_JxW9HzIcnu8e7UzoufKP_Z8",
  authDomain: "oruphones-90c0b.firebaseapp.com",
  projectId: "oruphones-90c0b",
  storageBucket: "oruphones-90c0b.appspot.com",
  messagingSenderId: "729075401577",
  appId: "1:729075401577:web:b71d0148259256106a73f8",
  measurementId: "G-0RDS2XK43J",
};

const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export default storage;
