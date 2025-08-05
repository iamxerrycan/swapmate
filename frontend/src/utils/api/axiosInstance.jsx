// src/utils/axiosInstance.js

import axios from 'axios';
import { store } from '../../App/store';
import { logout } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';

// Axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// Request Interceptor
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (Single & Clean)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response?.status === 401) {
      // Clear Redux + redirect to login
      store.dispatch(logout());
      toast.error('Session expired. Please login again.');

      // Optional: Prevent multiple redirects
      // if (window.location.pathname !== '/') {
      //   window.location.href = '/';
      // }
    }

    return Promise.reject(error);
  }
);

export default API;
