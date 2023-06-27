import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import Product from './product'
import {filtro, privado} from '../firebase/datos'
import { useParams } from "react-router-dom"

export default function Products() {
  const [fotos, setFotos] = useState([])
  const { id, tipo } = useParams()
  useEffect(()=>{
    async function getItems(){
      if(tipo==="E" || tipo==="F"){
        const getfotos = await filtro(id)
        setFotos(getfotos)
      }else if(tipo==="Privado"){
        const getfotos = await privado(id)
        setFotos(getfotos)
      }else{
        const getfotos = await filtro("todo")
        setFotos(getfotos)
      }
    }
    getItems()
  },[id, tipo])
  return (
    <Box sx={{ flexGrow: 1, padding:"2rem"}}>
      <Grid container spacing={1}>
        {fotos.map(item => (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Product key={item.id} item={item}/>
        </Grid>
        ))}
      </Grid>
    </Box>
  );
}
