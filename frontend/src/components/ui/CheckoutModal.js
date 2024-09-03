import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Grid,
} from "@mui/material";

const states = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

const months = Array.from({ length: 12 }, (_, i) =>
  (i + 1).toString().padStart(2, "0")
);
const years = Array.from({ length: 10 }, (_, i) =>
  (new Date().getFullYear() + i).toString().slice(-2)
);

const CheckoutModal = ({ open, handleClose, handleProceedToCheckout }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    payment_method: "Credit Card",
    card_number: "",
    card_expiration_month: "",
    card_expiration_year: "",
    card_cvv: "",
    billing_address: "",
    billing_city: "",
    billing_state: "",
    billing_zip_code: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCardNumberChange = (event) => {
    const { value } = event.target;
    const formattedValue = value
      .replace(/\s?/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
    setFormData((prevData) => ({
      ...prevData,
      card_number: formattedValue,
    }));
  };

  const handleSubmit = () => {
    const {
      card_cvv,
      card_expiration_month,
      card_expiration_year,
      ...dataToSubmit
    } = formData;
    dataToSubmit.card_expiration_date = `${card_expiration_month}/${card_expiration_year}`;
    handleProceedToCheckout(dataToSubmit);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Checkout</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="name"
                label="Name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="address"
                label="Shipping Address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="city"
                label="City"
                value={formData.city}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                select
                name="state"
                label="State"
                value={formData.state}
                onChange={handleInputChange}
              >
                {states.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="zip_code"
                label="ZIP Code"
                value={formData.zip_code}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                select
                name="payment_method"
                label="Payment Method"
                value={formData.payment_method}
                onChange={handleInputChange}
              >
                <MenuItem value="Credit Card">Credit Card</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="card_number"
                label="Card Number"
                value={formData.card_number}
                onChange={handleCardNumberChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                select
                name="card_expiration_month"
                label="Expiration Month"
                value={formData.card_expiration_month}
                onChange={handleInputChange}
              >
                {months.map((month) => (
                  <MenuItem key={month} value={month}>
                    {month}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                select
                name="card_expiration_year"
                label="Expiration Year"
                value={formData.card_expiration_year}
                onChange={handleInputChange}
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="card_cvv"
                label="CVV"
                value={formData.card_cvv}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="billing_address"
                label="Billing Address"
                value={formData.billing_address}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="billing_city"
                label="Billing City"
                value={formData.billing_city}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                select
                name="billing_state"
                label="Billing State"
                value={formData.billing_state}
                onChange={handleInputChange}
              >
                {states.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="billing_zip_code"
                label="Billing ZIP Code"
                value={formData.billing_zip_code}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Proceed to Checkout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CheckoutModal;
