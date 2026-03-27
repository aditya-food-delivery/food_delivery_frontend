import axiosClient from "./axiosClient";
import { SERVICE_URLS } from "./serviceUrls";

/**
 * Create Order
 * @param {Object} createOrderRequest - Order creation request
 * @returns {Promise<OrderResponse>}
 */
export const createOrder = (createOrderRequest) => {
  return axiosClient.post(`${SERVICE_URLS.ORDER}/orders`, createOrderRequest);
};

/**
 * Get Order Status
 * @param {string} orderId - Order ID (UUID)
 * @returns {Promise<OrderStatusResponse>}
 */
export const getOrderStatus = (orderId) => {
  return axiosClient.get(`${SERVICE_URLS.ORDER}/orders/${orderId}`);
};

/**
 * Get User Orders (Paginated)
 * @param {string} userId - User ID (UUID)
 * @param {number} page - Page number (0-indexed)
 * @param {number} size - Page size
 * @returns {Promise<Page<OrderResponse>>}
 */
export const getUserOrders = (userId, page = 0, size = 10) => {
  return axiosClient.get(`${SERVICE_URLS.ORDER}/orders/users/${userId}`, {
    params: { page, size },
  });
};

/**
 * Reorder - Create a new order from an existing one
 * @param {string} orderId - Order ID to reorder
 * @returns {Promise<OrderResponse>}
 */
export const reorder = (orderId) => {
  return axiosClient.post(`${SERVICE_URLS.ORDER}/orders/${orderId}/reorder`);
};
