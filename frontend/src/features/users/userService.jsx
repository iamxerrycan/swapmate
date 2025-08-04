import {
getMeAPI,
updateProfileAPI,
deleteAccountAPI,
getAllUsersAPI,
getUserByIdAPI,
} from './userAPI';

// Get current user
export const getMe = async (token) => {
  const res = await getMeAPI(token);
  return res;
}

// Update profile
export const updateProfile = async (updatedData, token) => {
  const res = await updateProfileAPI(updatedData, token);
  return res;
}

// Delete account
export const deleteAccount = async (token) => {
  const res = await deleteAccountAPI(token);
  return res;
}

// Get all users (admin only)
export const getAllUsers = async (token) => {
  const res = await getAllUsersAPI(token);
  return res;
}

// Get user by ID
export const getUserById = async (id, token) => {
  const res = await getUserByIdAPI(id, token);
  return res;
}

const userService = {
  getMe,
  updateProfile,
  deleteAccount,
  getAllUsers,
  getUserById,
};

export default userService;
