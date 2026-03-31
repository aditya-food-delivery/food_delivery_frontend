export const selectRestaurantsState = (state) => state.restaurants;

export const selectAllRestaurants = (state) => state.restaurants.restaurants;

export const selectRestaurantsLoading = (state) => state.restaurants.loading;

export const selectRestaurantsError = (state) => state.restaurants.error;

export const selectRestaurantsPagination = (state) => ({
  page: 0,
  size: state.restaurants.restaurants.length,
  totalPages: 1,
  totalElements: state.restaurants.restaurants.length,
});
