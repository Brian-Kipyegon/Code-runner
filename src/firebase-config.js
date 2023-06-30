// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, browserSessionPersistence } from 'firebase/auth';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtuKuR9k0vKWBAuN0W0d-jLsFA59cBlOY",
  authDomain: "code-runner-fdd35.firebaseapp.com",
  projectId: "code-runner-fdd35",
  storageBucket: "code-runner-fdd35.appspot.com",
  messagingSenderId: "579780544398",
  appId: "1:579780544398:web:017d4fcc6db9b5f8a8c6df",
  measurementId: "G-HTMXPRLVY4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, { persistence: browserSessionPersistence });
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };