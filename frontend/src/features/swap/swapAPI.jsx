// src/features/swap/swapAPI.js
import API from '../../utils/api/axiosInstance';
// import axios from 'axios';

// Create a swap request
export const createSwapRequestAPI = async (data, token) => {
  const res = await API.post('/api/swaps/sendrequest', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Get all swap requests (for user or admin based on backend logic)
export const getAllSwapRequestsAPI = async (token) => {
  const res = await API.get('/api/swap', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Get swap request by ID
export const getSwapRequestByIdAPI = async (id, token) => {
  const res = await API.get(`/api/swap/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Update swap request
export const updateSwapRequestAPI = async (id, updatedData, token) => {
  const res = await API.put(`/api/swap/${id}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Delete swap request
export const deleteSwapRequestAPI = async (id, token) => {
  const res = await API.delete(`/api/swap/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};
// Get swaps for current user
export const getMySwapsAPI = async (token) => {
  const res = await API.get('/api/swap/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Accept swap request
export const acceptSwapRequestAPI = async (id, token) => {
  const res = await API.put(
    `/api/swap/${id}/accept`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

// Reject swap request
export const rejectSwapRequestAPI = async (id, token) => {
  const res = await API.put(
    `/api/swap/${id}/reject`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res.data;
};
// Cancel swap request (by sender)
export const cancelSwapRequestAPI = async (id, token) => {
  const res = await API.put(
    `/api/swap/${id}/cancel`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res.data;
};
