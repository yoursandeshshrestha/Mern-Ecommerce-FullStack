import React, { useContext } from "react";
import "./CustomerSidebar.css";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../../Context/userContext.jsx";
import dashboardIcon from "../../../assets/SellerAsset/dashboard.png";
import orderIcon from "../../../assets/UserAsset/orderIcon.png";
import addressIcon from "../../../assets/UserAsset/addresses.png";
import accountIcon from "../../../assets/UserAsset/user.png";

import logoutIcon from "../../../assets/SellerAsset/logout.png";
import homeIcon from "../../../assets/SellerAsset/home.png";

function CustomerSidebar() {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(userContext);

  const handleSignout = (e) => {
    e.preventDefault();
    Cookies.remove("token");
    setCurrentUser(null);
    navigate("/");
  };
  return (
    <div className="CustomerSidebar-Container">
      <Link to={"/my-account"}>
        <div className="CustomerSidebar-Common">
          <img src={dashboardIcon} alt="icon" />
          <p>Dashboard</p>
        </div>
      </Link>
      <Link to={"/my-account/orders"}>
        <div className="CustomerSidebar-Common">
          <img src={orderIcon} alt="icon" />
          <p>Orders</p>
        </div>
      </Link>
      <Link to={"/my-account/address"}>
        <div className="CustomerSidebar-Common">
          <img src={addressIcon} alt="icon" />
          <p>Address</p>
        </div>
      </Link>
      <Link to={"/my-account/edit-account"}>
        <div className="CustomerSidebar-Common">
          <img src={accountIcon} alt="icon" />
          <p>Account Details</p>
        </div>
      </Link>
      <Link to={"/"}>
        <div className="CustomerSidebar-Common">
          <img src={homeIcon} alt="icon" />
          <p>Home</p>
        </div>
      </Link>
      <div className="CustomerSidebar-Common" onClick={handleSignout}>
        <img src={logoutIcon} alt="icon" />
        <p>Logout</p>
      </div>
    </div>
  );
}

export default CustomerSidebar;
