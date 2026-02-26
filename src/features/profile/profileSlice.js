import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUserProfile,
  updateUserProfile,
  fetchAddresses,
  addAddress,
} from "./profileThunks";

const initialState = {
  data: null,
  status: "idle", // idle | loading | succeeded | failed
  error: null,
  lastFetched: null,
  addresses: [],
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile(state) {
      state.data = null;
      state.status = "idle";
      state.error = null;
      state.lastFetched = null;
      state.addresses = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch profile
      .addCase(fetchUserProfile.pending, (state) => {
        console.log("pednding", state);
        state.status = "loading";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        console.log("fulfilled", state);
        state.status = "succeeded";
        state.data = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Update profile
      .addCase(updateUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload; // overwrite with fresh data
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.loading = false;
        const newAddress = action.payload?.addAddress;
        if (!newAddress) return;

        if (!state.addresses?.getAddressesByProfileId) {
          state.addresses = { getAddressesByProfileId: [newAddress] };
          return;
        }

        state.addresses.getAddressesByProfileId.unshift(newAddress);
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
