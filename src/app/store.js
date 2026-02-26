import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";
import restaurantDetailsReducer from "../features/restaurant/restaurantDetailsSlice";
import restaurantReducer from "../features/restaurant/restaurantSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    restaurants: restaurantReducer,
    restaurantDetails: restaurantDetailsReducer,
  },
  devTools: import.meta.env.DEV,
});

export default store;
