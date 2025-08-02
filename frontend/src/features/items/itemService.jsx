import API from '../../utils/axiosInstance';
import axios from 'axios';

//  GET all items (with optional query)
const getAllItems = async (query = '') => {
  const res = await API.get(`/api/items${query}`);
  return res.data; // This will be an array
};

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
  const token = localStorage.getItem('token');

  const response = await API.post('/api/items', itemData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

//  PUT to update item
const API_URL = "http://localhost:5001/api/items/";

// itemService.jsx
export const updateItem = async (itemData, id, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Pass token here
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.put(
      `/api/items/${id}`,
      itemData,
      config
    );

    return response.data;
  } catch (error) {
    console.error("Update item error:", error);
    throw error;
  }
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




