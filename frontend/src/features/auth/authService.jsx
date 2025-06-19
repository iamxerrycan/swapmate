import axios from "axios";
// import API_URL from "../../utils/axiosInstance";


const API_URL = "http://localhost:5000"; // Replace with your backend URL
// Register User
const register = async (userData) => {
  const response = await axios.post(API_URL + "/api/auth/register", userData);
  return response.data; // Contains user + token
};

// Login User
const login = async (userData) => {
  const response = await axios.post(API_URL + "/api/auth/login", userData);
  return response.data; // Contains user + token
};

export const authService = {
  register,
  login,
};
