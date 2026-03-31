import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  searchRestaurantsByCity,
  getRestaurantDetails,
} from "../../api/catalogApi";
import {
  normalizeRestaurantDetails,
  normalizeRestaurantSummary,
} from "./restaurantAdapters";

export const fetchRestaurants = createAsyncThunk(
  "restaurants/fetchRestaurants",
  async ({ city }, { rejectWithValue }) => {
    try {
      const data = await searchRestaurantsByCity(city);
      return data.map(normalizeRestaurantSummary);
    } catch (error) {
      return rejectWithValue(error?.message || "Failed to fetch restaurants");
    }
  },
);

export const fetchRestaurantDetails = createAsyncThunk(
  "restaurantDetails/fetchRestaurantDetails",
  async (restaurantId, { rejectWithValue }) => {
    try {
      const data = await getRestaurantDetails(restaurantId);
      return normalizeRestaurantDetails(data);
    } catch (error) {
      return rejectWithValue(
        error?.message || "Failed to fetch restaurant details",
      );
    }
  },
);
