import Navbar from './components/navbar'
import Products from './components/products'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import CheckoutPage from './components/checkoutPage'
import SignIn from './components/SingIn'
import SignUp from './components/SingUp'
import { useEffect } from 'react'
import { actionTypes } from './reducer'
import {useStateValue} from "./StateProvider"
import Phindex from './components/fotografo/phIndex'
import { auth } from './firebase/credenciales'
import Checkout from './components/checkoutForm/Checkout'
import Evento from './components/evento'
import QrEvento from './components/checkoutForm/qr'
import Perfil from './components/perfil'
import Mostrar from './components/mostrar'

function App() {
  const [{user}, dispatch] = useStateValue()
  useEffect(()=>{
    auth.onAuthStateChanged((fireUser) =>{
      if (fireUser){
        dispatch({
          type: actionTypes.SET_USER,
          user: fireUser
        })
      }
    })
  },[])

  return (
    <BrowserRouter>
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Products/>} />
        <Route path="/Carrito" element={<CheckoutPage />} />
        <Route path="/SingIn" element={<SignIn />} />
        <Route path="/SingUp" element={<SignUp />} />
        <Route path="/Comprar" element={<Checkout />} />
        <Route path="/:tipo/:id" element={<Products/>} />
        <Route path="/Evento/:id" element={<QrEvento/>} />
        <Route path="/Mostrar/:id" element={<Mostrar/>} />
        <Route path="/Fotografo" element={user?<Phindex/>:<SignIn/>} />
        <Route path="/Usuario" element={user?<Perfil/>:<SignIn />} />
        <Route path="/Evento" element={user?<Evento/>:<SignIn />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
