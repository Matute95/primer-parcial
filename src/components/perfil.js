import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getUsuario, regUser } from '../firebase/sesion';
import { useNavigate } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { auth } from '../firebase/credenciales';

const theme = createTheme();

export default function Perfil() {

  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({foto:"", nombre:"", apellido:""})
  const [flag, setFlag] = useState(true)
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    regUser(data.get('email'), 
            data.get('password'),
            data.get('firstName'),
            data.get('lastName'),
            data.get('foto')
          )
    navigate('/')
  }

  useEffect(()=>{
    async function user(){
      const usu = await getUsuario()
      setUsuario(usu)
    }
    user()
},[])

  const Formulario = () =>{
    return(
      <Fragment>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Nombre"
                  defaultValue={usuario.nombre}
                  disabled={flag}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Apellido"
                  name="lastName"
                  autoComplete="family-name"
                  defaultValue={usuario.apellido}
                  disabled={flag}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Correo"
                  name="email"
                  autoComplete="email"
                  defaultValue={auth.currentUser.email}
                  disabled={flag}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  disabled={flag}
                />
              </Grid>
              <Grid item xs={12} ml="5rem">
                <Button variant="outlined" component="label" disabled={flag}>
                  Cambiar Foto de Perfil
                  <input required hidden accept="image/*" type="file" name='foto'/>
                </Button>
              </Grid>
              
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={flag}
              onClick={change}
            >
              Guardar cambios
            </Button>
          </Box>
      </Fragment>
    )
  }
  function change(){
    setFlag(!flag)
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: "150px", height: "150px"}} src={usuario.foto}>
          </Avatar>
          <Button variant="outlined" onClick={change}>
            Editar Datos
          </Button>
          <Formulario/>
        </Box>
      </Container>
    </ThemeProvider>
  );
}