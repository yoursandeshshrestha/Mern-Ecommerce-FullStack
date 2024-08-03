import React from "react";
import "./SellerMain.css";
import SellerSidebar from "../SellerSidebar/SellerSidebar";
import SellerDashboard from "../SellerDashboard/SellerDashboard";
import CreateProduct from "../SellerCreateProduct/CreateProduct";

function SellerMain() {
  return (
    <div className="SellerMain-Container">
      <SellerSidebar />
      {/* <SellerDashboard /> */}
      <CreateProduct />
    </div>
  );
}

export default SellerMain;
