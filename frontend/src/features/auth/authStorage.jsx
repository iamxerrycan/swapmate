// src/features/auth/authStorage.js

const USER_KEY = 'user';
const TOKEN_KEY = 'token';

export const getStoredUser = () => {
  const stored = localStorage.getItem(USER_KEY);
  return stored && stored !== 'undefined' ? JSON.parse(stored) : null;
};

export const getStoredToken = () => {
  return localStorage.getItem(TOKEN_KEY) || null;
};

export const saveUserToStorage = (user, token) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeUserFromStorage = () => {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
};
