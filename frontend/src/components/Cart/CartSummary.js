import React, { useState, useEffect, useCallback } from "react";
import { List, Typography, Button, Snackbar, Box } from "@mui/material";
import {
  getCartItems,
  incrementCartItem,
  decrementCartItem,
  deleteCartItem,
  createOrder,
} from "../../utils/api";
import CartItem from "./CartItem";
import Cookies from "js-cookie";

const CartSummary = () => {
  const [cartItems, setCartItems] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const userId = Cookies.get("user_id");

  const fetchCartItems = useCallback(async () => {
    try {
      const response = await getCartItems(userId);
      setCartItems(response.data);
    } catch (error) {
      setSnackbarMessage("Failed to load cart items");
      setOpenSnackbar(true);
    }
  }, [userId]);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const handleIncrement = async (cartId) => {
    try {
      await incrementCartItem(cartId);
      setSnackbarMessage("Cart item quantity increased!");
      setOpenSnackbar(true);
      fetchCartItems();
    } catch (error) {
      setSnackbarMessage("Failed to update cart item");
      setOpenSnackbar(true);
    }
  };

  const handleDecrement = async (cartId) => {
    try {
      await decrementCartItem(cartId);
      setSnackbarMessage("Cart item quantity decreased!");
      setOpenSnackbar(true);
      fetchCartItems();
    } catch (error) {
      setSnackbarMessage("Failed to update cart item");
      setOpenSnackbar(true);
    }
  };

  const handleDeleteItem = async (cartId) => {
    try {
      await deleteCartItem(cartId);
      setSnackbarMessage("Cart item deleted successfully!");
      setOpenSnackbar(true);
      fetchCartItems();
    } catch (error) {
      setSnackbarMessage("Failed to delete cart item");
      setOpenSnackbar(true);
    }
  };

  const handleCheckout = async () => {
    if (!userId) {
      setSnackbarMessage("User ID not found. Please log in.");
      setOpenSnackbar(true);
      return;
    }

    try {
      const orderData = {
        gameID: cartItems.map((item) => item.gameID).join(", "),
        title: cartItems.map((item) => item.title).join(", "),
        price: cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
        quantity: cartItems.reduce((acc, item) => acc + item.quantity, 0),
        image_url: cartItems.map((item) => item.image_url).join(", "),
        total_price: cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
      };

      await createOrder(orderData, userId);
      setSnackbarMessage("Order placed successfully!");
      setOpenSnackbar(true);
      setCartItems([]);
    } catch (error) {
      setSnackbarMessage("Failed to place order.");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Typography variant="h4" component="h2" gutterBottom>
        Cart Summary
      </Typography>
      <List>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onDelete={handleDeleteItem}
          />
        ))}
      </List>
      <Box mt={2} textAlign="center">
        <Button variant="contained" color="primary" onClick={handleCheckout}>
          Checkout
        </Button>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </>
  );
};

export default CartSummary;
