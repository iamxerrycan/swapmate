import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // Match backend port
  withCredentials: true,
});

export default API;
