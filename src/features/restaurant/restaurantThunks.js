import { createAsyncThunk } from "@reduxjs/toolkit";
import { searchRestaurants, getRestaurantDetails } from "../../api/catalogApi";

//
// ✅ Fetch Restaurant Listing
//
export const fetchRestaurants = createAsyncThunk(
  "restaurants/fetchRestaurants",
  async (params, { rejectWithValue }) => {
    try {
      const data = await searchRestaurants(params);

      return {
        restaurants: data.content,
        page: data.number,
        size: data.size,
        totalPages: data.totalPages,
        totalElements: data.totalElements,
      };
    } catch (error) {
      return rejectWithValue(error?.message || "Failed to fetch restaurants");
    }
  },
);

//
// ✅ Fetch Restaurant Details
//
export const fetchRestaurantDetails = createAsyncThunk(
  "restaurantDetails/fetchRestaurantDetails",
  async (restaurantId, { rejectWithValue }) => {
    try {
      const data = await getRestaurantDetails(restaurantId);

      // Sort categories by displayOrder (important for UI)
      const sortedCategories = [...(data.categories || [])].sort(
        (a, b) => a.displayOrder - b.displayOrder,
      );

      return {
        restaurant: data,
        categories: sortedCategories,
      };
    } catch (error) {
      return rejectWithValue(
        error?.message || "Failed to fetch restaurant details",
      );
    }
  },
);
