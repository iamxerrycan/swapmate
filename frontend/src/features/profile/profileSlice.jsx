// src/features/profile/profileSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  updateUserProfile,
  deleteUserProfile
} from './profileService';

import {
  UPDATE_PROFILE,
  DELETE_PROFILE
} from './profileTypes';

const initialState = {
  profile: null,
  loading: false,
  error: null,
  success: false,
};

// 🔁 Update Profile Thunk
export const updateProfile = createAsyncThunk(
  UPDATE_PROFILE,
  async (userData, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth.user;
      return await updateUserProfile(userData, token);
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      return rejectWithValue(message);
    }
  }
);

// ❌ Delete Profile Thunk
export const deleteProfile = createAsyncThunk(
  DELETE_PROFILE,
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth.user;
      return await deleteUserProfile(token);
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      return rejectWithValue(message);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetProfile: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔁 update profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      })

      // ❌ delete profile
      .addCase(deleteProfile.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(deleteProfile.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.profile = null;
      })
      .addCase(deleteProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete profile';
      });
  },
});

export const { resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
