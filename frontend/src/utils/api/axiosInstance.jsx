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

// import axios from 'axios';
// import { store } from '../../App/store';
// import { logout } from '../../features/auth/authSlice';
// import { toast } from 'react-toastify';

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   withCredentials: true,
// });

// // Request Interceptor
// API.interceptors.request.use(
//   (config) => {
//     const state = store.getState();
//     const token = state.auth?.user?.token;

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// let hasLoggedOut = false;

// // Response Interceptor
// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const { response } = error;

//     if (response?.status === 401 && !hasLoggedOut) {
//       hasLoggedOut = true;
//       store.dispatch(logout());
//       toast.error('Session expired. Please login again.');

//       setTimeout(() => {
//         window.location.href = '/login';
//       }, 1000);
//     }

//     if (response?.status === 500) {
//       toast.error('Server error. Please try again later.');
//     }

//     return Promise.reject(error);
//   }
// );

// export default API;
