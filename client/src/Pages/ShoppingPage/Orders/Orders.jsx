import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import OrderDetails from "./OrderDetails";
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetails, getOrdersByUserId } from "../../../Store/order-slice";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

export default function Orders() {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails, isLoading } = useSelector(
    (state) => state.userOrder
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getOrdersByUserId(user?.id));
  }, [dispatch]);

  const handleFetchOrderDetails = async (id) => {
    dispatch(getOrderDetails(id));
  };

  React.useEffect(() => {
    if (orderDetails !== null) setOpen(true);
  }, [orderDetails]);

  if (orderList && orderList.length === 0)
    return <div className="text-lg min-h-56 p-10 font-bold">No Orders</div>;

  return (
    <div className="p-5">
      <TableContainer component={Paper} sx={{ minHeight: 245 }}>
        <h1 className="text-xl font-bold p-2">All Orders</h1>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Order Id</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Order Status</TableCell>
              <TableCell>Order Price</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderList &&
              orderList.length > 0 &&
              orderList.map((orderItem, i) => (
                <TableRow key={i}>
                  <TableCell>{orderItem?._id}</TableCell>
                  <TableCell>{orderItem?.orderDate?.split("T")[0]}</TableCell>
                  <TableCell>
                    <div
                      className={`${
                        orderItem?.orderStatus === "confirmed"
                          ? "bg-green-300"
                          : orderItem?.orderStatus === "canceled"
                          ? "bg-red-300"
                          : "bg-gray-300"
                      } p-1 rounded-lg font-bold text-xs capitalize`}
                    >
                      {orderItem?.orderStatus}
                    </div>
                  </TableCell>
                  <TableCell>₹{orderItem?.totalAmount}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleFetchOrderDetails(orderItem?._id)}
                      sx={{ p: 0.5, fontSize: 9, fontWeight: "bold" }}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <CircularProgress size={25} />
                      ) : (
                        <span>
                          view details <ArrowRightAltIcon />
                        </span>
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <OrderDetails orderDetails={orderDetails} open={open} setOpen={setOpen} />
    </div>
  );
}
