import { RemoveRedEye } from "@mui/icons-material"
import { Avatar, Container, CssBaseline, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { get, getPh } from "../firebase/datos"

export default function Mostrar(){
    const [mostrar, setMostrar] = useState([])
    const { id } = useParams()
    useEffect(()=>{
        async function getDatos(){
            if(id==="evento"){
                const datos = await get(id)
                setMostrar(datos)
            }else{
                const datos = await getPh()
                setMostrar(datos)
            }
        }
        getDatos()
    },[id])
    return(
        <Container component="main" maxWidth="xs"><CssBaseline />
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        <strong>Lista de {id}s</strong>
      </Typography>
          {mostrar?.map((item)=>(
            <Grid item xs={12} md={6}>
            <List>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="view" 
                href={id==="evento"?`/E/${item.nombre}`:`/F/${item.nombre}`}>
                  <RemoveRedEye />
                </IconButton>
              }>
              <ListItemAvatar>
                <Avatar src={id==="fotografo"?item.foto:item.afiche}>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.nombre}
              />
            </ListItem>
        </List>
        </Grid>
          ))}
    </Container>
    )
}