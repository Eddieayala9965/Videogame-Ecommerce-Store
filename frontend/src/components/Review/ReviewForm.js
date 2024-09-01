import React, { useState } from "react";
import { Box, Button, TextField, Snackbar } from "@mui/material";
import { createReview } from "../../utils/api";
import Cookies from "js-cookie";

const ReviewForm = ({ productId }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = Cookies.get("user_id");
    try {
      await createReview({ gameID: productId, comment, rating }, userId);
      setSnackbarMessage("Review added successfully!");
      setOpenSnackbar(true);
      setComment("");
      setRating(0);
    } catch (error) {
      setSnackbarMessage("Failed to add review.");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Comment"
        variant="outlined"
        fullWidth
        margin="normal"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <TextField
        label="Rating"
        variant="outlined"
        type="number"
        fullWidth
        margin="normal"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Add Review
      </Button>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default ReviewForm;
