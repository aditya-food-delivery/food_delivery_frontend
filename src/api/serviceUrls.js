const DEFAULT_GATEWAY_URL = "http://localhost:8080";

export const GATEWAY_BASE_URL = (
  import.meta.env.VITE_GATEWAY_URL || DEFAULT_GATEWAY_URL
).replace(/\/+$/, "");

const buildGatewayUrl = (prefix) => `${GATEWAY_BASE_URL}${prefix}`;

export const SERVICE_URLS = {
  AUTH: buildGatewayUrl("/auth"),
  PROFILE: buildGatewayUrl("/profile"),
  ORDER: buildGatewayUrl("/order/api"),
  CATALOG: buildGatewayUrl("/catalog"),
  SEARCH: buildGatewayUrl("/search"),
};
