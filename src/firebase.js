import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDf8YD9F3GyiwgxlyCWoMETfyVSM22JN8",
  authDomain: "myfinancetracker-fada3.firebaseapp.com",
  projectId: "myfinancetracker-fada3",
  storageBucket: "myfinancetracker-fada3.firebasestorage.app",
  messagingSenderId: "1090385819729",
  appId: "1:1090385819729:web:a586b75d1ffa88bf172070",
  measurementId: "G-LXVHYTJTTM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {
db, auth, provider, doc, setDoc
};    