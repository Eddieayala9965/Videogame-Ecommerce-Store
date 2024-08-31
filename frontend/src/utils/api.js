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

export const registerUser = async (userData) => {
  return api.post("/auth/register", userData);
};

export const loginUser = async (loginData) => {
  return api.post("/auth/login", loginData);
};

// Cart endpoints

export const getCartItems = async (userId) => {
  return api.get(`/cart?user_id=${userId}`);
};

export const addToCart = async (cartItem, userId) => {
  return api.post(`/cart/${userId}`, cartItem);
};

export const updateCartItem = async (cartId, cartItem) => {
  return api.put(`/cart/${cartId}`, cartItem);
};

export const deleteCartItem = async (cartId) => {
  return api.delete(`/cart/${cartId}`);
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
