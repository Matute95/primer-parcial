import React from "react";
import { Box, Typography } from "@mui/material"
import Grid from '@mui/material/Grid';
import CheckoutCar from "./checkoutCar";
import { Total } from "./total";
import { useStateValue } from "../StateProvider";

const CheckoutPage = () => {
    const [{basket}, dispatch] = useStateValue();
    function FormRow(){
        return(
            <React.Fragment>
                {basket?.map((item) => (
                item.flag===false?
                <Grid item xs={12} sm={8} md={6} lg={4}>
                    <CheckoutCar key={item.id} item={item}/>
                </Grid>:null
                ))}
            </React.Fragment>
        )
    }
    
    return (
        <Box sx={{ flexGrow:1, padding:"2rem"}}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography align="center" gutterBottom variant="h4">
                        <strong>Carrito</strong>
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={9} container spacing={1}>
                    <FormRow/>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <Typography align="center" gutterBottom variant="h4">
                        <Total/>
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}
export default CheckoutPage