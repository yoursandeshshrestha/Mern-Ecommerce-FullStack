import React from "react";
import { Outlet } from "react-router-dom";

const SellerLayout = ({ children }) => {
  return <Outlet>{children}</Outlet>;
};

export default SellerLayout;
