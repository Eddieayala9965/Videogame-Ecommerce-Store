import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import CartSummary from "../components/Cart/CartSummary";

const Cart = () => {
  return (
    <Box mt={3}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CartSummary />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cart;
