import React, { useState, useEffect } from "react";
import { TextField, Box, Snackbar } from "@mui/material";
import { searchGames } from "../utils/api";
import ProductCard from "../components/Product/ProductCard";
import ScrollableAppBar from "@/components/Layout/ScrollableAppBar";
import Footer from "@/components/Layout/Footer";

const Products = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await searchGames(query);
        setProducts(response.data);
        if (response.data.length === 0) {
          setSnackbarMessage("No games found for the search query.");
          setOpenSnackbar(true);
        }
      } catch (error) {
        console.error("Search failed:", error);
        setSnackbarMessage("Failed to perform search. Please try again.");
        setOpenSnackbar(true);
      }
    };

    if (query) {
      fetchGames();
    }
  }, [query]);

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box>
      <ScrollableAppBar />
      <Box display="flex" justifyContent="center" mb={2}>
        <TextField
          label="Search Games"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && fetchGames()}
          fullWidth
          margin="normal"
          sx={{ maxWidth: 600 }}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        sx={{ maxWidth: 1200, margin: "0 auto" }}
      >
        {products.map((product) => (
          <Box key={product.gameID} flex="1 1 300px" maxWidth="300px">
            <ProductCard
              product={product}
              onAddToCartSuccess={() =>
                handleSnackbarOpen("Product added to cart!")
              }
              onAddToCartFailure={() =>
                handleSnackbarOpen("Failed to add product to cart.")
              }
            />
          </Box>
        ))}
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
      <Footer />
    </Box>
  );
};

export default Products;
