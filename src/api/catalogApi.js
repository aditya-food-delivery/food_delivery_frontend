import { request } from "./request";
import { SERVICE_URLS } from "./serviceUrls";

//
// ✅ Restaurant Listing / Search
//
export const searchRestaurants = async (params) => {
  try {
    const response = await request({
      service: SERVICE_URLS.CATALOG,
      url: "/api/catalog/restaurants",
      method: "GET",
      params, // query params
    });

    return response.data;
  } catch (error) {
    console.error("searchRestaurants error:", error);
    throw error?.response?.data || { message: "Failed to fetch restaurants" };
  }
};

//
// ✅ Restaurant Details
//
export const getRestaurantDetails = async (restaurantId) => {
  try {
    const response = await request({
      service: SERVICE_URLS.CATALOG,
      url: `api/catalog/restaurants/${restaurantId}`,
      method: "GET",
    });

    return response.data;
  } catch (error) {
    console.error("getRestaurantDetails error:", error);
    throw (
      error?.response?.data || { message: "Failed to fetch restaurant details" }
    );
  }
};
