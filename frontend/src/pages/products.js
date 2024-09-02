import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Grid, Snackbar } from "@mui/material";
import { searchGames } from "../utils/api";
import ProductCard from "../components/Product/ProductCard";

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

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box mt={3}>
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
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ maxWidth: 1200, margin: "0 auto" }}
      >
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.gameID}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default Products;
