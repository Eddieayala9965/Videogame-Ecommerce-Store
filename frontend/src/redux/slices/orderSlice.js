import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    placeOrder(state, action) {
      const newOrder = action.payload;
      state.orders.push(newOrder);
    },
    cancelOrder(state, action) {
      const id = action.payload;
      state.orders = state.orders.filter((order) => order.id !== id);
    },
  },
});

export const { placeOrder, cancelOrder } = createSlice.actions;
export default orderSlice.reducer;
