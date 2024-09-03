import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const CheckoutModal = ({ open, handleClose, handleProceedToCheckout }) => {
  const [cardInfo, setCardInfo] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation or processing logic if needed
    handleProceedToCheckout();
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="checkout-modal-title"
      aria-describedby="checkout-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          id="checkout-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Payment & Shipping Info
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Card Information"
            variant="outlined"
            value={cardInfo}
            onChange={(e) => setCardInfo(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Shipping Address"
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Proceed to Checkout
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default CheckoutModal;
