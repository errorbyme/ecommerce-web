import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  setOrderDetails,
  updateOrderStatus,
} from "../../../Store/admin/order-slice";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  maxWidth: "500px",
  width: "100%",
  maxHeight: "500px",
  height: "100%",
};

export default function OrderDetails({ open, setOpen, orderDetails }) {
  const dispatch = useDispatch();
  const [orderStatus, setOrderStatus] = React.useState("");

  const handleClose = async () => {
    dispatch(setOrderDetails());
    setOpen(false);
  };

  const handleOrderStatusSubmit = async () => {
    dispatch(updateOrderStatus({ id: orderDetails?._id, orderStatus })).then(
      (data) => {
        if (data?.payload?.success) {
          dispatch(getOrderDetailsForAdmin(orderDetails?._id));
          dispatch(getAllOrdersForAdmin());
          toast.success(data?.payload?.message);
          setOrderStatus("");
        } else {
          toast.warn(data?.payload?.message);
        }
      }
    );
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="bg-white border rounded-lg max-h-[500px h-[100%] overflow-y-auto">
            <div className="flex justify-end mb-2 sticky top-0 bg-white z-10">
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>
            <div className="space-y-6 px-3 font-semibold py-2 text-gray-800 rounded-lg">
              <div className="flex justify-between gap-3">
                <span>Order ID</span>
                <span className="opacity-80">
                  {orderDetails?._id.slice(0, 10)}...
                </span>
              </div>
              <div className="flex justify-between">
                <span>Order Date</span>
                <span className="opacity-80">
                  {orderDetails?.orderDate?.split("T")[0]}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Order price</span>
                <span className="opacity-80 font-bold text-sm">
                  ₹{orderDetails?.totalAmount}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Payment Status</span>
                <span className="opacity-80 font-bold text-sm">
                  {orderDetails?.paymentStatus}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Order Status</span>
                <span
                  className={`${
                    orderDetails?.orderStatus === "confirmed"
                      ? "bg-green-300"
                      : orderDetails?.orderStatus === "canceled"
                      ? "bg-red-300"
                      : "bg-gray-300"
                  } p-1 rounded-lg font-bold text-xs capitalize`}
                >
                  {" "}
                  {orderDetails?.orderStatus}
                </span>
              </div>
              <div className="pt-2">
                <p>Order Details</p>
                <ul className="grid gap-3">
                  {orderDetails?.cartItems &&
                    orderDetails?.cartItems.length > 0 &&
                    orderDetails?.cartItems.map((item, i) => (
                      <li className=" opacity-70 border p-1" key={i}>
                        <div className="flex justify-between gap-2">
                          <span className="text-black font-bold text-sm">
                            {item?.title}
                          </span>
                          <span>₹{item?.price}</span>
                        </div>
                        <div className="text-sm flex gap-2 capitalize">
                          {item?.color}, {item?.size} - {item?.quantity}
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="">
                <h2>Shipping Info</h2>
                <div className="opacity-60">
                  <h1 className="font-bold">
                    Name :
                    {" " +
                      orderDetails?.addressInfo.firstName +
                      " " +
                      orderDetails?.addressInfo.lastName}
                  </h1>
                  <p>{orderDetails?.addressInfo.address}</p>
                  <p>
                    {orderDetails?.addressInfo.city},{" "}
                    {orderDetails?.addressInfo.state} -{" "}
                    {orderDetails?.addressInfo.pincode}
                  </p>
                </div>
              </div>
              <div className="">
                <select
                  className="w-full p-2 outline-none border rounded-lg"
                  value={orderStatus}
                  onChange={(e) => setOrderStatus(e.target.value)}
                  name="order-status"
                  id=""
                >
                  <option value="" disabled hidden>
                    Order Status
                  </option>
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="canceled">Canceled</option>
                </select>
                <div className="mt-5">
                  <Button
                    onClick={handleOrderStatusSubmit}
                    variant="contained"
                    color="secondary"
                    fullWidth
                    disabled={
                      orderDetails?.orderStatus === orderStatus ||
                      orderStatus === ""
                    }
                  >
                    Update Order Status
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
