import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getMeAPI,
  updateProfileAPI,
  deleteAccountAPI,
  getAllUsersAPI,
  getUserByIdAPI,
} from './userAPI';

const initialState = {
  profile: null,
  users: [],
  singleUser: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// Thunks
export const getMe = createAsyncThunk('user/getMe', async (token, thunkAPI) => {
  try {
    return await getMeAPI(token);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const updateProfile = createAsyncThunk('user/updateProfile', async ({ updatedData, token }, thunkAPI) => {
  try {
    return await updateProfileAPI(updatedData, token);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const deleteAccount = createAsyncThunk('user/deleteAccount', async (token, thunkAPI) => {
  try {
    return await deleteAccountAPI(token);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const getAllUsers = createAsyncThunk('user/getAllUsers', async (token, thunkAPI) => {
  try {
    return await getAllUsersAPI(token);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const getUserById = createAsyncThunk('user/getUserById', async ({ id, token }, thunkAPI) => {
  try {
    return await getUserByIdAPI(id, token);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.profile = null;
      state.users = [];
      state.singleUser = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // getMe
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // updateProfile
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // deleteAccount
      .addCase(deleteAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = null;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // getAllUsers
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // getUserById
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singleUser = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;


