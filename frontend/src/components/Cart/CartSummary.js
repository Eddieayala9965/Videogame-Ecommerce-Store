import React, { useState, useEffect, useCallback } from "react";
import { List, Typography, Snackbar } from "@mui/material";
import {
  getCartItems,
  incrementCartItem,
  decrementCartItem,
  deleteCartItem,
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
