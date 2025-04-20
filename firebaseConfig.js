// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCWR4jyoZLs_Zxr4awGokeaqd-_cLUJu9w",
  authDomain: "cookease-eb3c6.firebaseapp.com",
  projectId: "cookease-eb3c6",
  storageBucket: "cookease-eb3c6.firebasestorage.app",
  messagingSenderId: "838279150450",
  appId: "1:838279150450:web:aa6246fa88c1ad0ad27beb",
  measurementId: "G-JBGBKLS0GT"
};
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);