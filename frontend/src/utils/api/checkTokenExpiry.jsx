// src/utils/checkTokenExpiry.js
export const isTokenExpired = (token) => {
  if (!token) return true;
  // const [, payload] = token.split('.');
  // const decoded = JSON.parse(atob(payload));
  // const exp = decoded.exp * 1000;
  return false;
};
