// config.js
import axios from "axios";

const BASE_URL = `http://${window.location.hostname}:3000/customer`;

const api = axios.create({
  baseURL: BASE_URL,
});

// Set up an interceptor to add the token to each request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve the token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
