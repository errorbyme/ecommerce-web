import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serverAPI } from "../api/api";

const initialState = {
  isLoading: true,
  productList: [],
  productDetails: {},
  productListByCategory: {},
};

export const getProductsByCategory = createAsyncThunk(
  "/shop/productsbycategory",
  async (category) => {
    const response = await axios.get(
      `${serverAPI}/api/user/products/getbycategory/${category}`
    );
    return response?.data;
  }
);
export const getAllProducts = createAsyncThunk(
  "/shop/products",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({ ...filterParams, sortBy: sortParams });
    const response = await axios.get(
      `${serverAPI}/api/user/products/get?${query}`
    );
    return response.data;
  }
);

export const getProduct = createAsyncThunk("/shop/product", async (id) => {
  const response = await axios.get(`${serverAPI}/api/user/products/get/${id}`);
  return response.data;
});

const productSlice = createSlice({
  name: "userProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.productList = action.payload?.data;
        state.isLoading = false;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.productList = [];
        state.isLoading = false;
      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.productDetails = action.payload?.data;
        state.isLoading = false;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.productDetails = null;
        state.isLoading = false;
      })
      .addCase(getProductsByCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        const category = action.payload?.data?.category;
        const products = action.payload?.data?.products;

        if (category && Array.isArray(products))
          state.productListByCategory[category] = products;
        state.isLoading = false;
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.productDetails = null;
        state.isLoading = false;
      });
  },
});

export default productSlice.reducer;
