// src/utils/api/tokenHelpers.js

/**
 * Generate Authorization headers for protected API requests.
 * @param {string} token - Bearer token
 * @returns {object} headers with Authorization and Content-Type
 */
export const getToken = (token) => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});
