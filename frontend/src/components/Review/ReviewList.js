import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText, Button, Box } from "@mui/material";
import { deleteReview, getReviewsForGame } from "../../utils/api";

const ReviewList = ({ gameID }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getReviewsForGame(gameID);
        setReviews(response.data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };
    fetchReviews();
  }, [gameID]);

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      setReviews(reviews.filter((review) => review.id !== reviewId));
    } catch (error) {
      console.error("Failed to delete review:", error);
    }
  };

  return (
    <List>
      {reviews.map((review) => (
        <ListItem key={review.id}>
          <ListItemText
            primary={review.comment}
            secondary={`Rating: ${review.rating}`}
          />
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => console.log("Update review:", review.id)}
            >
              Update
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleDeleteReview(review.id)}
            >
              Delete
            </Button>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default ReviewList;
