import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage/ErrorPage.jsx";
import { Provider } from "react-redux";
import { store } from "./Store/store.js";
import Home from "./Pages/ShoppingPage/Homepage/Home.jsx";
import Login from "./Pages/AuthPage/Login.jsx";
import Register from "./Pages/AuthPage/Register.jsx";
import AuthPage from "./Pages/AuthPage/AuthPageLayout.jsx";
import Dashboard from "./Pages/AdminPage/Dashboard/Dashboard.jsx";
import AdminProducts from "./Pages/AdminPage/Products/Products.jsx";
import AdminOrders from "./Pages/AdminPage/Orders/Orders.jsx";
import AdminPageLayout from "./Pages/AdminPage/AdminPageLayout/AdminPageLayout.jsx";
import Checkout from "./Pages/ShoppingPage/Checkout/Checkout.jsx";
import Products from "./Pages/ShoppingPage/Product/Products.jsx";
import CheckAuth from "./Pages/AuthPage/CheckAuth.jsx";
import NotAuthorized from "./Pages/AuthPage/NotAuthorized.jsx";
import ProductDetails from "./Pages/ShoppingPage/ProductDetails/ProductDetails.jsx";
import Cart from "./Pages/ShoppingPage/Cart/Cart.jsx";
import ShoppingPageLayout from "./Pages/ShoppingPage/ShoppingPageLayout/ShoppingPageLayout.jsx";
import Orders from "./Pages/ShoppingPage/Orders/Orders.jsx";
import OrderDetails from "./Pages/ShoppingPage/Orders/OrderDetails.jsx";
import Profile from "./Pages/ShoppingPage/Account/Profile.jsx";
import Return from "./Pages/ShoppingPage/PaymentPages/Return.jsx";
import SearchProducts from "./Pages/ShoppingPage/SearchPage/SearchProducts.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Navigate to={"/shop"} />,
      },
      {
        path: "auth",
        element: (
          <CheckAuth>
            <AuthPage />
          </CheckAuth>
        ),
        children: [
          {
            path: "",
            element: <Navigate to={"login"} />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      },
      {
        path: "admin",
        element: (
          <CheckAuth>
            <AdminPageLayout />
          </CheckAuth>
        ),
        children: [
          {
            path: "",
            element: <Navigate to={"dashboard"} />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "products",
            element: <AdminProducts />,
          },
          {
            path: "orders",
            element: <AdminOrders />,
          },
        ],
      },
      {
        path: "shop",
        element: (
          <CheckAuth>
            <ShoppingPageLayout />
          </CheckAuth>
        ),
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "checkout",
            element: <Checkout />,
          },
          {
            path: "cart",
            element: <Cart isCheckout={false} />,
          },
          {
            path: "account/order",
            element: <Orders />,
          },
          {
            path: "account/order/:orderId",
            element: <OrderDetails />,
          },
          {
            path: "products",
            element: <Products />,
          },
          {
            path: "product/:productId",
            element: <ProductDetails />,
          },
          {
            path: "account/profile",
            element: <Profile />,
          },
          {
            path: "search",
            element: <SearchProducts />,
          },
          {
            path: "return-page",
            element: <Return />,
          },
        ],
      },
    ],
  },
  {
    path: "error-page",
    element: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
  {
    path: "/unauth-page",
    element: <NotAuthorized />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
