import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  orderStatus: "idle",
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    placeOrder(state, action) {
      const newOrder = action.payload;
      state.orders.push(newOrder);
      state.orderStatus = "success";
    },
    cancelOrder(state, action) {
      const id = action.payload;
      state.orders = state.orders.filter((order) => order.id !== id);
      state.orderStatus = "canceled";
    },
    setOrderStatus(state, action) {
      state.orderStatus = action.payload;
    },
    setOrderError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { placeOrder, cancelOrder, setOrderStatus, setOrderError } =
  orderSlice.actions;
export default orderSlice.reducer;
