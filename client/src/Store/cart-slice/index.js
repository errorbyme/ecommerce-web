import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serverAPI } from "../api/api";

const initialState = {
  isLoading: false,
  cartItems: null,
};

export const addToCart = createAsyncThunk(
  "cart/add-cart",
  async ({ userId, productId, quantity, color, size }) => {
    const response = await axios.post(`${serverAPI}/api/user/cart/add`, {
      userId,
      productId,
      quantity,
      color,
      size,
    });

    return response?.data;
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/delete-cartItem",
  async ({ userId, productId, color, size }) => {
    const response = await axios.delete(
      `${serverAPI}/api/user/cart/${userId}/${productId}/${color}/${size}`
    );
    return response?.data;
  }
);
export const updateCartQuantity = createAsyncThunk(
  "cart/update-cartItem",
  async ({ userId, productId, quantity, color, size }) => {
    const response = await axios.put(`${serverAPI}/api/user/cart/update-cart`, {
      userId,
      productId,
      quantity,
      color,
      size,
    });
    return response?.data;
  }
);

export const getCartItems = createAsyncThunk(
  "cart/get-cartItem",
  async (userId) => {
    const response = await axios.get(
      `${serverAPI}/api/user/cart/get/${userId}`
    );
    return response?.data;
  }
);

const cartSlice = createSlice({
  name: "userCarts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload?.data;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = null;
      })
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload?.data;
      })
      .addCase(getCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = null;
      })
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload?.data;
      })
      .addCase(updateCartQuantity.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = null;
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload?.data;
      })
      .addCase(deleteCartItem.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = null;
      });
  },
});

export default cartSlice.reducer;
