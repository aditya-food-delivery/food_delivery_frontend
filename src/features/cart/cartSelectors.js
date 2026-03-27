// Cart Items Selectors
export const selectCartItems = (state) => state.cart.items;

export const selectCartTotal = (state) => state.cart.total;

export const selectCartRestaurant = (state) => ({
  id: state.cart.restaurantId,
  name: state.cart.restaurantName,
});

export const selectCartItemCount = (state) => state.cart.items.length;

export const selectCartIsEmpty = (state) => state.cart.items.length === 0;

export const selectCartItemByMenuId = (menuItemId) => (state) =>
  state.cart.items.find((item) => item.menuItemId === menuItemId);
