import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { getMessaging } from "firebase/messaging"

const firebaseConfig = {
  apiKey: "AIzaSyAkhXyxivQoKZHNuyH8pfY_4p_nyzzl-mw",
  authDomain: "primer-parcial-5465d.firebaseapp.com",
  projectId: "primer-parcial-5465d",
  storageBucket: "primer-parcial-5465d.appspot.com",
  messagingSenderId: "514934316631",
  appId: "1:514934316631:web:b41e7ed31329bb1c934d12",
  measurementId: "G-LGQ3RHRCSJ"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const messaging = getMessaging(app)

export default app