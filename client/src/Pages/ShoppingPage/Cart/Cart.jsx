import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItem,
  getCartItems,
  updateCartQuantity,
} from "../../../Store/cart-slice";
import { toast } from "react-toastify";
import { addOrder, verifyPayment } from "../../../Store/order-slice";
import { load } from "@cashfreepayments/cashfree-js";
import CircularProgress from "@mui/material/CircularProgress";

const Cart = ({ isCheckout, address }) => {
  const navigate = useNavigate();

  const { cartItems, isLoading: isCartLoading } = useSelector(
    (state) => state.userCarts
  );
  const { user } = useSelector((state) => state.auth);
  const { productList } = useSelector((state) => state.userProducts);
  const {
    orderSessionId,
    isLoading: isPayLoading,
    orderPaymentId,
    orderId,
  } = useSelector((state) => state.userOrder);

  const [orderAddress, setOrderAddress] = useState({});
  const [isPayment, SetisPayment] = useState(false);

  const dispatch = useDispatch();

  const totalCartAmount =
    cartItems && cartItems?.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  const orderData = {
    userId: user?.id,
    cartId: cartItems?._id,
    cartItems:
      cartItems &&
      cartItems?.items?.length > 0 &&
      cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        image: singleCartItem?.image,
        color: singleCartItem?.color,
        size: singleCartItem?.size,
        quantity: singleCartItem?.quantity,
      })),
    addressInfo: orderAddress,
    orderStatus: "pending",
    paymentMethod: "card",
    paymentStatus: "pending",
    totalAmount: totalCartAmount,
    orderDate: new Date(),
    orderUpdateDate: new Date(),
    paymentId: "",
    payerId: "",
  };

  useEffect(() => {
    dispatch(getCartItems(user?.id));
  }, [dispatch]);

  useEffect(() => {
    if (address) {
      setOrderAddress(address);
    } else {
      setOrderAddress({});
    }
  }, [address]);

  const handleRemove = async (item) => {
    dispatch(
      deleteCartItem({
        userId: user?.id,
        productId: item?.productId,
        color: item?.color,
        size: item?.size,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload.message);
      } else {
        toast.warn(data?.payload.message);
      }
    });
  };

  const handleUpdateQuantity = async (item, operation) => {
    if (operation === "add") {
      let getCartItems = cartItems?.items || [];

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (citem) => citem.productId === item?.productId
        );

        const getcurrentProductIndex = productList.findIndex(
          (product) => product._id === item?.productId
        );

        const getTotalStock = productList[getcurrentProductIndex]?.totalStock;
        if (indexOfCurrentCartItem > -1) {
          const getquantity = getCartItems[indexOfCurrentCartItem]?.quantity;
          if (getquantity + 1 > getTotalStock) {
            toast.warn(`only ${getquantity} quantity can be added`);
            return;
          }
        }
      }
    }
    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: item?.productId,
        quantity: operation === "add" ? item?.quantity + 1 : item?.quantity - 1,
        color: item?.color,
        size: item?.size,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
      } else {
        toast.warn(data?.payload?.message);
      }
    });
  };

  const handleCheckout = () => {
    navigate("/shop/checkout");
  };

  let cashfree;

  const initializeSDK = async () => {
    cashfree = await load({
      mode: "sandbox",
    });
  };

  const doPayment = async () => {
    try {
      await initializeSDK();
      let checkoutOptions = {
        paymentSessionId: orderSessionId,
        redirectTarget: "_modal",
      };
      cashfree
        .checkout(checkoutOptions)
        .then((result) => {
          if (result.error) {
            // This will be true whenever user clicks on close icon inside the modal or any error happens during the payment
            console.log(
              "User has closed the popup or there is some payment error, Check for Payment Status"
            );

            console.log(result.error);
            navigate("/shop/return-page?success=false");
            return;
          }
          if (result.redirect) {
            // This will be true when the payment redirection page couldnt be opened in the same window
            // This is an exceptional case only when the page is opened inside an inAppBrowser
            // In this case the customer will be redirected to return url once payment is completed
            console.log("Payment will be redirected");
            navigate("/shop/return-page?success=false");
            return;
          }
          if (result.paymentDetails) {
            // This will be called whenever the payment is completed irrespective of transaction status
            console.log("Payment has been completed, Check for Payment Status");
            console.log(result.paymentDetails.paymentMessage);
          }

          dispatch(verifyPayment({ orderPaymentId, orderId })).then((data) => {
            if (data?.payload?.success) {
              dispatch(getCartItems(user?.id));
              toast.success(data?.payload?.message);
              navigate("/shop/return-page?success=true");
            } else {
              toast.warn(data?.payload?.message);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const arrowFunction = async () => {
    await doPayment();
  };

  useEffect(() => {
    if (isPayment) arrowFunction();
  }, [isPayment]);

  const handlePayment = async () => {
    dispatch(addOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        SetisPayment(true);
        // toast.success(data?.payload?.message);
      } else {
        SetisPayment(false);
        toast.warn(data?.payload?.message);
      }
    });
  };

  if (!cartItems || cartItems?.items?.length === 0)
    return (
      <div className="relative p-10 font-bold min-h-56">No Cart Items</div>
    );

  return (
    <div className="relative pt-2">
      <div className="lg:grid grid-cols-3 lg:px-16 relative space-y-10">
        <div className="col-span-2 space-y-3 p-2 pt-10">
          {cartItems &&
            cartItems?.items &&
            cartItems?.items.length > 0 &&
            cartItems?.items.map((item, i) => (
              <CartItem
                item={item}
                handleRemove={handleRemove}
                handleUpdateQuantity={handleUpdateQuantity}
                key={i}
              />
            ))}
        </div>
        <div className="px-5 relative lg:mt-0">
          <div className="sticky top-[120px]">
            <p className="uppercase font-bold opacity-60 pb-4">Price Details</p>
            <hr />
            <div className="space-y-3 font-semibold opacity-80">
              <div className="flex justify-between pt-3">
                <span>Delivery charges </span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between pt-3">
                <span className="font-bold">Total Amount </span>
                <span className="text-green-600">₹{totalCartAmount}</span>
              </div>
            </div>
            <div className="pt-5">
              {isCheckout ? (
                <Button
                  onClick={handlePayment}
                  sx={{ width: "100%" }}
                  color="yellow"
                  variant="contained"
                  size="small"
                  disabled={isPayLoading}
                >
                  {isPayLoading || isCartLoading ? (
                    <CircularProgress size={25} />
                  ) : (
                    "Make The Payment"
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleCheckout}
                  sx={{ width: "100%" }}
                  variant="contained"
                  disabled={isCartLoading}
                >
                  {isCartLoading ? <CircularProgress size={25} /> : "checkout"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
