import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Badge } from '@mui/material';
import { Link } from "react-router-dom";
import {useStateValue} from "../StateProvider"
import { actionTypes } from '../reducer';
import { auth } from '../firebase/credenciales';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { ShoppingCart, Image, CameraAlt, Celebration, Person, Download } from '@mui/icons-material';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const [isReadyForInstall, setIsReadyForInstall] = React.useState(false);

React.useEffect(() => {
  window.addEventListener("beforeinstallprompt", (event) => {
    // Prevent the mini-infobar from appearing on mobile.
    //event.preventDefault();
    console.log("👍", "beforeinstallprompt", event);
    // Stash the event so it can be triggered later.
    window.deferredPrompt = event;
    // Remove the 'hidden' class from the install button container.
    setIsReadyForInstall(true);
  });
}, []);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  const [{basket, user}, dispatch] = useStateValue()
  const navigate = useNavigate();
  const out = () => {
    if (user){
      auth.signOut()
      dispatch({
        type: actionTypes.EMPTY_BASKET,
        basket: []
      })
      dispatch({
        type: actionTypes.SET_USER,
        user: null
      })
      navigate('/')
    }
  }

  async function downloadApp() {
    console.log("👍", "butInstall-clicked");
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      console.log("oops, no prompt event guardado en window");
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log("👍", "userChoice", result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install button.
    setIsReadyForInstall(false);
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{backgroundColor:"#EAECEE", color:"black"}} open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <strong>{open?"":"MENU"}</strong>
          </Typography>
          <Box component="div" sx={{ flexGrow: 1 }}></Box>
          <Link to={!user ? "SingIn" : "/"}>
            <Button variant='outlined' onClick={out}>
              <strong>{!user ? "Iniciar Sesion" : "Cerrar Sesion"}</strong>
            </Button>
          </Link>
          <Link to="Carrito">
              <IconButton arial-label="Mostrar carrito">
              <Badge badgeContent={basket.length} color="warning">
              <ShoppingCart fontSize='large' color='inherit'/>
            </Badge>
            </IconButton>
            </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            cerrar
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Typography sx={{textAlign: 'center'}} >Catalogo</Typography>
        <Divider />
        <List>
          <ListItem disablePadding>
              <ListItemButton redirect to = '/'>
                <ListItemIcon>
                  <Image/>
                </ListItemIcon>
                <ListItemText primary="Todo" />
              </ListItemButton>
            </ListItem>
        </List>
        <List>
          <ListItem disablePadding>
              <ListItemButton href={`/Mostrar/${"fotografo"}`}>
                <ListItemIcon>
                  <CameraAlt/>
                </ListItemIcon>
                <ListItemText primary="Fotografo" />
              </ListItemButton>
            </ListItem>
        </List>
        <List>
          <ListItem disablePadding>
              <ListItemButton href={`/Mostrar/${"evento"}`}>
                <ListItemIcon>
                  <Celebration/>
                </ListItemIcon>
                <ListItemText primary="Evento" />
              </ListItemButton>
            </ListItem>
        </List>
        <List>
          <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Person/>
                </ListItemIcon>
                <ListItemText primary="Donde aparezco" />
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        <Typography sx={{textAlign: 'center'}} >Cuenta</Typography>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton redirect to = '/Usuario'>
                <ListItemIcon>
                  <Person/>
                </ListItemIcon>
                <ListItemText primary="Usuario"/>
              </ListItemButton>
            </ListItem>
        </List>
        <List>
          <ListItem disablePadding>
              <ListItemButton redirect to = '/Fotografo'>
                <ListItemIcon>
                  <CameraAlt/>
                </ListItemIcon>
                <ListItemText primary="Fotografo" />
              </ListItemButton>
            </ListItem>
        </List>
        <List>
          <ListItem disablePadding>
              <ListItemButton redirect to = '/Evento'>
                <ListItemIcon>
                  <Celebration/>
                </ListItemIcon>
                <ListItemText primary="Evento" />
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        {isReadyForInstall && <Button variant="outlined" onClick={downloadApp} endIcon={<Download />}>
          Instalar como APP
        </Button>}
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
