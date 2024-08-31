import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Snackbar, TextField } from "@mui/material";
import { updateCartItem, deleteCartItem } from "../../utils/api";

const CartItem = ({ item, onUpdate, onDelete }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const handleUpdate = async () => {
    try {
      await updateCartItem(item.id, { quantity });
      setSnackbarMessage("Cart item updated successfully!");
      setOpenSnackbar(true);
      onUpdate();
    } catch (error) {
      setSnackbarMessage("Failed to update cart item.");
      setOpenSnackbar(true);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCartItem(item.id);
      setSnackbarMessage("Cart item removed successfully!");
      setOpenSnackbar(true);
      onDelete(); // Notify parent component to refresh cart
    } catch (error) {
      setSnackbarMessage("Failed to remove cart item.");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
    >
      <Box>
        <Typography variant="h6">{item.title}</Typography>
        <Typography variant="body1">${item.price}</Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <TextField
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          inputProps={{ min: 1 }}
          size="small"
        />
        <Button
          onClick={handleUpdate}
          variant="contained"
          color="primary"
          style={{ marginLeft: "10px" }}
        >
          Update
        </Button>
        <Button
          onClick={handleDelete}
          variant="contained"
          color="secondary"
          style={{ marginLeft: "10px" }}
        >
          Remove
        </Button>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default CartItem;
