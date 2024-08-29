import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: [],
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    addReview(state, action) {
      const newReview = action.payload;
      state.reviews.push(newReview);
    },
    deleteReview(state, action) {
      const id = action.payload;
      state.reviews = state.reviews.filter((review) => review.id !== id);
    },
    updateReview(state, action) {
      const updatedReview = action.payload;
      const existingReviewIndex = state.reviews.findIndex(
        (review) => review.id === updatedReview.id
      );

      if (existingReviewIndex !== -1) {
        state.reviews[existingReviewIndex] = {
          ...state.reviews[existingReviewIndex],
          ...updatedReview,
        };
      }
    },
  },
});

export const { addReview, deleteReview, updateReview } = reviewSlice.actions;
export default reviewSlice.reducer;
