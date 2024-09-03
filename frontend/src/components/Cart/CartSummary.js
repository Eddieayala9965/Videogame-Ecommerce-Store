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
  TextField,
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
import CheckoutModal from "../ui/CheckoutModal";

const CartSummary = () => {
  const [cartItems, setCartItems] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(9.99);
  const [warrantyCost, setWarrantyCost] = useState(0);

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

  const handleProceedToCheckout = async (formData) => {
    if (!userId) {
      setSnackbarMessage("User ID not found. Please log in.");
      setOpenSnackbar(true);
      return;
    }

    try {
      const totalAfterDiscount = (
        cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) -
        discount +
        parseFloat(estimatedTax) +
        shipping +
        warrantyCost
      ).toFixed(2);

      const orderData = {
        ...formData,
        gameID: cartItems.map((item) => item.gameID).join(", "),
        title: cartItems.map((item) => item.title).join(", "),
        price: cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
        quantity: cartItems.reduce((acc, item) => acc + item.quantity, 0),
        image_url: cartItems.map((item) => item.image_url).join(", "),
        total_price: totalAfterDiscount,
      };

      await createOrder(orderData, userId);
      setSnackbarMessage("Order placed successfully!");
      setOpenSnackbar(true);

      for (const item of cartItems) {
        await deleteCartItem(item.id);
      }

      setCartItems([]);
      setDiscount(0);
      setShipping(9.99);
      setWarrantyCost(0);
      setPromoCode("");
      setOpenModal(false);
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

  const handleApplyPromoCode = () => {
    if (promoCode === "SAVE10") {
      setDiscount(subtotal * 0.1);
      setSnackbarMessage("Promo code applied successfully!");
    } else {
      setDiscount(0);
      setSnackbarMessage("Invalid promo code.");
    }
    setOpenSnackbar(true);
  };

  const handleToggleWarranty = (itemId, isAdded) => {
    setWarrantyCost((prevCost) =>
      isAdded ? prevCost + 9.99 : prevCost - 9.99
    );
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const estimatedTax = (subtotal * 0.0725).toFixed(2);
  const totalAfterDiscount = subtotal - discount;

  return (
    <>
      <Grid container spacing={2} sx={{ minHeight: "65vh", marginBottom: 0 }}>
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
                  onToggleWarranty={handleToggleWarranty}
                />
              ))}
            </List>
          ) : (
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                }}
              >
                Your cart is empty.
              </Typography>
            </Box>
          )}
        </Grid>

        {cartItems.length > 0 && (
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                width: {
                  xs: "90%",
                  sm: "80%",
                  md: "80%",
                  lg: "80%",
                },
                marginLeft: "auto",
                marginRight: "auto",
                boxShadow: 7,
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" } }}
                >
                  Order Summary
                </Typography>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
                >
                  <Typography variant="body2">
                    Subtotal ({cartItems.length} items)
                  </Typography>
                  <Typography variant="body2">
                    ${subtotal.toFixed(2)}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
                >
                  <Typography variant="body2">Shipping & Handling</Typography>
                  <Typography variant="body2">
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
                >
                  <Typography variant="body2">Estimated Tax</Typography>
                  <Typography variant="body2">${estimatedTax}</Typography>
                </Box>
                {discount > 0 && (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
                  >
                    <Typography variant="body2">Discount</Typography>
                    <Typography variant="body2">
                      -${discount.toFixed(2)}
                    </Typography>
                  </Box>
                )}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
                >
                  <Typography variant="body2">Warranty</Typography>
                  <Typography variant="body2">
                    ${warrantyCost.toFixed(2)}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  mt={2}
                  fontWeight="bold"
                  sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }}
                >
                  <Typography variant="body1">Estimated Total</Typography>
                  <Typography variant="body1">
                    $
                    {(
                      totalAfterDiscount +
                      parseFloat(estimatedTax) +
                      shipping +
                      warrantyCost
                    ).toFixed(2)}
                  </Typography>
                </Box>
                <Box mt={2}>
                  <TextField
                    label="Promo Code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    fullWidth
                    sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
                  />
                  <Button
                    variant="outlined"
                    onClick={handleApplyPromoCode}
                    fullWidth
                    sx={{ mt: 1, fontSize: { xs: "0.8rem", md: "1rem" } }}
                  >
                    Apply Promo Code
                  </Button>
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleFakeCheckout}
                  sx={{
                    mt: 2,
                    mb: 2,
                    width: "80%",
                    backgroundColor: "#ffcc00",
                    color: "#333",
                    "&:hover": {
                      backgroundColor: "#ffb700",
                    },
                    fontSize: { xs: "0.9rem", md: "1rem" },
                  }}
                  disabled={cartItems.length === 0}
                >
                  Checkout
                </Button>
              </CardActions>
            </Card>
          </Grid>
        )}
      </Grid>

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
