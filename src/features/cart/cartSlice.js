import { createSlice } from "@reduxjs/toolkit";

const CART_STORAGE_KEY = "food_delivery_cart";

const initialState = {
  items: [],
  restaurantId: null,
  restaurantName: null,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Initialize cart from localStorage
    initializeCart(state) {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          state.items = parsedCart.items || [];
          state.restaurantId = parsedCart.restaurantId;
          state.restaurantName = parsedCart.restaurantName;
          state.total = parsedCart.total || 0;
        } catch (e) {
          console.error("Failed to parse cart from localStorage", e);
        }
      }
    },

    // Add item to cart
    addToCart(state, action) {
      const {
        menuItemId,
        name,
        price,
        quantity,
        restaurantId,
        restaurantName,
      } = action.payload;

      // If adding from different restaurant, clear cart
      if (state.restaurantId && state.restaurantId !== restaurantId) {
        state.items = [];
      }

      const existingItem = state.items.find(
        (item) => item.menuItemId === menuItemId,
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          menuItemId,
          name,
          price,
          quantity,
        });
      }

      state.restaurantId = restaurantId;
      state.restaurantName = restaurantName;
      cartSlice.caseReducers.updateTotal(state);
      cartSlice.caseReducers.persistCart(state);
    },

    // Update item quantity
    updateItemQuantity(state, action) {
      const { menuItemId, quantity } = action.payload;

      if (quantity <= 0) {
        state.items = state.items.filter(
          (item) => item.menuItemId !== menuItemId,
        );
      } else {
        const item = state.items.find((item) => item.menuItemId === menuItemId);
        if (item) {
          item.quantity = quantity;
        }
      }

      cartSlice.caseReducers.updateTotal(state);
      cartSlice.caseReducers.persistCart(state);
    },

    // Remove item from cart
    removeFromCart(state, action) {
      state.items = state.items.filter(
        (item) => item.menuItemId !== action.payload,
      );
      cartSlice.caseReducers.updateTotal(state);
      cartSlice.caseReducers.persistCart(state);
    },

    // Clear entire cart
    clearCart(state) {
      state.items = [];
      state.restaurantId = null;
      state.restaurantName = null;
      state.total = 0;
      localStorage.removeItem(CART_STORAGE_KEY);
    },

    // Helper: Update total
    updateTotal(state) {
      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
    },

    // Helper: Persist cart to localStorage
    persistCart(state) {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify({
          items: state.items,
          restaurantId: state.restaurantId,
          restaurantName: state.restaurantName,
          total: state.total,
        }),
      );
    },
  },
});

export const {
  initializeCart,
  addToCart,
  updateItemQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
