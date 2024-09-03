import React, { useState, useEffect, useCallback } from "react";
import {
  List,
  Typography,
  Button,
  Snackbar,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import {
  getCartItems,
  incrementCartItem,
  decrementCartItem,
  deleteCartItem,
  createOrder,
} from "../../utils/api";
import CartItem from "./CartItem";
import Cookies from "js-cookie";
import CheckoutModal from "../ui/CheckoutModal"; // Make sure the path is correct

const CartSummary = () => {
  const [cartItems, setCartItems] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openModal, setOpenModal] = useState(false); // State for the modal

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

  const handleFakeCheckout = () => {
    setOpenModal(true);
  };

  const handleProceedToCheckout = async () => {
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

      // Clear the cart items from the database
      for (const item of cartItems) {
        await deleteCartItem(item.id);
      }

      // Clear the cart items from the state
      setCartItems([]);
    } catch (error) {
      setSnackbarMessage("Failed to place order.");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const estimatedTax = (subtotal * 0.0725).toFixed(2); // Example tax calculation
  const shipping = subtotal > 79 ? 0 : 9.99; // Free shipping over $79

  return (
    <>
      <Grid container spacing={2}>
        {/* Left Side: Cart Items */}
        <Grid item xs={12} md={8}>
          {cartItems.length > 0 ? (
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
          ) : (
            <Typography variant="body1" textAlign="center">
              Your cart is empty.
            </Typography>
          )}
        </Grid>

        {/* Right Side: Order Summary */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2">
                  Subtotal ({cartItems.length} items)
                </Typography>
                <Typography variant="body2">${subtotal.toFixed(2)}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2">Shipping & Handling</Typography>
                <Typography variant="body2">
                  {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2">Estimated Tax</Typography>
                <Typography variant="body2">${estimatedTax}</Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                mt={2}
                fontWeight="bold"
              >
                <Typography variant="body1">Estimated Total</Typography>
                <Typography variant="body1">
                  ${(subtotal + parseFloat(estimatedTax) + shipping).toFixed(2)}
                </Typography>
              </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleFakeCheckout} // Trigger the modal instead of direct checkout
                sx={{
                  mt: 2,
                  width: "80%",
                  backgroundColor: "#ffcc00",
                  color: "#333",
                  "&:hover": {
                    backgroundColor: "#ffb700",
                  },
                }}
                disabled={cartItems.length === 0}
              >
                Checkout
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      {/* Checkout Modal */}
      <CheckoutModal
        open={openModal}
        handleClose={handleCloseModal}
        handleProceedToCheckout={handleProceedToCheckout}
      />

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
