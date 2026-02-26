import { createSlice } from "@reduxjs/toolkit";
import { fetchRestaurants } from "./restaurantThunks";

const initialState = {
  restaurants: [],
  loading: false,
  error: null,

  page: 0,
  size: 20,
  totalPages: 0,
  totalElements: 0,
};

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    resetRestaurants: (state) => {
      state.restaurants = [];
      state.page = 0;
      state.totalPages = 0;
      state.totalElements = 0;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // ✅ Pending
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // ✅ Fulfilled
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;

        state.restaurants = action.payload.restaurants;
        state.page = action.payload.page;
        state.size = action.payload.size;
        state.totalPages = action.payload.totalPages;
        state.totalElements = action.payload.totalElements;
      })

      // ✅ Rejected
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetRestaurants } = restaurantSlice.actions;
export default restaurantSlice.reducer;
