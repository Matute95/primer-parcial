import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { CameraAlt, Celebration, Groups, Image, Info, LocationOn } from '@mui/icons-material';
import { LocalizationProvider, MobileDatePicker, TimePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs'
import { FormControl, InputLabel, MenuItem, Modal, Select, Tooltip } from '@mui/material';
import MyComponent from './map'
import { subirEvento } from '../firebase/datos';

const theme = createTheme();
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 470,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const containerStyle = {
  width: '400px',
  height: '400px'
};
const center = {
  lat: -3.745,
  lng: -38.523
};

export default function SignUp() {
  const [value, setValue] = useState(dayjs('2022-12-18T20:00:00'));
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [age, setAge] = useState('');
  const handleChanger = (event) => {
    setAge(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const id = await subirEvento(
            data.get('nombre'),
            data.get('fecha'),
            data.get('hora'),
            data.get('direccion'),
            data.get('ubicacion'),
            data.get('afiche'),
            data.get('concurrencia'),
            data.get('phMax'),
            data.get('descripcion'),
            age
          )
    navigate(`/evento/${id}`)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <Celebration/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrar Evento
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="nombre"
                  label="Titulo del evento"
                  name="nombre"
                />
              </Grid>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid item xs={6}>
              <MobileDatePicker
                label="Fecha"
                inputFormat="DD/MM/YYYY"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} name='fecha'/>}
              />
              </Grid>
              <Grid item xs={6}>
              <TimePicker
                label="hora de inicio"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} name='hora'/>}
              />
              </Grid>
              </LocalizationProvider>
              <Grid item xs={12}>
                <TextField
                  name="direccion"
                  required
                  fullWidth
                  id="direccion"
                  label="Direccion"
                  autoFocus
                />
              </Grid>
              <Grid item xs={6}>
              <Tooltip title="Definir ubicacion">
                <Button variant="outlined" onClick={handleOpen}>
                  Ubicacion
                  <input hidden name='ubicacion' value="https://goo.gl/maps/uyhfwFVq4hHQSmKX8"></input>
                  <LocationOn/>
                </Button>
              </Tooltip>
              </Grid>
              <Grid item xs={5}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Fotos</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="privacidad"
                  size='small'
                  required
                  onChange={handleChanger}
                >
                  <MenuItem value="publico">Publicas</MenuItem>
                  <MenuItem value="privado">Privadas</MenuItem>
                </Select>
              </FormControl>
              </Grid>
              <Grid xs={1}>
              <Box mt={3} ml={1}>
                <Tooltip title="Si selecciona privadas solo las personas con invitacion podran acceder al album">
                  <Info/>
                </Tooltip>
              </Box>
              </Grid>
              <Grid item xs={4}>
              <Tooltip title="cargar un fiche">
                <Button variant="outlined" component="label">
                  afiche
                  <Image/>
                  <input hidden accept="image/*" type="file" name='afiche'/>
                </Button>
              </Tooltip>
              </Grid>
              <Grid item xs={3}>
              <TextField
                id="outlined-multiline-static"
                size='small'
                label={<Groups/>}
                type="number"
                name='concurrencia'
                required
              />
              </Grid>
              <Grid xs={1}>
              <Box mt={3} ml={1}>
                <Tooltip title="Numero aproximado de personas que asistiran al evento.">
                  <Info/>
                </Tooltip>
              </Box>
              </Grid>
              <Grid item xs={3}>
              <TextField
                id="outlined-multiline-static"
                size='small'
                label={<CameraAlt/>}
                type="number"
                name='phMax'
                required
              />
              </Grid>
              <Grid xs={1}>
                <Box mt={3} ml={1}>
                <Tooltip title="Numero maximo de fotografos permitidos en el evento. (0 = sin limite)">
                  <Info/>
                </Tooltip>
                </Box>
              </Grid>
              <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                label="Descripcion"
                multiline
                rows={4}
                name='descripcion'
                fullWidth
              />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Publicar Evento
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/SingIn" variant="body2">
                  ver tus eventos pendientes
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box><br></br>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <MyComponent />
          </Box>
        </Modal>
      </Container>
    </ThemeProvider>
  );
}