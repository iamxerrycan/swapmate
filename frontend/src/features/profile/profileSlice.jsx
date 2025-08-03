import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import API from '../../utils/api/axiosInstance';
// 🔁 Async thunk: update user profile
export const updateProfile = createAsyncThunk(
  'profile/update',
  async (userData, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { user },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await API.put('/api/user/profile', userData, config);
      return data;
    } catch (err) {
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      return rejectWithValue(message);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    userInfo: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetProfileState: (state) => {
      state.userInfo = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.success = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetProfileState } = profileSlice.actions;
export default profileSlice.reducer;
