import API from '../../utils/api/axiosInstance.jsx';
// import { getToken } from '../../utils/api/tokenHelpers';
// 1. Get current logged-in user
export const getMeAPI = async () => {
  const res = await API.get('/me');
  return res.data;
};

// 2. Update profile (name, bio, profilePic)
export const updateProfileAPI = async (updatedData) => {
  const res = await API.put('/api/user/me', updatedData);
  return res.data;
};

// 3. Delete own account
export const deleteAccountAPI = async () => {
  const res = await API.delete('/api/user/me');
  return res.data;
};

// 4. Get all users (Admin only)
export const getAllUsersAPI = async () => {
  const res = await API.get('/');
  return res.data;
};

// 5. Get single user by ID
export const getUserByIdAPI = async (id) => {
  const res = await API.get(`/${id}`);
  return res.data;
};
