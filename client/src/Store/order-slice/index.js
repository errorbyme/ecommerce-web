import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serverAPI } from "../api/api";

const initialState = {
  isLoading: false,
  isPaymentLoading: false,
  orderList: [],
  orderSessionId: null,
  orderPaymentId: null,
  orderId: null,
  orderDetails: null,
};

export const addOrder = createAsyncThunk("/shop/add", async (orderData) => {
  const response = await axios.post(
    `${serverAPI}/api/user/order/payment`,
    orderData
  );
  return response?.data;
});
export const verifyPayment = createAsyncThunk(
  "/shop/verify",
  async ({ orderPaymentId, orderId }) => {
    const response = await axios.post(`${serverAPI}/api/user/order/verify`, {
      orderPaymentId,
      orderId,
    });
    return response?.data;
  }
);
export const getOrdersByUserId = createAsyncThunk(
  "/shop/user-orders",
  async (userId) => {
    const response = await axios.get(
      `${serverAPI}/api/user/order/list/${userId}`
    );
    return response?.data;
  }
);
export const getOrderDetails = createAsyncThunk(
  "/shop/user-order-details",
  async (id) => {
    const response = await axios.get(
      `${serverAPI}/api/user/order/details/${id}`
    );
    return response?.data;
  }
);

const OrderSlice = createSlice({
  name: "userOrders",
  initialState,
  reducers: {
    setOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.orderSessionId = action.payload?.data.payment_session_id;
        state.orderPaymentId = action.payload?.data.order_id;
        state.orderId = action.payload?.orderId;
        state.isLoading = false;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.orderSessionId = null;
        state.orderPaymentId = null;
      })
      .addCase(getOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrdersByUserId.fulfilled, (state, action) => {
        state.orderList = action.payload?.data;
        state.isLoading = false;
      })
      .addCase(getOrdersByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.orderDetails = action.payload?.data;
        state.isLoading = false;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.orderDetails = null;
      })
      .addCase(verifyPayment.pending, (state) => {
        state.isPaymentLoading = true;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.isPaymentLoading = false;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.isPaymentLoading = false;
      });
  },
});
export const { setOrderDetails } = OrderSlice.actions;
export default OrderSlice.reducer;
