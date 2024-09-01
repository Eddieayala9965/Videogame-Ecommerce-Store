import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Snackbar,
  Modal,
} from "@mui/material";
import { addToCart } from "../../utils/api";
import Cookies from "js-cookie";
import ReviewList from "../Review/ReviewList";
import ReviewForm from "../Review/ReviewForm";

const ProductCard = ({ product }) => {
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [reviews, setReviews] = useState([]);

  const handleAddToCart = async () => {
    const userId = Cookies.get("user_id");
    try {
      await addToCart(
        {
          gameID: product.gameID,
          title: product.external,
          price: product.cheapest,
        },
        userId
      );
      setSnackbarMessage("Product added to cart!");
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage("Failed to add product to cart.");
      setOpenSnackbar(true);
    }
  };

  const handleOpenModal = () => setOpenModal(true);

  const handleCloseModal = () => setOpenModal(false);

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <Card
      sx={{
        width: 375,
        margin: 1,
        textAlign: "center",
        padding: 2,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <CardMedia
        component="img"
        sx={{
          height: 275,
          width: "100%",
          objectFit: "contain", // Ensure the entire image fits within the container
          objectPosition: "center",
          backgroundColor: "#f5f5f5", // Optional: Add a background color to fill the space around the image
        }}
        image={product.thumb || "https://via.placeholder.com/150"}
        alt={product.external}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {product.external}
        </Typography>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Price: {product.cheapest}
          </Typography>
        </Box>
        <Box>
          <Button variant="contained" color="primary" onClick={handleAddToCart}>
            Add to Cart
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleOpenModal}
            sx={{ ml: 2 }}
          >
            View/Add Reviews
          </Button>
        </Box>
      </CardContent>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />

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
          }}
        >
          <Typography variant="h6" component="h2">
            Reviews for {product.external}
          </Typography>
          <ReviewForm productId={product.gameID} />
          <ReviewList gameID={product.gameID} reviews={reviews} />
        </Box>
      </Modal>
    </Card>
  );
};

export default ProductCard;
