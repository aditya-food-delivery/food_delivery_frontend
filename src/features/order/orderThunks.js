import { createAsyncThunk } from "@reduxjs/toolkit";
import * as orderApi from "../../api/orderApi";

/**
 * Create Order Thunk
 * Takes cart items and creates an order
 * Returns OrderResponse with razorpayOrderId
 */
export const createOrderThunk = createAsyncThunk(
  "order/createOrder",
  async (createOrderRequest, { rejectWithValue }) => {
    try {
      const response = await orderApi.createOrder(createOrderRequest);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

/**
 * Get Order Status Thunk
 * Fetches the current status of an order
 */
export const getOrderStatusThunk = createAsyncThunk(
  "order/getOrderStatus",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await orderApi.getOrderStatus(orderId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

/**
 * Get User Orders Thunk
 * Fetches paginated list of user's orders
 */
export const getUserOrdersThunk = createAsyncThunk(
  "order/getUserOrders",
  async ({ userId, page = 0, size = 10 }, { rejectWithValue }) => {
    try {
      const response = await orderApi.getUserOrders(userId, page, size);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

/**
 * Reorder Thunk
 * Creates a new order from an existing one
 */
export const reorderThunk = createAsyncThunk(
  "order/reorder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await orderApi.reorder(orderId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
