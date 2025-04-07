
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAMb3FLEHCRSCitWfzgWKGfxR0jnnXjxrI",
  authDomain: "mtm6404-contact-book-rea-36944.firebaseapp.com",
  projectId: "mtm6404-contact-book-rea-36944",
  storageBucket: "mtm6404-contact-book-rea-36944.firebasestorage.app",
  messagingSenderId: "472049407211",
  appId: "1:472049407211:web:ef04b74883e1f47b979aae",
  measurementId: "G-72S9EZV3L4"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore();

export default db;