// src/features/swap/swapSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createSwapItem,
  getAllSwapItems,
  getSwapItemById,
  updateSwapItem,
  deleteSwapItem,
  getMySwaps,
  acceptSwapRequest,
  rejectSwapRequest,
  cancelSwapRequest,
} from './swapService';
import { toast } from 'react-toastify';

// Thunks
export const createSwap = createAsyncThunk(
  'swap/create',
  async (itemData, thunkAPI) => {
    try {
      return await createSwapItem(itemData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const getAllSwaps = createAsyncThunk(
  'swap/getAll',
  async (_, thunkAPI) => {
    try {
      return await getAllSwapItems();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const getSwapById = createAsyncThunk(
  'swap/getById',
  async (id, thunkAPI) => {
    try {
      return await getSwapItemById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const updateSwap = createAsyncThunk(
  'swap/update',
  async ({ id, updatedData }, thunkAPI) => {
    try {
      return await updateSwapItem({ id, updatedData });
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const deleteSwap = createAsyncThunk(
  'swap/delete',
  async (id, thunkAPI) => {
    try {
      return await deleteSwapItem(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const getUserSwaps = createAsyncThunk(
  'swap/mySwaps',
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try {
      return await getMySwaps(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const acceptSwap = createAsyncThunk(
  'swap/accept',
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try {
      return await acceptSwapRequest(id, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const rejectSwap = createAsyncThunk(
  'swap/reject',
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try {
      return await rejectSwapRequest(id, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const cancelSwap = createAsyncThunk(
  'swap/cancel',
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try {
      return await cancelSwapRequest(id, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Initial state
const initialState = {
  swaps: [],
  swap: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// Slice
const swapSlice = createSlice({
  name: 'swap',
  initialState,
  reducers: {
    resetSwapState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSwap.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.swaps.push(action.payload);
        toast.success('Swap created');
      })
      .addCase(getAllSwaps.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.swaps = action.payload;
      })
      .addCase(getSwapById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.swap = action.payload;
      })
      .addCase(updateSwap.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.swap = action.payload;
        toast.success('Swap updated');
      })
      .addCase(deleteSwap.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.swaps = state.swaps.filter((s) => s._id !== action.payload._id);
        toast.success('Swap deleted');
      })
      .addCase(getUserSwaps.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.swaps = action.payload;
      })
      .addCase(acceptSwap.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        // Update the accepted swap in the state
        const updatedSwap = action.payload;
        state.swaps = state.swaps.map((swap) =>
          swap._id === updatedSwap._id ? updatedSwap : swap
        );

        toast.success('Swap accepted');
      })
      .addCase(rejectSwap.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        // Update the rejected swap in the state
        const updatedSwap = action.payload;
        state.swaps = state.swaps.map((swap) =>
          swap._id === updatedSwap._id ? updatedSwap : swap
        );

        toast.success('Swap rejected');
      })
      .addCase(cancelSwap.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        // Remove the cancelled swap from the state
        const cancelledSwap = action.payload;
        state.swaps = state.swaps.filter(
          (swap) => swap._id !== cancelledSwap._id
        );

        toast.success('Swap cancelled');
      })

      // Handle errors & loading
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = true;
          state.isError = false;
          state.message = '';
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          toast.error(action.payload);
        }
      );
  },
});

export const { resetSwapState } = swapSlice.actions;
export default swapSlice.reducer;
