import { CloudUpload, Delete, Message, RemoveRedEye } from "@mui/icons-material"
import { BottomNavigation, BottomNavigationAction, Paper, Container, CssBaseline, Button, MenuItem, InputLabel, Select, Box, InputAdornment, OutlinedInput, Grid, CircularProgress, Typography, ListItem, ListItemAvatar, Avatar, ListItemText, List, IconButton, Badge, Backdrop } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { auth, storage } from "../../firebase/credenciales"
import { borrar, fotosPh, Peticiones, phEventos, subirFoto } from "../../firebase/datos"
import { getUsuario } from "../../firebase/sesion"
import PhForm from "./form"
import { ref, getDownloadURL, uploadBytes } from "firebase/storage"
import { useNavigate } from "react-router-dom"


export default function Phindex(){
    const [phval, setPhval] = useState(0)
    const [value, setValue] = useState(0)
    const [eventos, setEventos] = useState([])
    const [fotos, setFotos] = useState([])
    const [peticiones, setPeticiones] = useState([])
    const navigate = useNavigate();
    useEffect(()=>{
        async function getPhval(){
        const usuario = await getUsuario()
        const events = await phEventos()
        const phFotos = await fotosPh()
        const pedidos = await Peticiones()
        setFotos(phFotos)
        setEventos(events)
        setPeticiones(pedidos)
        usuario.fotografo?
        setPhval(1):setPhval(2)
        }
        getPhval()
    },[value, auth.currentUser])
    return <Container component="main" maxWidth={phval===1?"xs":"md"}><CssBaseline />{
      phval===0? <Grid xs display="flex" justifyContent="center" alignItems="center">
        <CircularProgress/> </Grid> :  phval===1?value===0?
        <React.Fragment>
            <h1 className="text-center">Subir Archivos</h1>
            <Dropzone accept={"image/jpeg"} eventos={eventos}/>
            <br></br>
        </React.Fragment>:value===1?
        <React.Fragment>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          <strong>Imagenes subidas</strong>
        </Typography>
            {fotos?.map((foto)=>(
              <Grid item xs={12} md={6}>
              <List>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <Delete />
                  </IconButton>
                }>
                <ListItemAvatar>
                  <Avatar src={foto.direccion}>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={foto.nombre}
                />
              </ListItem>
          </List>
          </Grid>
            ))}
      </React.Fragment>:
      <React.Fragment>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        <strong>Eventos disponibles</strong>
      </Typography>
          {peticiones?.map((pet)=>(
            <Grid item xs={12} md={6}>
            <List>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete" 
                onClick={function(){
                  navigate(`/evento/${pet.id}`)
                }}>
                  <RemoveRedEye />
                </IconButton>
              }>
              <ListItemAvatar>
                <Avatar>E
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={pet.nombre}
              />
            </ListItem>
        </List>
        </Grid>
          ))}
    </React.Fragment>
        :null}
        {phval===2?<PhForm/>:<Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
            setValue(newValue);
            }}> 
            <BottomNavigationAction label="Subir" icon={<CloudUpload />} />
            <BottomNavigationAction label="Eliminar" icon={<Delete />} />
            <BottomNavigationAction label="Peticiones" icon={
            <IconButton>
              <Badge badgeContent={peticiones.length} color="warning">
              <Message/>
            </Badge>
            </IconButton>} />
        </BottomNavigation>
        </Paper>}
        </Container>
}

function Dropzone({ accept, open, eventos }) {
    const [age, setAge] = React.useState('');
    const [cargando, setCargando] = useState(false)
    const navigate = useNavigate();
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
      useDropzone({
        accept
      });
    const files = acceptedFiles.map((file) => (
      <li key={file.path}>
        {file.path}
      </li>
    ));
    const uploadDrop = async(event)=>{
        event.preventDefault();
        const data = new FormData(event.currentTarget)
        await Promise.all(
          acceptedFiles.map((file) => {
            const imageRef = ref(storage,`aplicacion/${file.path}`)
            uploadBytes(imageRef, file).then(async()=>{
              const url = await getDownloadURL(imageRef)
              await subirFoto(data.get('precio'), age, url, file)
            })
          })
        )
        setCargando(false)
    }
    return (
        <div>
      <div {...getRootProps({ className: "dropzone" })} 
      style={{textAlign: "center", padding: "20px", 
      border: "3px blue dashed", margin: "auto"}}>
        <input className="input-zone" {...getInputProps()} />
        <div className="text-center">
          {isDragActive ? (
            <p className="dropzone-content">
              Suelte las fotos aqui
            </p>
          ) : (
            <p className="dropzone-content">
              Arrastre las fotos o precione el boton
            </p>
          )}
          <Button variant="outlined" onClick={open}>Seleccionar archivos</Button>
        </div>
      </div>
      <Box sx={{ minWidth: 120 }}>
      <Box component="form" noValidate onSubmit={uploadDrop} sx={{ mt: 2 }}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel id="evento">    
                Evento</InputLabel>
                <Select labelId="evento" size="small" fullWidth name="evento"
                id="evento" value={age} label="evento" onChange={handleChange}>
                  {eventos.length>0?eventos.map(evento => (
                    <MenuItem value={evento}>{evento.nombre}</MenuItem>
                  )):<MenuItem value="sin evento">No asistio a ningun evento</MenuItem>}
                </Select>
              </Grid>
              <Grid item sm={6}>
                <OutlinedInput sx={{width: "100px"}}
                    id="precio" defaultValue="10" name="precio"
                    endAdornment={<InputAdornment position="end">Bs</InputAdornment>}
                    size="small"
                />
              </Grid>
              <Grid item sm={6}>
              <Button variant="contained"disabled={!files.length>0} 
              type="submit" onSubmit={uploadDrop} onClick={function(){setCargando(true)}}>Publicar</Button>
              </Grid>
            </Grid>
          </Box>
          <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={cargando}>
                <Container component="main" maxWidth="xs">
                  <CircularProgress color="inherit" />
                </Container>
            </Backdrop>
        </Box>
      <br></br>
      <aside>
        <ul>{files}</ul>
      </aside>
    </div>
    );
  }