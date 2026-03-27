import { createSlice } from "@reduxjs/toolkit";
import {
  createOrderThunk,
  getOrderStatusThunk,
  getUserOrdersThunk,
  reorderThunk,
} from "./orderThunks";

const initialState = {
  // Current order being created/processed
  currentOrder: null,

  // Order creation state
  createOrderStatus: "idle", // idle | loading | succeeded | failed
  createOrderError: null,

  // Order status check
  orderStatusMap: {}, // { orderId: OrderStatusResponse }
  statusCheckLoading: {},

  // User orders list (paginated)
  userOrders: {
    content: [],
    totalElements: 0,
    totalPages: 0,
    currentPage: 0,
  },
  userOrdersStatus: "idle",
  userOrdersError: null,

  // Reorder state
  reorderStatus: "idle",
  reorderError: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // Clear current order
    clearCurrentOrder(state) {
      state.currentOrder = null;
      state.createOrderStatus = "idle";
      state.createOrderError = null;
    },

    // Update payment status manually (e.g., after Razorpay callback)
    updateOrderPaymentStatus(state, action) {
      const { orderId, paymentStatus } = action.payload;
      if (state.currentOrder?.orderId === orderId) {
        state.currentOrder.paymentStatus = paymentStatus;
      }
      if (state.orderStatusMap[orderId]) {
        state.orderStatusMap[orderId].paymentStatus = paymentStatus;
      }
    },

    // Set razorpay order id (if needed for reference)
    setRazorpayOrderId(state, action) {
      if (state.currentOrder) {
        state.currentOrder.razorpayOrderId = action.payload;
      }
    },
  },

  extraReducers: (builder) => {
    // Create Order Cases
    builder
      .addCase(createOrderThunk.pending, (state) => {
        state.createOrderStatus = "loading";
        state.createOrderError = null;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.createOrderStatus = "succeeded";
        state.currentOrder = action.payload;
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.createOrderStatus = "failed";
        state.createOrderError = action.payload;
        state.currentOrder = null;
      });

    // Get Order Status Cases
    builder
      .addCase(getOrderStatusThunk.pending, (state, action) => {
        const orderId = action.meta.arg;
        state.statusCheckLoading[orderId] = true;
      })
      .addCase(getOrderStatusThunk.fulfilled, (state, action) => {
        const orderId = action.payload.orderId;
        state.orderStatusMap[orderId] = action.payload;
        state.statusCheckLoading[orderId] = false;

        // Keep currentOrder in sync with status data (to get razorpayOrderId etc.)
        if (state.currentOrder?.orderId === orderId) {
          state.currentOrder = {
            ...state.currentOrder,
            ...action.payload,
          };
        }
      })
      .addCase(getOrderStatusThunk.rejected, (state, action) => {
        const orderId = action.meta.arg;
        state.statusCheckLoading[orderId] = false;
      });

    // Get User Orders Cases
    builder
      .addCase(getUserOrdersThunk.pending, (state) => {
        state.userOrdersStatus = "loading";
        state.userOrdersError = null;
      })
      .addCase(getUserOrdersThunk.fulfilled, (state, action) => {
        state.userOrdersStatus = "succeeded";
        state.userOrders = {
          content: action.payload.content || [],
          totalElements: action.payload.totalElements || 0,
          totalPages: action.payload.totalPages || 0,
          currentPage: action.payload.number || 0,
        };
      })
      .addCase(getUserOrdersThunk.rejected, (state, action) => {
        state.userOrdersStatus = "failed";
        state.userOrdersError = action.payload;
      });

    // Reorder Cases
    builder
      .addCase(reorderThunk.pending, (state) => {
        state.reorderStatus = "loading";
        state.reorderError = null;
      })
      .addCase(reorderThunk.fulfilled, (state, action) => {
        state.reorderStatus = "succeeded";
        state.currentOrder = action.payload;
      })
      .addCase(reorderThunk.rejected, (state, action) => {
        state.reorderStatus = "failed";
        state.reorderError = action.payload;
      });
  },
});

export const {
  clearCurrentOrder,
  updateOrderPaymentStatus,
  setRazorpayOrderId,
} = orderSlice.actions;

export default orderSlice.reducer;
