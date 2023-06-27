import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { useStateValue } from '../../StateProvider';
import { download, subscribir } from '../../firebase/datos';

const theme = createTheme();

export default function Checkout() {
  const [{basket}] = useStateValue()
  const flag = basket[basket.length-1].flag
  const dia = new Date()
  const steps = flag?
  ['Detalles de envio', 'Detalles de pago', 'Revisar la compra']:
  ['Detalles de pago', 'Revisar la compra']
  const [activeStep, setActiveStep] = React.useState(0)
  const handleNext = () => {
    setActiveStep(activeStep + 1)
    if(activeStep === steps.length - 1){
      if(basket[0].nombre==="subscripcion"){
        async function sub(){
          await subscribir(basket[0].fotografo, basket[0].mostrar)
        }
        sub()
      }else{
        console.log(basket)
        basket.forEach(item => {
          download(item.nombre)
        })
      }
      }
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm />;
      case 1:
        return <PaymentForm />;
      case 2:
        return <Review />;
      default:
        throw new Error('Unknown step');
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 2 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Caja
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Pago exitoso
                </Typography>
                <Typography variant="subtitle1">
                  {basket[0].nombre==="subscripcion"?"Se ha subscrito al "+basket[0].evento+
                  ", ahora tien acceso a las funciones de fotografo. (se le descontaran "+basket[0].mostrar+
                  " Bs. cada "+dia.getDate()+" apartir del siguiente mes)":
                  "Si la descarga no inicio automaticamente puede ingresar al enlace de la imagen para descargarla"
                  }
                </Typography>
                {basket.map((item=>(
                  <grid item xs={12}>
                    <br></br>
                    <a href={item.direccion}
                    target="_blank" style={{color: "blueviolet"}}>{item.direccion}</a>
                    <br></br>
                  </grid>
                  )))}
              </React.Fragment>
            ) : (
              <React.Fragment>
                {flag?getStepContent(activeStep):getStepContent(activeStep+1)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Volver
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Pagar' : 'Siguiente'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}