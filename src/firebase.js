// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import{getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBD0u5EUwQ7UDJ_-ezIPZ5T335lyYbewjY",
  authDomain: "nxt-movie-f384a.firebaseapp.com",
  projectId: "nxt-movie-f384a",
  storageBucket: "nxt-movie-f384a.firebasestorage.app",
  messagingSenderId: "301265241416",
  appId: "1:301265241416:web:0a5334ac3e134099841f7d",
  measurementId: "G-XVNKQ761VQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;

