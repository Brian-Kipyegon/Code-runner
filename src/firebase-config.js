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
  apiKey: "AIzaSyAWrxrhVo5JQ9FLZLCDhT5c_lLkqu-tdfY",
  authDomain: "code-runner-1caca.firebaseapp.com",
  projectId: "code-runner-1caca",
  storageBucket: "code-runner-1caca.appspot.com",
  messagingSenderId: "29449915647",
  appId: "1:29449915647:web:bf74f713dd8fcfc74110ca",
  measurementId: "G-P4VRQYG63S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, { persistence: browserSessionPersistence });
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };