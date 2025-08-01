import API from '../../utils/axiosInstance';

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
