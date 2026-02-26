export const SERVICE_URLS = {
  AUTH: import.meta.env.VITE_AUTH_SERVICE_URL || "http://localhost:8080",
  PROFILE: import.meta.env.VITE_PROFILE_SERVICE_URL || "http://localhost:8081",
  CATALOG: "http://localhost:8083",
};
