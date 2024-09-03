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
  Modal,
  Divider,
} from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Footer from "@/components/Layout/Footer";
import { getUserOrders, deleteOrder } from "../utils/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openModal, setOpenModal] = useState(false);
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

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setOpenModal(true);
  };

  const handleDeleteOrder = async (orderId) => {
    if (!orderId) {
      setSnackbarMessage("Order ID is missing. Cannot delete order.");
      setOpenSnackbar(true);
      return;
    }

    try {
      await deleteOrder(orderId);
      setOrders(orders.filter((order) => order.id !== orderId));
      setSnackbarMessage("Order deleted successfully.");
      setOpenSnackbar(true);
      setOpenModal(false);
    } catch (error) {
      setSnackbarMessage(error.message);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const currentDate = new Date().toLocaleString();

  return (
    <>
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
                  sx={{
                    padding: "16px",
                    marginBottom: "16px",
                    border: "1px solid #e0e0e0",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
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
                        sx={{
                          borderRadius: "8px",
                          objectFit: "cover",
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <Typography variant="h6">{order.title}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Quantity: {order.quantity}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Total Price: ${order.total_price.toFixed(2)}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Status: {order.status}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleViewDetails(order)}
                        sx={{ marginTop: "8px" }}
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

        <Modal open={openModal} onClose={handleCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              p: 4,
              borderRadius: 2,
              boxShadow: 24,
            }}
          >
            {selectedOrder && (
              <>
                <Typography variant="h6" gutterBottom>
                  Order Receipt
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1">
                  <strong>Name:</strong> {selectedOrder.name}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {selectedOrder.email}
                </Typography>
                <Typography variant="body1">
                  <strong>Shipping Address:</strong>{" "}
                  {`${selectedOrder.address}, ${selectedOrder.city}, ${selectedOrder.state}, ${selectedOrder.zip_code}`}
                </Typography>
                <Typography variant="body1">
                  <strong>Billing Address:</strong>{" "}
                  {`${selectedOrder.billing_address}, ${selectedOrder.billing_city}, ${selectedOrder.billing_state}, ${selectedOrder.billing_zip_code}`}
                </Typography>
                <Typography variant="body1">
                  <strong>Card Number:</strong> **** **** ****{" "}
                  {selectedOrder.card_number.slice(-4)}
                </Typography>
                <Typography variant="body1">
                  <strong>Payment Method:</strong>{" "}
                  {selectedOrder.payment_method}
                </Typography>
                <Typography variant="body1">
                  <strong>Order Date:</strong> {currentDate}
                </Typography>
                <Typography variant="body1">
                  <strong>Status:</strong> {selectedOrder.status}
                </Typography>
                <Box mt={3}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteOrder(selectedOrder.id)}
                    fullWidth
                    sx={{ mb: 2 }}
                  >
                    Delete Order
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleCloseModal}
                    fullWidth
                  >
                    Close
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Modal>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
        />
      </Container>
      <Footer />
    </>
  );
};

export default Orders;
