import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCiibKOTeelbYBaw_p8Xalu_CV1_RQCMK8",
  authDomain: "dashboard-app-d4e20.firebaseapp.com",
  projectId: "dashboard-app-d4e20",
  storageBucket: "dashboard-app-d4e20.appspot.com",
  messagingSenderId: "392947081139",
  appId: "1:392947081139:web:6f81cdc56ad137a7ddf5c6",
  measurementId: "G-DGNEMF16R2"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
