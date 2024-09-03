import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Modal,
  Rating,
} from "@mui/material";
import { addToCart } from "../../utils/api";
import Cookies from "js-cookie";

const ProductCard = ({ product, onAddToCartSuccess, onAddToCartFailure }) => {
  const [openModal, setOpenModal] = useState(false);
  const [randomSystem, setRandomSystem] = useState("");
  const [randomReviews, setRandomReviews] = useState(0);
  const [randomRating, setRandomRating] = useState(0);

  const handleAddToCart = async () => {
    const userId = Cookies.get("user_id");
    if (!userId) {
      onAddToCartFailure("User not logged in.");
      return;
    }

    try {
      await addToCart({
        user_id: userId,
        gameID: product.gameID,
        title: product.external,
        price: product.cheapest,
        quantity: 1,
        image_url: product.thumb || "https://via.placeholder.com/150",
      });
      onAddToCartSuccess("Product added to cart!");
    } catch (error) {
      onAddToCartFailure("Failed to add product to cart.");
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    const gamingSystems = [
      "PS4",
      "Xbox One",
      "Switch",
      "PC",
      "PS5",
      "Xbox Series X",
    ];
    setRandomSystem(
      gamingSystems[Math.floor(Math.random() * gamingSystems.length)]
    );
    setRandomReviews(Math.floor(Math.random() * 1000) + 1);
    setRandomRating(Math.random() * 2 + 3);
  }, []);

  return (
    <Card
      sx={{
        flex: "1 1 calc(25% - 16px)",
        margin: "8px",
        textAlign: "center",
        padding: 2,
        borderRadius: 2,
        boxShadow: 3,
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
        },
        "@media (max-width: 1200px)": {
          flex: "1 1 calc(33.333% - 16px)",
        },
        "@media (max-width: 900px)": {
          flex: "1 1 calc(50% - 16px)",
        },
        "@media (max-width: 600px)": {
          flex: "1 1 100%",
        },
      }}
    >
      <CardMedia
        component="img"
        sx={{
          height: 200,
          width: "100%",
          objectFit: "contain",
          objectPosition: "center",
          backgroundColor: "#f5f5f5",
          marginBottom: 3,
        }}
        image={product.thumb || "https://via.placeholder.com/150"}
        alt={product.external}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {product.external}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: 1 }}
        >
          {randomSystem}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Rating
            name="read-only"
            value={randomRating}
            precision={0.1}
            readOnly
            size="small"
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({randomReviews})
          </Typography>
        </Box>
        <Typography
          variant="body1"
          color="primary"
          sx={{ fontWeight: "bold", mb: 1 }}
        >
          ${product.cheapest}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Pros Save 5% When You Buy Online
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleAddToCart}
          sx={{
            backgroundColor: "#ffcc00",
            color: "#333",
            "&:hover": {
              backgroundColor: "#ffb700",
            },
          }}
        >
          Add to Cart
        </Button>
      </CardContent>

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
        ></Box>
      </Modal>
    </Card>
  );
};

export default ProductCard;
