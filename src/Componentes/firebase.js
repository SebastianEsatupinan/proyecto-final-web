// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5DKyVUTMagXtXvyAfwIi4azav5uArDbs",
  authDomain: "web-2corte.firebaseapp.com",
  projectId: "web-2corte",
  storageBucket: "web-2corte.appspot.com",
  messagingSenderId: "1099102894787",
  appId: "1:1099102894787:web:b9f7c779e988fa06c3c076"
};

const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase);

export { db };
export default appFirebase;
