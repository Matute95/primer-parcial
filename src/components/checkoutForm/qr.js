import { Backdrop, Button, CssBaseline, Grid } from "@mui/material"
import { Container } from "@mui/system"
import { doc, getDoc } from "firebase/firestore"
import { Fragment, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { auth, db } from "../../firebase/credenciales"
import QRCode from 'qrcode.react';
import { getUsuario } from "../../firebase/sesion"
import { aceptarPh } from "../../firebase/datos"

export default function QrEvento(){
    const { id } = useParams()
    const [evento, setEvento] = useState([])
    const [open, setOpen] = useState(false)
    const [camara, setCamara] = useState(false)
    const navigate = useNavigate();
    const handleClose = () => {
        setOpen(false)
    }
    const handleToggle = () => {
        setOpen(!open)
    }
    useEffect(()=>{
        async function getEvent(id){
        const event = await getDoc(doc(db,"evento",id))
        try{
        const user = await getUsuario()
        var fotografo = user.fotografo
        const uid = auth.currentUser.uid
        if(event.data().fotografos.includes(uid)){
            fotografo = false
        }
        setCamara(fotografo)
        } catch{

        }
        setEvento(event.data())
        }
        getEvent(id)
    },[])
    const downloadQR = () => {
        const canvas = document.getElementById("123456");
        const pngUrl = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "QR.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      };
    const aceptar = () => {
        aceptarPh(id)
        navigate("/fotografo")
    }
    return (
        <Fragment>
        <Container component="main" maxWidth="xs"><CssBaseline />
            <Grid xs display="flex" justifyContent="center" alignItems="center">
            <Grid container spacing={2}>
            <Grid item xs={12}><h1 style={{color: "purple"}}>{evento.nombre}</h1></Grid>
            <Grid item xs={12}>
                <h2>direccion: </h2><h3 style={{color: "blueviolet"}}>{evento.direccion}</h3>
                <h2>fecha: </h2><h3 style={{color: "blueviolet"}}>{evento.fecha}</h3>
                <h2>hora de inicio: </h2><h3 style={{color: "blueviolet"}}>{evento.hora}</h3>
                <h2>ubicacion: <a href={evento.ubicacion} style={{color: "blue", fontSize:"18px"}}>{evento.ubicacion}</a></h2>
                {camara? <Grid>
                    <h2>Cantidad aproximada de invitados: </h2><h3 style={{color: "blueviolet"}}>{evento.concurrencia}</h3>
                    <h2>Fotografos permitidos: </h2><h3 style={{color: "blueviolet"}}>Aceptados: {evento.phMax} Disponibles: {evento.phMax-evento.fotografos.length}</h3>
                </Grid>:null}
            </Grid>
            <Grid item xs={4}>
            <Button variant="outlined" href={`/${"Privado"}/${id}`}>Ver Fotos</Button>
            </Grid>
            <Grid item xs={4}>
            <Button variant="outlined" onClick={handleToggle}>Ver QR</Button>
            </Grid><Grid item xs={4}>
            <Button variant="outlined" href={evento.afiche} target="_blank">Ver Afiche</Button>
            </Grid> {camara?<Grid item xs={12} ml="4rem">
            <Button variant="contained" onClick={aceptar}>Aceptar Evento</Button>    
            </Grid>:null} </Grid>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}>
                <Container component="main" maxWidth="xs">
                    <QRCode 
                    id="123456" 
                    value={evento.afiche}
                    size={290} 
                    level={"H"} 
                    includeMargin={true} 
                    ></QRCode>
                <Button variant="contained" onClick={downloadQR} sx={{width:"290px"}}>Descargar QR</Button>
                </Container>
            </Backdrop>
            </Grid>
        </Container>
        </Fragment>
    )
}