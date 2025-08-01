
// import API from "../../utils/axiosInstance";

// // Register User
// const register = async (userData) => {
//   const response = await API.post("/api/auth/register", userData);
//   return response.data;
// };

// // Login User
// const login = async (userData) => {
//   const response = await API.post("/api/auth/login", userData);
//   return response.data;
// };

// export const authService = {
//   register,
//   login,
// };
















import axios from "axios";
// import API_URL from "../../utils/axiosInstance";


const API_URL = "http://localhost:5001"; // Replace with your backend URL
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


