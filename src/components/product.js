import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { AddShoppingCart, CameraAlt } from '@mui/icons-material';
import { actionTypes } from '../reducer';
import {useStateValue} from "../StateProvider"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Product({item: {direccion, nombre, mostrar, evento, fecha, fotografo, precio}}) {
  var [compra, setCompra] = useState('action')
  const navigate = useNavigate();
  const [{basket}, dispatch] = useStateValue()
  const addToBasket = () => {
    dispatch({
      type: actionTypes.ADD_TO_BASKET,
      item: {direccion, nombre, mostrar, evento, fecha, fotografo, precio, flag: false}
    })
  }
  const removeItem = () => {
    dispatch({
      type: actionTypes.REMOVE_ITEM, direccion
    })
  }
  return (
    <Card sx={{ maxWidth: 345}}>
      <CardHeader 
        action={
          <Typography
            className='precio'
            variant='h5'
            color='GrayText'
          >
            {precio + " Bs"}
          </Typography>
        }
        title={<IconButton href={`/E/${evento}`}>{evento}</IconButton>}
        subheader={fecha}
      />
      <CardMedia
        component="img"
        height="180"
        image={mostrar}
      /> 
      <CardActions disableSpacing sx={{display: "flex", justifyContent: "space-between"}}>
        <IconButton
          aria-label="show more" href={`/F/${fotografo}`}
        >
          <CameraAlt/>
         {fotografo}
        </IconButton>
        <IconButton aria-label="Agregar al carrito" onClick={
          () => {
            if (compra==='action') {
              setCompra('primary');
              addToBasket();
            } else {
              setCompra('action');
              removeItem();
            }
          }
        }>
          <AddShoppingCart color={compra}/>
        </IconButton>
      </CardActions>
    </Card>
  );
}
