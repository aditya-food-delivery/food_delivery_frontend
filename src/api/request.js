import {
  credentialedAxiosClient,
  publicAxiosClient,
} from "./axiosClient";

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
  withCredentials = true,
}) => {
  const client = withCredentials ? credentialedAxiosClient : publicAxiosClient;

  return client({
    baseURL: service,
    url,
    method,
    data,
    params,
    headers,
    withCredentials,
  });
};
