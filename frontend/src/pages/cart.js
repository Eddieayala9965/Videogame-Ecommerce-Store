import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Grid, CardMedia } from "@mui/material";
import { getCartItems, deleteCartItem } from "../utils/api";
import Cookies from "js-cookie";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const userId = Cookies.get("user_id");
      if (!userId) return;

      try {
        const response = await getCartItems(userId);
        setCartItems(response.data);
      } catch (error) {
        console.error("Failed to fetch cart items", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveFromCart = async (cartId) => {
    try {
      await deleteCartItem(cartId);
      setCartItems(cartItems.filter((item) => item.id !== cartId));
    } catch (error) {
      console.error("Failed to remove item from cart", error);
    }
  };

  return (
    <Box mt={3}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="h6">Your cart is empty.</Typography>
      ) : (
        <Grid container spacing={2}>
          {cartItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Box
                sx={{ padding: 2, border: "1px solid #ccc", borderRadius: 2 }}
              >
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2">Price: ${item.price}</Typography>
                <Typography variant="body2">
                  Quantity: {item.quantity}
                </Typography>
                {item.image_url && (
                  <CardMedia
                    component="img"
                    image={item.image_url}
                    alt={item.title}
                    width={500}
                    height={500}
                  />
                )}
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleRemoveFromCart(item.id)}
                  sx={{ mt: 2 }}
                >
                  Remove from Cart
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Cart;
