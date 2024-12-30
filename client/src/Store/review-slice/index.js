import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serverAPI } from "../api/api";
const initialState = {
  isLoading: true,
  reviewList: [],
};

export const getAllReviews = createAsyncThunk(
  "/shop/get-reviews",
  async (productId) => {
    const response = await axios.get(
      `${serverAPI}/api/user/review/get/${productId}`
    );
    return response?.data;
  }
);

export const addReview = createAsyncThunk(
  "/shop/add-review",
  async ({ userId, productId, review, rating }) => {
    const response = await axios.post(`${serverAPI}/api/user/review/add`, {
      userId,
      productId,
      review,
      rating,
    });
    return response?.data;
  }
);

export const editReview = createAsyncThunk(
  "/shop/edit-review",
  async ({ reviewId, review, rating }) => {
    const response = await axios.put(`${serverAPI}/api/user/review/update`, {
      reviewId,
      review,
      rating,
    });
    return response?.data;
  }
);

export const deleteReview = createAsyncThunk(
  "/shop/delete-review",
  async ({ reviewId }) => {
    const response = await axios.delete(
      `${serverAPI}/api/user/review/${reviewId}`
    );
    return response?.data;
  }
);

const reviewSlice = createSlice({
  name: "userReviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllReviews.fulfilled, (state, action) => {
        state.reviewList = action.payload?.data;
        state.isLoading = false;
      })
      .addCase(getAllReviews.rejected, (state, action) => {
        state.reviewList = [];
        state.isLoading = false;
      });
  },
});

export default reviewSlice.reducer;
