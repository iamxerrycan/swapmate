// src/features/items/itemService.js

import API from '../../utils/api/axiosInstance';
import { getToken } from '../../utils/api/tokenHelpers'; 

// 1. GET all items (optionally filtered with query)
const getAllItems = async (query = '') => {
  const res = await API.get(`/api/items${query}`);
  return res.data;
};

// 2. GET item by ID
const getItemById = async (id) => {
  const res = await API.get(`/api/items/${id}`);
  return res.data;
};

// 3. GET items created by logged-in user
const getUserItems = async (token) => {
  const config = getToken(token);
  const res = await API.get('/api/items/user/items', config);
  return res.data;
};

//  4. POST: Create new item
const createItem = async (itemData, token) => {
  const config = getToken(token);
  const res = await API.post('/api/items', itemData, config);
  return res.data;
};

// 5. PUT: Update existing item
const updateItem = async (itemData, id, token) => {
  const config = getToken(token);
  const res = await API.put(`/api/items/${id}`, itemData, config);
  return res.data;
};

// 6. DELETE item
const deleteItem = async (id, token) => {
  const config = getToken(token);
  const res = await API.delete(`/api/items/${id}`, config);
  return res.data;
};

export const itemService = {
  getAllItems,
  getItemById,
  getUserItems,
  createItem,
  updateItem,
  deleteItem,
};
