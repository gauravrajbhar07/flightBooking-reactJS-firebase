import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB3FcLFhrMaBGo7OjzybL75MMvKM8a7_mg",
  authDomain: "flight-booking-50bcc.firebaseapp.com",
  projectId: "flight-booking-50bcc",
  storageBucket: "flight-booking-50bcc.appspot.com",
  messagingSenderId: "753509735258",
  appId: "1:753509735258:web:4ed2de54636d8411aff163",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
