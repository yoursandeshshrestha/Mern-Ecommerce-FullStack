import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = ({ children }) => {
  console.log("Rendering MainLayout");
  return (
    <>
      <Navbar />
      <Outlet>{children}</Outlet>
      <Footer />
    </>
  );
};

export default MainLayout;
