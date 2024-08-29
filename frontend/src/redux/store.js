import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import reviewReducer from "./slices/reviewSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    review: reviewReducer,
    user: userReducer,
  },
});

export default store;
