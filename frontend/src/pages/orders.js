import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  List,
  Snackbar,
  Paper,
  Grid,
  Button,
  CardMedia,
} from "@mui/material";
import { getUserOrders } from "../utils/api";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const router = useRouter();
  const userId = Cookies.get("user_id");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) {
        setSnackbarMessage("User ID not found. Please log in.");
        setOpenSnackbar(true);
        return;
      }

      try {
        const response = await getUserOrders(userId);
        setOrders(response.data);
      } catch (error) {
        setSnackbarMessage("Failed to fetch orders.");
        setOpenSnackbar(true);
      }
    };

    fetchOrders();
  }, [userId]);

  const handleViewDetails = (orderId) => {
    router.push(`/order-details/${orderId}`);
  };

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
          {orders.length > 0 ? (
            orders.map((order) => (
              <Paper
                key={order.id}
                style={{ padding: "16px", marginBottom: "16px" }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={
                        order.image_url || "https://via.placeholder.com/150"
                      }
                      alt={order.title}
                    />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Typography variant="h6">{order.title}</Typography>
                    <Typography variant="body1">
                      Quantity: {order.quantity}
                    </Typography>
                    <Typography variant="body1">
                      Total Price: ${order.total_price}
                    </Typography>
                    <Typography variant="body1">
                      Status: {order.status}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleViewDetails(order.id)}
                      style={{ marginTop: "8px" }}
                    >
                      View Details
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            ))
          ) : (
            <Typography variant="body1">You have no orders.</Typography>
          )}
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

export default Orders;
