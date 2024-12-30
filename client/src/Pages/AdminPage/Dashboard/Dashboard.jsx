import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getTotalUsers,
} from "../../../Store/admin/order-slice";
import { getAllProducts } from "../../../Store/admin/product-slice";

const Dashboard = () => {
  const { orderList, totalUsers } = useSelector((state) => state.adminOrder);
  const { productList } = useSelector((state) => state.adminProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTotalUsers());
  }, [dispatch]);

  const totalRevenue = orderList.reduce((acc, order) => {
    return (
      acc +
      order.cartItems.reduce((acc, item) => {
        return acc + parseFloat(item.price) * parseInt(item.quantity);
      }, 0)
    );
  }, 0);


  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 ">
        <div className="bg-white rounded-3xl shadow p-4 border ">
          <h2 className="text-lg font-bold mb-2">Total Orders</h2>
          <p className="text-3xl font-bold">{orderList.length}</p>
        </div>
        <div className="bg-white rounded-3xl shadow p-4 border ">
          <h2 className="text-lg font-bold mb-2">Total Products</h2>
          <p className="text-3xl font-bold">{productList.length}</p>
        </div>
        <div className="bg-white rounded-3xl shadow p-4 border ">
          <h2 className="text-lg font-bold mb-2">Total Users</h2>
          <p className="text-3xl font-bold">{totalUsers}</p>
        </div>
        <div className="bg-white rounded-3xl shadow p-4 border ">
          <h2 className="text-lg font-bold mb-2">Total Revenue</h2>
          <p className="text-3xl font-bold">₹{totalRevenue}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
