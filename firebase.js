// // Import the functions you need from the SDKs you need
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { initializeAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

//@ts-ignore
import { getReactNativePersistence } from '@firebase/auth/dist/rn/index.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyhJ0oMOY46Z8Zay5kjchCTJkFdQUf3fI",
  authDomain: "lets-go-e0eb8.firebaseapp.com",
  projectId: "lets-go-e0eb8",
  storageBucket: "lets-go-e0eb8.firebasestorage.app",
  messagingSenderId: "6799887660",
  appId: "1:6799887660:web:d3ab80f0c7f18e0c467089",
  measurementId: "G-HK04KV03NM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export const db = getFirestore(app);
