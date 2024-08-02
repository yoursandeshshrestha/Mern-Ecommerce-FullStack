import React, { useContext } from "react";
import "./SellerSidebar.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../../Context/userContext.jsx";
import dashboardIcon from "../../../assets/SellerAsset/dashboard.png";
import productIcon from "../../../assets/SellerAsset/product.png";
import profileIcon from "../../../assets/SellerAsset/profile.png";
import logoutIcon from "../../../assets/SellerAsset/logout.png";

function SellerSidebar() {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(userContext);

  const handleSignout = (e) => {
    e.preventDefault();
    Cookies.remove("token");
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <div className="SellerSidebar-Container">
      <div className="SellerSidebar-Top">
        <div className="SellerSidebar-Dashboard">
          <img src={dashboardIcon} alt="icon" />
          <p>Dashboard</p>
        </div>
        <div className="SellerSidebar-Product">
          <img src={productIcon} alt="icon" />
          <p>Product</p>
        </div>
        <div className="SellerSidebar-Profile">
          <img src={profileIcon} alt="icon" />
          <p>Profile</p>
        </div>
      </div>
      <div className="SellerSidebar-Logout" onClick={handleSignout}>
        <img src={logoutIcon} alt="icon" />
        <p>Logout</p>
      </div>
    </div>
  );
}

export default SellerSidebar;
