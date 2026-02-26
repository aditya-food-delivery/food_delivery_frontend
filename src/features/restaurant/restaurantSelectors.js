export const selectRestaurantsState = (state) => state.restaurants;

export const selectAllRestaurants = (state) => state.restaurants.restaurants;

export const selectRestaurantsLoading = (state) => state.restaurants.loading;

export const selectRestaurantsError = (state) => state.restaurants.error;

export const selectRestaurantsPagination = (state) => ({
  page: state.restaurants.page,
  size: state.restaurants.size,
  totalPages: state.restaurants.totalPages,
  totalElements: state.restaurants.totalElements,
});
