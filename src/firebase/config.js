import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyARb2Fmo9Fe8oSszemulrWdssQKOUJ63zo",
  authDomain: "deal-printing-bf5b3.firebaseapp.com",
  projectId: "deal-printing-bf5b3",
  storageBucket: "deal-printing-bf5b3.appspot.com", // <- pastikan ini
  messagingSenderId: "526813141034",
  appId: "1:526813141034:web:b6d5f9c406fd9eda44cb53"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
