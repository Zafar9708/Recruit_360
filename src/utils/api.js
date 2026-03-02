// utils/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';




const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authApi = {
  register: (formData) => 
    api.post('/auth/register', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  
  login: (data) => api.post('/auth/login', data),
  
  verifyEmail: (token) => api.get(`/auth/verify/${token}`),
  
  completeProfile: (profileData) => 
    api.post('/auth/complete-profile', profileData),
  
  parseResume: (formData) => 
    api.post('/auth/parse-resume', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  
  getProfile: () => api.get('/auth/profile'),
  
  googleLogin: (data) => api.post('/auth/google', data)
};

export default api;