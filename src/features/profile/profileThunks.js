import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchUserProfileApi,
  updateUserProfileApi,
  fetchAddressesApi,
  addAddressApi,
} from "../../api/profileApi";

/**
 * Fetch profile using userId
 */
export const fetchUserProfile = createAsyncThunk(
  "profile/fetchUserProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await fetchUserProfileApi(userId);

      console.log("I am coming form the profile Service", res.data);
      if (res.data?.errors?.length) {
        return rejectWithValue(res.data.errors[0].message);
      }

      return res.data.data.getProfileByUserId;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch profile",
      );
    }
  },
);

/**
 * Update profile
 */
export const updateUserProfile = createAsyncThunk(
  "profile/updateUserProfile",
  async ({ profileId, input }, { rejectWithValue }) => {
    // console.log(profileId);
    try {
      const res = await updateUserProfileApi(profileId, input);
      // console.log(res);
      if (res.data?.errors?.length) {
        return rejectWithValue(res.data.errors[0].message);
      }

      return res.data.data.updateProfile;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update profile",
      );
    }
  },
);

export const fetchAddresses = createAsyncThunk(
  "address/fetchAddresses",
  async (profileId, { rejectWithValue }) => {
    try {
      const response = await fetchAddressesApi(profileId);
      console.log("address", response.data.data);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const addAddress = createAsyncThunk(
  "address/addAddress",
  async ({ profileId, input }, { rejectWithValue }) => {
    try {
      const response = await addAddressApi(profileId, input);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);
