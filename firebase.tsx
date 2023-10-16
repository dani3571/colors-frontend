
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRBS3tOo1905JdDorAWJC5EP8TGYNGCdg",
  authDomain: "colors-frontend.firebaseapp.com",
  projectId: "colors-frontend",
  storageBucket: "colors-frontend.appspot.com",
  messagingSenderId: "349796721827",
  appId: "1:349796721827:web:c572ce5ef109fabf1e4b16",
};

export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();
export const initFireBase = () => {
  return app;
};
export { db, auth, provider };
