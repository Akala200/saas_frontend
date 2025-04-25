import axios from 'axios';
import Cookies from 'js-cookie'; // Ensure this is installed: npm install js-cookie

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Automatically attach token from cookie
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Handle global API errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const message = error.response.data?.message || 'Unknown server error';
      console.error('API error:', message);
    } else {
      console.error('Network/API error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
