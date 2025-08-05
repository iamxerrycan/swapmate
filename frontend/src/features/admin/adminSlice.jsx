// src/features/admin/adminSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as adminService from './adminService';
import { fetchAllUsers } from './adminService';
import { getToken } from '../../utils/api/tokenHelpers';

// 👉 Async Thunks
// export const getAllUsers = createAsyncThunk(
//   'admin/getAllUsers',
//   async (_, thunkAPI) => {
//     try {
//       return await adminService.fetchAllUsers(getToken(thunkAPI));
//     } catch (err) {
//       return thunkAPI.rejectWithValue(
//         err.response?.data?.message || 'Failed to fetch users'
//       );
//     }
//   }
// );

export const getAllUsers = createAsyncThunk(
  'admin/getAllUsers',
  async (_, thunkAPI) => {
    try {
      return await fetchAllUsers(); // No need to pass token
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error');
    }
  }
);

export const getAllItems = createAsyncThunk(
  'admin/getAllItems',
  async (_, thunkAPI) => {
    try {
      return await adminService.fetchAllItems(getToken(thunkAPI));
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const blockUser = createAsyncThunk(
  'admin/blockUser',
  async (id, thunkAPI) => {
    try {
      return await adminService.blockUser(id, getToken(thunkAPI));
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const unblockUser = createAsyncThunk(
  'admin/unblockUser',
  async (id, thunkAPI) => {
    try {
      return await adminService.unblockUser(id, getToken(thunkAPI));
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'admin/deleteUser',
  async (id, thunkAPI) => {
    try {
      return await adminService.deleteUser(id, getToken(thunkAPI));
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const deleteItem = createAsyncThunk(
  'admin/deleteItem',
  async (id, thunkAPI) => {
    try {
      return await adminService.deleteItem(id, getToken(thunkAPI));
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const updateUserRole = createAsyncThunk(
  'admin/updateUserRole',
  async ({ userId, role }, thunkAPI) => {
    try {
      return await adminService.updateUserRole(
        { userId, role },
        getToken(thunkAPI)
      );
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    users: [],
    items: [],
    isLoading: false,
    error: null,
    message: null,
  },
  reducers: {
    resetAdminState: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // Users
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        console.log('Fetched users:', action.payload);
        state.isLoading = false;
        state.users = action.payload; // This should be an array
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.isLoading = false;
      })

      // Items
      .addCase(getAllItems.fulfilled, (state, action) => {
        state.items = action.payload;
      })

      // Block, Unblock, Delete, Update Role - optional updates here
      .addCase(blockUser.fulfilled, (state, action) => {
        const i = state.users.findIndex((u) => u._id === action.payload._id);
        if (i !== -1) state.users[i] = action.payload;
      })
      .addCase(unblockUser.fulfilled, (state, action) => {
        const i = state.users.findIndex((u) => u._id === action.payload._id);
        if (i !== -1) state.users[i] = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u._id !== action.meta.arg);
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter((i) => i._id !== action.meta.arg);
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        const i = state.users.findIndex((u) => u._id === action.payload._id);
        if (i !== -1) state.users[i] = action.payload;
      });
  },
});

// export const { resetAdminState } = adminSlice.actions;
export default adminSlice.reducer;
