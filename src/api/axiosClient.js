import axios from "axios";

/**
 * SINGLE axios instance
 * - Handles cookies
 * - Handles refresh token logic
 * - NO baseURL (set dynamically per request)
 */
const axiosClient = axios.create({
  withCredentials: true, // 🔥 REQUIRED for cookie auth
  headers: {
    "Content-Type": "application/json",
  },
});

// =======================
// RESPONSE INTERCEPTOR
// =======================
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loops
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/api/auth/jwt/login") &&
      !originalRequest.url.includes("/api/auth/jwt/refresh")
    ) {
      originalRequest._retry = true;

      try {
        // 🔄 Refresh session using cookie
        await axiosClient.post(
          `${import.meta.env.VITE_AUTH_SERVICE_URL}/api/auth/jwt/refresh`,
        );

        // 🔁 Retry original request
        return axiosClient(originalRequest);
      } catch (refreshError) {
        try {
          await axiosClient.post(
            `${import.meta.env.VITE_AUTH_SERVICE_URL}/api/auth/logout`,
          );
        } finally {
          window.location.href = "/";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
