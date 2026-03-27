import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";
import restaurantDetailsReducer from "../features/restaurant/restaurantDetailsSlice";
import restaurantReducer from "../features/restaurant/restaurantSlice";
import cartReducer from "../features/cart/cartSlice";
import orderReducer from "../features/order/orderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    restaurants: restaurantReducer,
    restaurantDetails: restaurantDetailsReducer,
    cart: cartReducer,
    order: orderReducer,
  },
  devTools: import.meta.env.DEV,
});

export default store;
