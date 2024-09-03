import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import Footer from "../components/Layout/Footer";
import CartSummary from "../components/Cart/CartSummary";
import PromoCard from "../components/ui/PromoCard";
import ScrollableAppBar from "../components/Layout/ScrollableAppBar";

const Cart = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <ScrollableAppBar />
      <Box mt={3} sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}>
            <CartSummary />
          </Grid>
        </Grid>
        <PromoCard />
      </Box>
      <Footer />
    </Box>
  );
};

export default Cart;
