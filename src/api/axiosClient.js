import axios from "axios";
import { SERVICE_URLS } from "./serviceUrls";

const isAuthRequest = (url = "") =>
  url.includes("/api/auth/jwt/login") ||
  url.includes("/api/auth/jwt/refresh") ||
  url.includes("/api/auth/jwt/logout");

const credentialedAxiosClient = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

const publicAxiosClient = axios.create({
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

credentialedAxiosClient.interceptors.response.use(
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
        await credentialedAxiosClient.post(`${SERVICE_URLS.AUTH}/api/auth/jwt/refresh`);
        return credentialedAxiosClient(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export { credentialedAxiosClient, publicAxiosClient };

export default credentialedAxiosClient;
