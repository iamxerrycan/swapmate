import axios from 'axios';

const API_URL = '/api/users';

// 1. Get current logged-in user
export const getMeAPI = async (token) => {
  const res = await axios.get(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// 2. Update profile (name, bio, profilePic)
export const updateProfileAPI = async (updatedData, token) => {
  const res = await axios.put(`${API_URL}/me`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// 3. Delete own account
export const deleteAccountAPI = async (token) => {
  const res = await axios.delete(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// 4. Get all users (Admin only)
export const getAllUsersAPI = async (token) => {
  const res = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// 5. Get single user by ID
export const getUserByIdAPI = async (id, token) => {
  const res = await axios.get(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
