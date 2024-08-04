import React, { useState, useEffect, useContext } from "react";
import "./SellerDashboard.css";
import { userContext } from "../../../Context/userContext";
import productIcon from "../../../assets/SellerAsset/colorproduct.png";
import orderIcon from "../../../assets/SellerAsset/order.png";
import saleIcon from "../../../assets/SellerAsset/sale.png";

function SellerDashboard() {
  const { currentUser } = useContext(userContext);

  return (
    <div className="SellerDashboard-Container">
      <div className="SellerDashboard-Wrapper">
        <h2>Welcome, {currentUser.username}</h2>
      </div>
      <div className="SellerDashboard-First">
        <div className="SellerDashboard-Itemone">
          <img src={productIcon} alt="icon" />
          <div className="SellerDashboard-Itemone-info">
            <h3>55</h3>
            <p>Total Product</p>
          </div>
        </div>
        <div className="SellerDashboard-Itemone">
          <img src={orderIcon} alt="icon" />
          <div className="SellerDashboard-Itemone-info">
            <h3>55</h3>
            <p>Total Orders</p>
          </div>
        </div>
        <div className="SellerDashboard-Itemone">
          <img src={saleIcon} alt="icon" />
          <div className="SellerDashboard-Itemone-info">
            <h3>55</h3>
            <p>Total Sales</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;
