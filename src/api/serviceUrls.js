const DEFAULT_GATEWAY_URL =
  "https://bd07-2401-4900-1c60-f739-d023-5062-35e6-16f2.ngrok-free.app";

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
