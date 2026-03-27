// Current Order Selectors
export const selectCurrentOrder = (state) => state.order.currentOrder;

export const selectCurrentOrderStatus = (state) =>
  state.order.createOrderStatus;

export const selectCurrentOrderError = (state) => state.order.createOrderError;

export const selectRazorpayOrderId = (state) =>
  state.order.currentOrder?.razorpayOrderId;

export const selectCurrentOrderAmount = (state) =>
  state.order.currentOrder?.amount;

export const selectCurrentOrderPaymentStatus = (state) =>
  state.order.currentOrder?.paymentStatus;

// Order Status Check Selectors
export const selectOrderStatus = (orderId) => (state) =>
  state.order.orderStatusMap[orderId];

export const selectOrderStatusLoading = (orderId) => (state) =>
  state.order.statusCheckLoading[orderId] || false;

// User Orders List Selectors
export const selectUserOrders = (state) => state.order.userOrders.content;

export const selectUserOrdersStatus = (state) => state.order.userOrdersStatus;

export const selectUserOrdersError = (state) => state.order.userOrdersError;

export const selectUserOrdersPagination = (state) => ({
  totalElements: state.order.userOrders.totalElements,
  totalPages: state.order.userOrders.totalPages,
  currentPage: state.order.userOrders.currentPage,
});

// Reorder Selectors
export const selectReorderStatus = (state) => state.order.reorderStatus;

export const selectReorderError = (state) => state.order.reorderError;
