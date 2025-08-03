// src/app/store.js

import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import itemReducer from "../features/items/itemSlice";
import profileReducer from "../features/profile/profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    items: itemReducer,
    profile: profileReducer,
  },
});
