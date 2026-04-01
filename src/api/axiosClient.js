import axios from "axios";
import { SERVICE_URLS } from "./serviceUrls";

const isAuthRequest = (url = "") =>
  url.includes("/api/auth/jwt/login") ||
  url.includes("/api/auth/jwt/refresh") ||
  url.includes("/api/auth/jwt/logout");

/**
 * SINGLE axios instance
 * - Handles cookies
 * - Handles refresh token logic
 * - NO baseURL (set dynamically per request)
 */
const axiosClient = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRequest(originalRequest.url)
    ) {
      originalRequest._retry = true;

      try {
        await axiosClient.post(`${SERVICE_URLS.AUTH}/api/auth/jwt/refresh`);
        return axiosClient(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
