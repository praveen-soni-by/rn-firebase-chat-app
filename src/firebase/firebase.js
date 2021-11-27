import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "1:7d414",
};

initializeApp(firebaseConfig);

export const auth = getAuth();
export const database = getFirestore();

// export default new FireBase();