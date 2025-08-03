// src/features/auth/authSlice.js

import { createSlice } from '@reduxjs/toolkit';
import {
  getStoredUser,
  getStoredToken,
  saveUserToStorage,
  removeUserFromStorage,
} from './authStorage';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getStoredUser(),
    token: getStoredToken(),
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      saveUserToStorage(user, token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      removeUserFromStorage();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
