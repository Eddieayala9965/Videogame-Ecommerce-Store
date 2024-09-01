import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
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
    return response.data;
  } catch (error) {
    throw new Error("Failed to update user");
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/auth/delete_user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete user");
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
  return api.get(`/orders?user_id=${userId}`);
};

export const updateOrderStatus = async (orderId, orderData) => {
  return api.put(`/orders/${orderId}`, orderData);
};

export const deleteOrder = async (orderId) => {
  return api.delete(`/orders/${orderId}`);
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
