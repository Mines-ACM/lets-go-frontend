// // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxJ3TH6KeAmC9907_AILgvLyfUqhcjf9Y",
  authDomain: "lets-go-e0eb8.firebaseapp.com",
  projectId: "lets-go-e0eb8",
  storageBucket: "lets-go-e0eb8.appspot.com",
  messagingSenderId: "6799887660",
  appId: "1:6799887660:web:d2906b5b31201d30467089",
  measurementId: "G-8Z2QC300MK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

let analytics;

if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    // Auth persistence set to 'local'
  })
  .catch((error) => {
    console.error("Error setting persistence: ", error);
  });

export { analytics };