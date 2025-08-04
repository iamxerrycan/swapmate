// src/app/store.js

import { configureStore } from '@reduxjs/toolkit';

// Reducers
import adminReducer from '../features/admin/adminSlice'; // Admin actions
import authReducer from '../features/auth/authSlice'; // Login/Register/Auth user
import itemReducer from '../features/items/itemSlice'; // Items create/update/delete
import swapReducer from '../features/swap/swapSlice'; // Profile-related actions
import userReducer from '../features/users/userSlice'; // List of users for admin

export const store = configureStore({
  reducer: {
    auth: authReducer,
    items: itemReducer,
    profile: swapReducer,
    admin: adminReducer,
    users: userReducer,
  },
});


// src/app/store.js
//pehle wala sttttttttttttttore
// import { configureStore } from "@reduxjs/toolkit";

// import authReducer from "../features/auth/authSlice";
// import itemReducer from "../features/items/itemSlice";
// import profileReducer from "../features/profile/profileSlice";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     items: itemReducer,
//     profile: profileReducer,
//   },
// });
