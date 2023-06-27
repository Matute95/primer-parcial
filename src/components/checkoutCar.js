import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Delete } from '@mui/icons-material';
import { actionTypes } from '../reducer';
import {useStateValue} from "../StateProvider"

export default function CheckoutCar({item: {direccion, mostrar, evento, fecha, precio}}) {
  const [dispatch] = useStateValue()
  const removeItem = () => {
    dispatch({
      type: actionTypes.REMOVE_ITEM,  direccion
    })
  }
  return (
    <Card sx={{ maxWidth: 345}}>
      <CardHeader 
        action={
          <Typography sx={{marginTop: "1rem"}}
            className='precio'
            variant='h5'
            color='GrayText'
          >
            {precio + " Bs"}
          </Typography>
        }
        title={evento}
        subheader={fecha}
      />
      <CardMedia 
        component="img"
        height="180"
        image={mostrar}
      />
      <CardActions sx={{display: "flex", justifyContent: "right"}}>
        <IconButton aria-label="Eliminar" onClick={removeItem}>
          <Delete fontSize='large'/>
        </IconButton>
      </CardActions>
    </Card>
  );
}
