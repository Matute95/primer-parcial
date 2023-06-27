import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { getMessaging } from "firebase/messaging"

const firebaseConfig = {
  apiKey: "AIzaSyD1eDk-uMOiZLne9uIcaTHpDeB5XzDKIuo",
  authDomain: "parcial-app-c20a0.firebaseapp.com",
  projectId: "parcial-app-c20a0",
  storageBucket: "parcial-app-c20a0.appspot.com",
  messagingSenderId: "678140661507",
  appId: "1:678140661507:web:0cb8f8dc1632174e41a336",
  measurementId: "G-H1Q060W831"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const messaging = getMessaging(app)

export default app