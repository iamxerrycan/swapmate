// src/features/swap/swapAPI.js
import axios from 'axios';
const API_URL = '../../utils/api/axiosInstance.jsx'

// Create a swap request
export const createSwapRequestAPI = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.post(`${API_URL}`, data, config);
  return res.data;
};

// Get all swap requests (for user or admin based on backend logic)
export const getAllSwapRequestsAPI = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(`${API_URL}`, config);
  return res.data;
};

// Get swap request by ID
export const getSwapRequestByIdAPI = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(`${API_URL}/${id}`, config);
  return res.data;
};

// Update swap request
export const updateSwapRequestAPI = async (id, updatedData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.put(`${API_URL}/${id}`, updatedData, config);
  return res.data;
};

// Delete swap request
export const deleteSwapRequestAPI = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.delete(`${API_URL}/${id}`, config);
  return res.data;
};

// Get swaps for current user
export const getMySwapsAPI = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(`/api/swap/my`, config);
  return res.data;
};

// Accept swap request
export const acceptSwapRequestAPI = async (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.put(`/api/swap/${id}/accept`, {}, config);
  return res.data;
};

// Reject swap request
export const rejectSwapRequestAPI = async (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.put(`/api/swap/${id}/reject`, {}, config);
  return res.data;
};

// Cancel swap request (by sender)
export const cancelSwapRequestAPI = async (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.put(`/api/swap/${id}/cancel`, {}, config);
  return res.data;
};
