import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { itemService } from './itemService';

// GET all items
export const fetchItems = createAsyncThunk(
  'items/fetchAll',
  async (query = '', thunkAPI) => {
    try {
      return await itemService.getAllItems(query);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to load items'
      );
    }
  }
);

// CREATE item
export const createItem = createAsyncThunk(
  'items/create',
  async (itemData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await itemService.createItem(itemData, token);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to create item'
      );
    }
  }
);

export const deleteItem = createAsyncThunk(
  'items/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await itemService.deleteItem(id, token);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to delete item'
      );
    }
  }
);

// ✅ UPDATE item
export const updateItem = createAsyncThunk(
  'items/updateItem',
  async ({ id, itemData }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.user.token || localStorage.getItem("token"); // ✅ get token

      return await itemService.updateItem(itemData, id, token);
    } catch{
      return thunkAPI.rejectWithValue('Failed to update item');
    }
  }
);


export const fetchItemById = createAsyncThunk(
  'items/fetchOne',
  async (id, thunkAPI) => {
    try {
      return await itemService.getItemById(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to fetch item'
      );
    }
  }
);

const itemSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Future reducers like resetItems, etc.
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ UPDATE
      .addCase(updateItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          (item) => item._id !== action.payload._id
        );
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

       // Fetch one item
    .addCase(fetchItemById.pending, (state) => {
      state.loading = true;
      state.selectedItem = null;
    })
    .addCase(fetchItemById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedItem = action.payload;
    })
    .addCase(fetchItemById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
  },  
});

export default itemSlice.reducer;

