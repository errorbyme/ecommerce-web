import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useState } from "react";
import OrderDetails from "./OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
} from "../../../Store/admin/order-slice";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

export default function Orders() {
  const [open, setOpen] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  const handleFetchOrderDetails = async (id) => {
    dispatch(getOrderDetailsForAdmin(id));
  };

  React.useEffect(() => {
    if (orderDetails !== null) setOpen(true);
  }, [orderDetails]);

  if (orderList && orderList.length === 0)
    return <div className="text-lg min-h-56 p-10 font-bold">No Orders</div>;

  return (
    <TableContainer component={Paper}>
      <h1 className="text-xl font-bold p-2">All Orders</h1>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
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
                    } p-2 rounded-lg font-bold text-xs w-full capitalize`}
                  >
                    {orderItem?.orderStatus}
                  </div>
                </TableCell>
                <TableCell>₹{orderItem?.totalAmount}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleFetchOrderDetails(orderItem?._id)}
                    sx={{ p: 0.5, fontSize: 9, fontWeight: "bold" }}
                  >
                    view details <ArrowRightAltIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <OrderDetails orderDetails={orderDetails} open={open} setOpen={setOpen} />
    </TableContainer>
  );
}
