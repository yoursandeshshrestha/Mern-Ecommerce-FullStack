import React, { useState, useEffect, useContext } from "react";
import "./SellerDashboard.css";
import { userContext } from "../../../Context/userContext";

function SellerDashboard() {
  const { currentUser } = useContext(userContext);

  return (
    <div className="SellerDashboard-Container">
      <div className="SellerDashboard-Wrapper">
        <h2>Welcome back,</h2>
        <p>{currentUser.username}</p>
      </div>
    </div>
  );
}

export default SellerDashboard;
