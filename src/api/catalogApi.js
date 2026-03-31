import { request } from "./request";
import { SERVICE_URLS } from "./serviceUrls";

export const searchRestaurantsByCity = async (city) => {
  try {
    const response = await request({
      service: SERVICE_URLS.CATALOG,
      url: `/restaurants/${encodeURIComponent(city)}`,
      method: "GET",
    });

    return response.data;
  } catch (error) {
    console.error("searchRestaurantsByCity error:", error);
    throw error?.response?.data || { message: "Failed to fetch restaurants" };
  }
};

export const getRestaurantDetails = async (restaurantId) => {
  try {
    const response = await request({
      service: SERVICE_URLS.CATALOG,
      url: `/restaurants/id/${restaurantId}`,
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
