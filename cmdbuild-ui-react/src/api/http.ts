import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/services/rest/v3/",
  withCredentials: true, // because CMDBuild uses cookies/sessions
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor for automatic error/logging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error);
    return Promise.reject(error);
  }
);

export default api;
