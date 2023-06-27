import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { actionTypes } from "../../reducer"
import {useStateValue} from "../../StateProvider"

const tiers = [
  {
    title: 'Gratis',
    price: '0',
    description: [
      'Acceso a eventos disponibles',
      'Prueba 1 mes gratis',
      '10 GB de almacenamiento'
    ],
    buttonText: 'Empezar',
    buttonVariant: 'contained',
  },
  {
    title: 'Normal',
    subheader: 'Mas popular',
    price: '30',
    description: [
      'Acceso a eventos disponibles',
      'Primer mes gratis',
      '100 GB de almacenamiento'
    ],
    buttonText: 'Comprar',
    buttonVariant: 'contained',
  },
  {
    title: 'Premium',
    price: '50',
    description: [
      'Acceso a eventos disponibles',
      'Primer mes gratis',
      '500 GB de almacenamiento'
    ],
    buttonText: 'Comprar',
    buttonVariant: 'contained',
  },
];

function PricingContent() {
  const [{basket}, dispatch] = useStateValue()
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                      {tier.price} Bs
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /mes
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={tier.buttonVariant} onClick={function(){
                    const plan=tier.title
                    const precio=parseInt(tier.price)
                      dispatch({
                        type: actionTypes.ADD_TO_BASKET, 
                        item: {evento: "Plan "+plan, precio: 0, mostrar: precio, flag: false, nombre: "subscripcion", fotografo: plan}
                      })
                    navigate('/Comprar')
                  }}>
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default function Pricing() {
  return <PricingContent />;
}