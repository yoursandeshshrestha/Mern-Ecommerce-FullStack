import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import SellerSiderbar from "../Pages/Seller/SellerSidebar/SellerSidebar";
import SellerDashboard from "../Pages/Seller/SellerDashboard/SellerDashboard";

const SellerLayout = ({ children }) => {
  const location = useLocation();
  return (
    <div className="SellerLayout-Container">
      <SellerSiderbar />
      {location.pathname === "/dashboard" && <SellerDashboard />}
      <Outlet>{children}</Outlet>
    </div>
  );
};

export default SellerLayout;
