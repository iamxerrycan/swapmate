import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { itemService } from "./itemService";
import { getToken } from "../../utils/api/tokenHelpers";

import {
  FETCH_ALL_ITEMS,
  FETCH_ITEM_BY_ID,
  FETCH_USER_ITEMS,
  CREATE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
} from "./itemTypes";

// 🔁 Fetch all items
export const fetchItems = createAsyncThunk(FETCH_ALL_ITEMS, async (query = "", thunkAPI) => {
  try {
    return await itemService.getAllItems(query);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to load items");
  }
});

// 🔁 Fetch item by ID
export const fetchItemById = createAsyncThunk(FETCH_ITEM_BY_ID, async (id, thunkAPI) => {
  try {
    return await itemService.getItemById(id);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch item");
  }
});

// 🔁 Fetch items created by user
export const fetchUserItems = createAsyncThunk(FETCH_USER_ITEMS, async (_, thunkAPI) => {
  try {
    const token = getToken(thunkAPI.getState);
    return await itemService.getUserItems(token);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch user items");
  }
});

// 🔁 Create item
export const createItem = createAsyncThunk(CREATE_ITEM, async (itemData, thunkAPI) => {
  try {
    const token = getToken(thunkAPI.getState);
    return await itemService.createItem(itemData, token);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to create item");
  }
});

// 🔁 Update item
export const updateItem = createAsyncThunk(UPDATE_ITEM, async ({ id, itemData }, thunkAPI) => {
  try {
    const token = getToken(thunkAPI.getState);
    return await itemService.updateItem(itemData, id, token);
  } catch {
    return thunkAPI.rejectWithValue("Failed to update item");
  }
});

// 🔁 Delete item
export const deleteItem = createAsyncThunk(DELETE_ITEM, async (id, thunkAPI) => {
  try {
    const token = getToken(thunkAPI.getState);
    return await itemService.deleteItem(id, token);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to delete item");
  }
});

// 🔧 Initial State
const initialState = {
  items: [],
  selectedItem: null,
  loading: false,
  error: null,
};

// 🧩 Slice
const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    // optional: add sync reducers here
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
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

      // Fetch by ID
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

      // Fetch user items
      .addCase(fetchUserItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUserItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
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

      // Update
      .addCase(updateItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(item => item._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item._id !== action.payload._id);
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default itemSlice.reducer;
