import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useStateValue } from '../../StateProvider';

export default function Review() {
  const [{basket}, dispatch] = useStateValue()
  const total = () => {
    var suma = 0
    for (var i=0; i<basket.length; i++) {
      suma = suma + parseInt(basket[i].precio)
    }
    return suma
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Resumen de compra
      </Typography>
      <List disablePadding>
        {basket.map((foto) => (
          <ListItem key={foto.direccion} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={foto.flag?""
            :basket[0].nombre==="subscripcion"?foto.evento:
            "Fotografia en"} secondary={basket[0].nombre==="subscripcion"?"Primer mes gratis":foto.evento} />
            <Typography variant="body2">{foto.precio} Bs</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {total()}
          </Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
}