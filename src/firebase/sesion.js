import {createUserWithEmailAndPassword, 
 signInWithEmailAndPassword} from "firebase/auth"
import {doc, setDoc, getDoc} from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { auth, storage } from '../firebase/credenciales'
import { db } from '../firebase/credenciales'

export async function regUser(email, password, nombre, apellido, foto){
    const compRef = ref(storage,`usuarios/${foto.name}`)
    await uploadBytes(compRef, foto)
    const url = await getDownloadURL(compRef)
    const info = await createUserWithEmailAndPassword
    (auth, email, password).then((fireUser)=>{
      return fireUser
    })
    const docRef = doc(db,'usuario/'+info.user.uid)
    setDoc(docRef, {nombre: nombre, apellido: apellido, fotografo:false, foto:url})
}

export async function Login(email, password){
  await signInWithEmailAndPassword(auth, email, password)
}

export async function getUsuario(){
  const uid=auth.currentUser.uid
  const docRef = doc(db,'usuario/'+uid)
  const datos = await getDoc(docRef)
  console.log(datos.data(), uid)
  return datos.data()
}