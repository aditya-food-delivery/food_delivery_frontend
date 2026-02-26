export const selectRestaurantDetailsState = (state) => state.restaurantDetails;

export const selectRestaurant = (state) => state.restaurantDetails.restaurant;

export const selectCategories = (state) => state.restaurantDetails.categories;

export const selectRestaurantDetailsLoading = (state) =>
  state.restaurantDetails.loading;

export const selectRestaurantDetailsError = (state) =>
  state.restaurantDetails.error;
