// src/features/profile/profileService.js

import API from '../../utils/api/axiosInstance';
import { getToken } from '../../utils/api/tokenHelpers';

/**
 * Call API to update user profile
 * @param {object} userData - profile data to update
 * @param {string} token - auth token
 * @returns {Promise<object>} updated user data
 */
export const updateUserProfile = async (userData, token) => {
  const config = getToken(token);
  const response = await API.put('/api/user/profile', userData, config);
  return response.data;
};

/**
 * Delete current user profile
 * @param {string} token - auth token
 * @returns {Promise<object>} success message
 */
export const deleteUserProfile = async (token) => {
  const config = getToken(token);
  const response = await API.delete('/api/user/profile', config);
  return response.data;
};