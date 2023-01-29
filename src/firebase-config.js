// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, browserSessionPersistence } from 'firebase/auth';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUJJnsDV3sjQMbg4g8Y2b_rYMyDXsVLQg",
  authDomain: "ai21-hackathon.firebaseapp.com",
  projectId: "ai21-hackathon",
  storageBucket: "ai21-hackathon.appspot.com",
  messagingSenderId: "652092554432",
  appId: "1:652092554432:web:9288d417c4b34f18628125",
  measurementId: "G-YYVCCM9G2X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, { persistence: browserSessionPersistence });
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { auth, db, storage };