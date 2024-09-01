import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Snackbar,
  Button,
  Container,
} from "@mui/material";
import { getUserOrders } from "../../utils/api";
import { useHistory } from "react-router-dom";
import Image from "next/image";

const OrderSummary = () => {
  const [orders, setOrders] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getUserOrders();
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setSnackbarMessage("Failed to load orders.");
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
          Order Summary
        </Typography>
        {orders.length > 0 ? (
          orders.map((order) => (
            <Paper
              key={order.id}
              style={{ padding: "16px", marginBottom: "16px" }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                  <Typography variant="h6">{order.title}</Typography>
                  <Typography variant="body1">Price: ${order.price}</Typography>
                  <Typography variant="body1">
                    Quantity: {order.quantity}
                  </Typography>
                  <Typography variant="body1">
                    Total Price: ${order.total_price}
                  </Typography>
                  <Typography variant="body1">
                    Status: {order.status}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Image
                    src={order.image_url}
                    alt={order.title}
                    width={500}
                    height={300}
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.push(`/order-details/${order.id}`)}
                style={{ marginTop: "16px" }}
              >
                View Details
              </Button>
            </Paper>
          ))
        ) : (
          <Typography variant="body1">You have no orders.</Typography>
        )}
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

export default OrderSummary;
