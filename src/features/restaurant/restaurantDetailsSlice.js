import { createSlice } from "@reduxjs/toolkit";
import { fetchRestaurantDetails } from "./restaurantThunks";

const initialState = {
  restaurant: null,
  categories: [],
  loading: false,
  error: null,
};

const restaurantDetailsSlice = createSlice({
  name: "restaurantDetails",
  initialState,
  reducers: {
    clearRestaurantDetails: (state) => {
      state.restaurant = null;
      state.categories = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // ✅ Pending
      .addCase(fetchRestaurantDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // ✅ Fulfilled
      .addCase(fetchRestaurantDetails.fulfilled, (state, action) => {
        state.loading = false;

        state.restaurant = action.payload.restaurant;
        state.categories = action.payload.categories;
      })

      // ✅ Rejected
      .addCase(fetchRestaurantDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load restaurant";
      });
  },
});

export const { clearRestaurantDetails } = restaurantDetailsSlice.actions;
export default restaurantDetailsSlice.reducer;
