import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCG-DqrcfSVwAW5h_dLdPjKD98_aH7QQGc",
  authDomain: "reddit-clone-bbf38.firebaseapp.com",
  projectId: "reddit-clone-bbf38",
  storageBucket: "reddit-clone-bbf38.appspot.com",
  messagingSenderId: "639801013371",
  appId: "1:639801013371:web:7c50c64402e3efc99a9ede",
  measurementId: "G-J1DEVYG2YW",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
