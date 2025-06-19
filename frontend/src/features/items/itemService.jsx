import API from "../../utils/axiosInstance";

// const API = axios.create({
//   baseURL: "http://localhost:5000",
//   withCredentials: true,
// });
//  GET all items (with optional query)
const getAllItems = async (query = "") => {
  const res = await API.get(`/api/items${query}`);
  return res.data; // This will be an array
};

// const getAllItems = async () =>{
//   const response = await API.get(`/api/items`);
//   return response.data; // This will be an array
// }

// GET item by ID   
const getItemById = async (id) => {
  const response = await API.get(`/api/items/${id}`);
  return response.data;
};

//  GET all items of logged-in user
const getUserItems = async () => {
  const response = await API.get(`/api/items/user/items`);
  return response.data;
};

//  POST a new item (with or without file)
const createItem = async (itemData) => {
  const response = await API.post(`/api/items`, itemData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

//  PUT to update item
const updateItem = async (id, updatedData) => {
  const response = await API.put(`/api/items/${id}`, updatedData);
  return response.data;
};

//  DELETE an item
const deleteItem = async (id) => {
  const response = await API.delete(`/api/items/${id}`);
  return response.data;
};

export const itemService = {
  getAllItems,
  getItemById,
  getUserItems,
  createItem,
  updateItem,
  deleteItem,
};
