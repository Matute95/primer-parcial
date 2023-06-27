import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { auth, db, storage } from "./credenciales"

export async function get(dir){
    const snaps = await getDocs(collection(db,dir))
    const coleccion = []
    snaps.forEach((snap)=>{
      coleccion.push({...snap.data(), id:snap.id}) 
    })
    return coleccion
  }

  export async function getPh(){
    const snaps = await getDocs(collection(db,"usuario"))
    const coleccion = []
    snaps.forEach((snap)=>{
      if(snap.data().fotografo===true){
        coleccion.push({...snap.data(), id:snap.id}) 
      }
    })
    return coleccion
  }
  
export async function filtro(id){
  const snaps = await getDocs(collection(db,"foto"))
  const coleccion = []
    snaps.forEach((snap)=>{
      if(snap.data().privacidad==="publico"){
        if(id===snap.data().evento || id===snap.data().fotografo || id==="todo"){
          coleccion.push({...snap.data(), id:snap.id}) 
        }
      }
    })
  return coleccion
}

export async function privado(id){
  const snaps = await getDocs(collection(db,"foto"))
  const coleccion = []
  snaps.forEach((snap)=>{
    if(snap.data().id_evento===id){
      coleccion.push({...snap.data(), id:snap.id}) 
    }
  })
  return coleccion
}

export function borrar(foto){
  deleteDoc(doc(db, "foto", foto.id))
  storage.collection("aplicacion").doc(foto.nombre).delete()
}

export function download(nombre){
  console.log(nombre)
  getDownloadURL(ref(storage, 'aplicacion/'+nombre))
  .then((url) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();
  })
}

export async function subscribir(plan, precio){
  const user = auth.currentUser.uid
  await updateDoc(doc(db, "usuario", user),{
    fotografo: true
  })
  const hoy = new Date();
  await addDoc(collection(db,"subscripcion"),{
    tipo: plan,
    precio: precio,
    fecha: hoy.toLocaleDateString(),
    id_fotografo: user
  })
}

export async function phEventos(){
  const eventos = await get('evento')
  const coleccion = []
  eventos.forEach(async (evento)=>{
    if(evento.fotografos.length>0){
      evento.fotografos.forEach((fotografo)=>{
        if(fotografo===auth.currentUser.uid){
          coleccion.push(evento)
        }
      })
    }
  })
  return coleccion
}

export async function aceptarPh(id){
  const evento = await getDoc(doc(db,"evento",id))
  const fotografos = evento.data().fotografos
  fotografos.push(auth.currentUser.uid)
  await updateDoc(doc(db, "evento", id),{
    fotografos: fotografos
  })
}

export async function Peticiones(){
  const eventos = await get('evento')
  const uid = auth.currentUser.uid
  const coleccion = []
  eventos.forEach(async (evento)=>{
    if(evento.phMax>evento.fotografos.length || evento.phMax<1){
      if(!evento.fotografos.includes(uid)){
        coleccion.push(evento)
      }
    }
  })
  return coleccion
}

export async function fotosPh(){
  const uid = auth.currentUser.uid
  const fotos = await get("foto")
  const retorno = []
  fotos.forEach(async(foto)=>{
    if (foto.id_fotografo===uid){
      retorno.push(foto)
    }
  })
  return retorno
}

export async function subirFoto(precio, evento, url, file){
  const uid = auth.currentUser.uid
  const user = await getDoc(doc(db,"usuario/"+uid))
  const ph = await user.data().nombre
  const compRef = ref(storage,`mostrar/${file.path}`)
  const blob = await comprimirImagen(file)
  await uploadBytes(compRef, blob)
  const url2 = await getDownloadURL(compRef)
  const id = await addDoc(collection(db,"foto"),{ 
    nombre: file.path,
    precio: precio,
    evento: evento.nombre,
    fecha: evento.fecha,
    direccion: url,
    mostrar: url2,
    id_fotografo: uid, 
    id_evento: evento.id,
    fotografo: ph,
    privacidad: evento.privacidad
  })
  return id.id
}

const comprimirImagen = (file) => {
  return new Promise((resolve, reject) => {
    const $canvas = document.createElement("canvas");
    const imagen = new Image();
    imagen.onload = () => {
      $canvas.width = imagen.width;
      $canvas.height = imagen.height;
      $canvas.getContext("2d").drawImage(imagen, 0, 0);
      $canvas.toBlob(
        (blob) => {
          if (blob === null) {
            return reject(blob);
          } else {
            resolve(blob);
          }
        },
        "image/jpeg",
        10/100
      );
    };
    imagen.src = URL.createObjectURL(file);
  });
};

export async function subirEvento(nombre, fecha, hora, direccion, ubicacion, afiche, concurrencia, phMax, descripcion, privacidad){
    if(!afiche){afiche={name:"https://firebasestorage.googleapis.com/v0/b/primer-parcial-5465d.appspot.com/o/evento%2F404.jpg?alt=media&token=2488218e-46c0-4d60-98e1-294c2c65f8cb"}}
    const imageRef = ref(storage,`evento/${afiche.name}`)
    await uploadBytes(imageRef, afiche)
    const url = await getDownloadURL(imageRef)
    const id = await addDoc(collection(db, "evento"),{
    nombre: nombre,
    fecha: fecha,
    hora: hora,
    ubicacion: ubicacion,
    afiche: url,
    direccion: direccion,
    concurrencia: concurrencia,
    phMax: parseInt(phMax),
    descripcion: descripcion,
    fotografos: [],
    privacidad: privacidad
  })
  return id.id
}