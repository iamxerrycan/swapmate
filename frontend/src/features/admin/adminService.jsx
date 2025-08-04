import axios from "axios";

const API_URL = '../../utils/api/axiosInstance.jsx'

export const fetchAllUsers = async (token) => {
  const res = await axios.get(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const fetchAllItems = async (token) => {
  const res = await axios.get(`${API_URL}/items`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const blockUser = async (userId, token) => {
  const res = await axios.put(`${API_URL}/block/${userId}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const unblockUser = async (userId, token) => {
  const res = await axios.put(`${API_URL}/unblock/${userId}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteUser = async (userId, token) => {
  const res = await axios.delete(`${API_URL}/delete/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteItem = async (itemId, token) => {
  const res = await axios.delete(`${API_URL}/item/${itemId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateUserRole = async ({ userId, role }, token) => {
  const res = await axios.put(`${API_URL}/user/${userId}`, { role }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
