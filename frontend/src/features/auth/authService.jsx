// src/features/auth/authService.js
import API from '../../utils/api/axiosInstance';


const register = async (userData) => {
  const response = await API.post('/api/auth/register', userData);
  return response.data; // user + token
};


const login = async (userData) => {
  const response = await API.post('/api/auth/login', userData);
  return response.data; // user + token
};


const forgotPassword = async (email) => {
  const response = await API.post('/api/auth/forgot-password', { email });
  return response.data;
};


const resetPassword = async (token, newPassword) => {
  const response = await API.post(`/api/auth/reset-password/${token}`, { password: newPassword });
  return response.data;
};

const changePassword = async (oldPassword, newPassword) => {
  const response = await API.post(`/api/auth/change-password`, {
    oldPassword,
    newPassword,
  });
  return response.data;
};

const verifyEmail = async (token) => {
  const response = await API.post(`/api/auth/verify-email/${token}`);
  return response.data;
};


export const authService = {
  changePassword,
  register,
  verifyEmail,
  login,
  forgotPassword,  
  resetPassword,   
};
