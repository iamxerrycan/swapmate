import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { itemService } from "./itemService";

// GET all items
export const fetchItems = createAsyncThunk("items/fetchAll", async (query = "", thunkAPI) => {
  try {
    return await itemService.getAllItems(query);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message || "Failed to load items");
  }
});

// POST a new item
export const createItem = createAsyncThunk(
  "items/create",
  async (itemData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token; // 
      return await itemService.createItem(itemData, token); 
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to create item");
    }
  }
);


const itemSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Add local reducers here in future (e.g., reset, sort)
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchItems
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

      // ✅ Handle createItem
      .addCase(createItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload); // ✅ Add new item to state
      })
      .addCase(createItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default itemSlice.reducer;
