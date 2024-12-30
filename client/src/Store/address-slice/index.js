import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { serverAPI } from "../api/api.js";

const initialState = {
  isLoading: false,
  addressList: [],
};

export const addNewAddress = createAsyncThunk(
  "/addresses/add",
  async (formData) => {
    const response = await axios.post(
      `${serverAPI}/api/user/address/add`,
      formData
    );
    return response?.data;
  }
);

export const getAllAddresses = createAsyncThunk(
  "/addresses/getalladdress",
  async (userId) => {
    const response = await axios.get(
      `${serverAPI}/api/user/address/get/${userId}`
    );
    return response?.data;
  }
);
export const editAddress = createAsyncThunk(
  "/addresses/edit",
  async ({ userId, addressId, formData }) => {
    const response = await axios.put(
      `${serverAPI}/api/user/address/update/${userId}/${addressId}`,
      formData
    );
    return response?.data;
  }
);
export const deleteAddress = createAsyncThunk(
  "/addresses/delete",
  async ({ userId, addressId }) => {
    const response = await axios.delete(
      `${serverAPI}/api/user/address/delete/${userId}/${addressId}`
    );
    return response?.data;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload?.data;
      })
      .addCase(getAllAddresses.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      })
      .addCase(editAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editAddress.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(editAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteAddress.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default addressSlice.reducer;
