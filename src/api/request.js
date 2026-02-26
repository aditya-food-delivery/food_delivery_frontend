import axiosClient from "./axiosClient";

/**
 * Generic request helper
 * Decides baseURL dynamically per request
 */
export const request = ({
  service,
  url,
  method = "GET",
  data,
  params,
  headers,
}) => {
  return axiosClient({
    baseURL: service,
    url,
    method,
    data,
    params,
    headers,
  });
};
