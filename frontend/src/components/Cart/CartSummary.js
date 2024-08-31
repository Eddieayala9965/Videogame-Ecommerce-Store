import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Snackbar } from "@mui/material";
import CartItem from "./CartItem";
import { getCartItems } from "../../utils/api";

const CartSummary = () => {
  const [cartItems, setCartItems] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const fetchCartItems = async () => {
    try {
      const response = await getCartItems();
      setCartItems(response.data);
    } catch (error) {
      setSnackbarMessage("Failed to load cart items.");
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleUpdate = () => {
    fetchCartItems();
  };

  const handleDelete = () => {
    fetchCartItems();
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Box mt={5}>
      <Typography variant="h4" component="h1" gutterBottom>
        Cart Summary
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
          <Box
            mt={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
            <Button variant="contained" color="primary">
              Proceed to Checkout
            </Button>
          </Box>
        </>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default CartSummary;
