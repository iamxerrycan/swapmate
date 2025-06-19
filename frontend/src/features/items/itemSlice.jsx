import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { itemService } from "./itemService";

// Get all items
export const fetchItems = createAsyncThunk("items/fetchAll", async (query = "", thunkAPI) => {
  try {
    return await itemService.getAllItems(query);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message || "Failed to load items");
  }
});

const itemSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    // If i want to add local-only filter/sort logic later
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default itemSlice.reducer;
