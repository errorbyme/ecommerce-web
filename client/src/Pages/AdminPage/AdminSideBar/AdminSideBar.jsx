import React, { Fragment } from "react";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasketIcon />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <ShoppingCartCheckoutIcon />,
  },
];

const NavItems = () => {
  return (
    <nav className="mt-8 flex-col flex gap-2">
      {menuItems.map((menuItem) => (
        <NavLink
          to={menuItem.path}
          key={menuItem.id}
          children={({ isActive }) => (
            <div
              className={`font-semibold flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer ${
                isActive && "opacity-100 bg-[#f3e5f5] text-[#9500ae]"
              }`}
            >
              {menuItem.icon}
              <span className={`${isActive && "text-[#d500f9]"}`}>
                {menuItem.label}
              </span>
            </div>
          )}
        />
      ))}
    </nav>
  );
};

const AdminSideBar = ({ open, setOpen }) => {
  return (
    <Fragment>
      <aside className=" w-64 flex-col border-r p-6 h-full">
        <div className="flex items-center gap-2 text-2xl">
          <AdminPanelSettingsIcon fontSize="large" color="secondary" />
          <Typography sx={{ fontSize: "1.4rem" }} color="secondary">
            Admin panel
          </Typography>
        </div>
        <NavItems />
      </aside>
    </Fragment>
  );
};

export default AdminSideBar;
