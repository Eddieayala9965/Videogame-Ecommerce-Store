import axios from "axios";
import Cookies from "js-cookie";

const NEXT_BACKEND_URL = process.env.NEXT_BACKEND_URL;

const api = axios.create({
  baseURL: NEXT_BACKEND_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth endpoints

export const loginUser = async (loginData) => {
  const formData = new URLSearchParams();
  formData.append("username", loginData.username);
  formData.append("password", loginData.password);
  return api.post("/auth/login", formData);
};

export const registerUser = async (userData) => {
  return api.post("/auth/register", userData);
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await api.put(`/auth/update_user/${userId}`, userData);
    return response.data; // Return the updated user data
  } catch (error) {
    console.error(
      "Failed to update user:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to update user");
  }
};

export const getUserProfile = async (userId) => {
  try {
    const response = await api.get(`/auth/user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user profile");
  }
};

// Cart endpoints

export const getCartItems = async (userId) => {
  return api.get(`/cart`, { params: { user_id: userId } });
};

// Add an item to the user's cart
export const addToCart = async (cartItem) => {
  return api.post(`/cart`, cartItem);
};

// Update the quantity of a specific cart item
export const updateCartItem = async (cartId, newQuantity) => {
  return api.put(`/cart/${cartId}`, { quantity: newQuantity });
};

// Delete a specific cart item
export const deleteCartItem = async (cartId) => {
  return api.delete(`/cart/${cartId}`);
};

export const incrementCartItem = async (cartId) => {
  return api.put(`/cart/${cartId}/increment`);
};

export const decrementCartItem = async (cartId) => {
  return api.put(`/cart/${cartId}/decrement`);
};

// order endpoints

export const createOrder = async (orderData, userId) => {
  return api.post(`/orders`, { user_id: userId, ...orderData });
};

export const getUserOrders = async (userId) => {
  return api.get(`/orders`, { params: { user_id: userId } });
};

export const deleteOrder = async (orderId) => {
  try {
    const response = await api.delete(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("Order not found");
    }
    throw new Error("Failed to delete order");
  }
};

// review endpoints

export const createReview = async (reviewData, userId) => {
  return api.post(`/reviews`, { user_id: userId, ...reviewData });
};

export const getReviewsForGame = async (gameID) => {
  return api.get(`/reviews/game/${gameID}`);
};

export const updateReview = async (reviewId, reviewData) => {
  return api.put(`/reviews/${reviewId}`, reviewData);
};

export const deleteReview = async (reviewId) => {
  return api.delete(`/reviews/${reviewId}`);
};

// game search endpoint

export const searchGames = async (query) => {
  return api.get(`/games/search`, { params: { query } });
};

export default api;
