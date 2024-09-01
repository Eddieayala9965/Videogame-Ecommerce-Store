import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Snackbar,
} from "@mui/material";
import { getUserOrders } from "../../utils/api";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getUserOrders();
        setOrders(response.data);
      } catch (error) {
        setSnackbarMessage("Failed to fetch orders.");
        setOpenSnackbar(true);
      }
    };

    fetchOrders();
  }, []);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Order History
        </Typography>
        <List>
          {orders.map((order) => (
            <ListItem key={order.id}>
              <ListItemText
                primary={`Order ID: ${order.id}`}
                secondary={`Total Price: $${order.total_price}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default OrderHistory;
