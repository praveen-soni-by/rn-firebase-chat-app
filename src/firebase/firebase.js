import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
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

export const login = (email, password) => {
  return signInWithEmailAndPassword(getAuth(), email, password)
}
export const signup = (email, password) => {
  return createUserWithEmailAndPassword(getAuth(), email, password)
}
export const auth = getAuth();
export const database = getFirestore();

// export default new FireBase();