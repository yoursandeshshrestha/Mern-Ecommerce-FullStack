import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import CustomerSidebar from "../Pages/Customer/CustomerSidebar/CustomerSidebar";
import CustomerDashboard from "../Pages/Customer/CustomerDashboard/CustomerDashboard";

const CustomerLayout = ({ children }) => {
  const location = useLocation();
  return (
    <div className="CustomerLayout-Container">
      <CustomerSidebar />
      {location.pathname === "/my-account" && <CustomerDashboard />}
      <Outlet>{children}</Outlet>
    </div>
  );
};

export default CustomerLayout;
