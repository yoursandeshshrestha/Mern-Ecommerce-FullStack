import React, { useState, useEffect, useContext } from "react";
import "./SellerDashboard.css";
import { userContext } from "../../Context/userContext";

function SellerDashboard() {
  const { currentUser } = useContext(userContext);

  return (
    <div className="SellerDashboard-Container">
      <div className="SellerDashboard-Wrapper">
        <h2>Welcome back,</h2>
        <p>{currentUser.username}</p>
        <form action="">
          <input type="text" placeholder={currentUser.username} />
          <input type="text" placeholder={currentUser.shopName} />
          <input type="email" placeholder={currentUser.email} />
          <input type="password" />
          <button>Update</button>
        </form>
      </div>
    </div>
  );
}

export default SellerDashboard;
