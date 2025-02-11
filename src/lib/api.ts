import axios from 'axios';
import toast from 'react-hot-toast';

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

// Request interceptor
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

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      toast.error('Please check your connection and try again.');
      return Promise.reject(new Error('Network error'));
    }

    const message = error.response?.data?.message || 'Something went wrong';
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    toast.error(message);
    return Promise.reject(error);
  }
);

export default api;