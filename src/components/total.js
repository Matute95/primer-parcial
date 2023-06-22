import { Box, Button, Checkbox, FormControlLabel, FormGroup, FormHelperText } from "@mui/material"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { actionTypes } from "../reducer"
import {useStateValue} from "../StateProvider"

export const Total = () => {
  const [{basket}, dispatch] = useStateValue()
  const [enviar, setEnvio] = useState(false)
  const envioFlag = () => {
    setEnvio(!enviar)
  }
  const navigate = useNavigate();
  const comprar = () =>{
    if(enviar){
      dispatch({
        type: actionTypes.ADD_TO_BASKET, 
        item: {evento: "Costo de impresion + envio", precio: 15, flag: true}
      })
    }
    navigate('/Comprar')
  }
  const sumar = () => {
    var suma = 0
    for (var i=0; i<basket.length; i++) {
      suma = suma + parseInt(basket[i].precio)
    }
    return suma
  }
  return (
    <Box sx={{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        height:"20vh"
        }}>
        <h5>Total: {basket?.length}</h5>
        <h5> {sumar()} Bs </h5>
        <Button variant="contained" color="secondary" 
        disabled={!basket?.length>0} onClick={comprar}
        sx={{marginTop:"2rem"}}>
          Comprar
        </Button>
        <FormGroup>
          <FormControlLabel disabled control={<Checkbox defaultChecked />} label="Imagen en alta resolucion" />
          <FormControlLabel control={<Checkbox onChange={envioFlag}/>} label="Incluir envio" />
          <FormHelperText>Consto de impresion + envio 15 Bs</FormHelperText>
        </FormGroup>
    </Box>
  )
}
