import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import AdminSideBar from "../AdminSideBar/AdminSideBar";
import SideDrawer from "../AdminSideBar/SideDrawer";

const AdminPageLayout = () => {
  const [openSidebar, SetOpenSidebar] = useState(false);
  return (
    <div className="flex h-full w-full fixed">
      <div className="hidden lg:block sticky top-0 z-10">
        <AdminSideBar open={openSidebar} setOpen={SetOpenSidebar} />
      </div>
      <SideDrawer open={openSidebar} setOpen={SetOpenSidebar} />
      <div className="flex flex-1 flex-col h-full sticky top-0 overflow-y-auto">
        <div className="sticky top-0 z-30 bg-white ">
          <Header setOpen={SetOpenSidebar} />
        </div>
        <main className="flex-1 flex bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminPageLayout;
