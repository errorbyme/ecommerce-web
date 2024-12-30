import { configureStore } from "@reduxjs/toolkit";
import authreducer from "./auth-slice";
import adminProductReducer from "./admin/product-slice/index";
import userProductReducer from "./product-slice/index";
import userCartReducer from "./cart-slice/index";
import addressReducer from "./address-slice/index";
import reviewReducer from "./review-slice/index";
import orderReducer from "./order-slice/index";
import adminOrderReducer from "./admin/order-slice/index";
import searchReducer from "./search-slice/index";

export const store = configureStore({
  reducer: {
    auth: authreducer,
    adminProducts: adminProductReducer,
    userProducts: userProductReducer,
    userCarts: userCartReducer,
    userAddress: addressReducer,
    userReview: reviewReducer,
    userOrder: orderReducer,
    adminOrder: adminOrderReducer,
    search: searchReducer,
  },
});
