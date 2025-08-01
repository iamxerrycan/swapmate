import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001", // Match backend port
  withCredentials: true,
});

export default API;
