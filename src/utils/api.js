import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1", // your backend URL
});

// Automatically attach JWT token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  register: (formData) => api.post("/auth/register", formData),
  login: (credentials) => api.post("/auth/login", credentials),

  // ⚡ Correct method name for email verification
  verifyEmail: (token) => api.get(`/auth/verify/${token}`),

  getProfile: () => api.get("/auth/me"),
};

export default api;
