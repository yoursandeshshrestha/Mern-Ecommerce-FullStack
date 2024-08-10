import React from "react";
import { Outlet } from "react-router-dom";

const CheckoutLayout = ({ children }) => {
  return (
    <>
      <Outlet>{children}</Outlet>
    </>
  );
};

export default CheckoutLayout;
