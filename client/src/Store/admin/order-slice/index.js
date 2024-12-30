import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serverAPI } from "../../api/api";

const initialState = {
  isLoading: false,
  orderList: [],
  orderDetails: null,
  totalUsers: 0,
};

export const getAllOrdersForAdmin = createAsyncThunk(
  "/admin/user-orders",
  async () => {
    const response = await axios.get(`${serverAPI}/api/admin/order/get`);
    return response?.data;
  }
);
export const getOrderDetailsForAdmin = createAsyncThunk(
  "/admin/user-order-details",
  async (id) => {
    const response = await axios.get(
      `${serverAPI}/api/admin/order/details/${id}`
    );
    return response?.data;
  }
);
export const updateOrderStatus = createAsyncThunk(
  "/admin/update-order-status",
  async ({ id, orderStatus }) => {
    const response = await axios.put(
      `${serverAPI}/api/admin/order/update/${id}`,
      {
        orderStatus,
      }
    );
    return response?.data;
  }
);
export const getTotalUsers = createAsyncThunk("/admin/all-users", async () => {
  const response = await axios.get(
    `${serverAPI}/api/admin/order/getusers`
  );
  return response?.data;
});

const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState,
  reducers: {
    setOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload?.data;
      })
      .addCase(getAllOrdersForAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload?.data;
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.orderDetails = null;
      })
      .addCase(getTotalUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTotalUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalUsers = action.payload?.data;
      })
      .addCase(getTotalUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.totalUsers = 0;
      });
  },
});
export const { setOrderDetails } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;
