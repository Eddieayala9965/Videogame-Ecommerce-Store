import React, { useState, useEffect, useCallback } from "react";
import { List, Typography, Snackbar } from "@mui/material";
import { getCartItems, updateCartItem, deleteCartItem } from "../../utils/api";
import CartItem from "./CartItem";

const CartSummary = ({ userId }) => {
  const [cartItems, setCartItems] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const fetchCartItems = useCallback(async () => {
    try {
      const response = await getCartItems(userId);
      setCartItems(response.data);
    } catch (error) {
      setSnackbarMessage("Failed to load cart items");
      setOpenSnackbar(true);
    }
  }, [userId, setCartItems, setSnackbarMessage, setOpenSnackbar]);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const handleUpdateQuantity = async (cartId, newQuantity) => {
    try {
      await updateCartItem(cartId, { quantity: newQuantity });
      setSnackbarMessage("Cart item updated successfully!");
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
      fetchCartItems(); // Re-fetch cart items after deletion
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
            onItemUpdated={(newQuantity) =>
              handleUpdateQuantity(item.id, newQuantity)
            }
            onItemDeleted={() => handleDeleteItem(item.id)}
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
