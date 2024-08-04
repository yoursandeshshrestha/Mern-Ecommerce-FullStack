import React, { useContext } from "react";
import "./SellerSidebar.css";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../../Context/userContext.jsx";
import dashboardIcon from "../../../assets/SellerAsset/dashboard.png";
import productIcon from "../../../assets/SellerAsset/product.png";
import createProductIcon from "../../../assets/SellerAsset/createproduct.png";
import profileIcon from "../../../assets/SellerAsset/profile.png";
import logoutIcon from "../../../assets/SellerAsset/logout.png";
import homeIcon from "../../../assets/SellerAsset/home.png";

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
        <Link to={"/dashboard"}>
          <div className="SellerSidebar-Dashboard">
            <img src={dashboardIcon} alt="icon" />
            <p>Dashboard</p>
          </div>
        </Link>
        <Link to={"/dashboard/product"}>
          <div className="SellerSidebar-CreateProduct">
            <img src={createProductIcon} alt="icon" />
            <p> Create Product</p>
          </div>
        </Link>
        <Link to={"/dashboard/allproduct"}>
          <div className="SellerSidebar-Product">
            <img src={productIcon} alt="icon" />
            <p>All Product</p>
          </div>
        </Link>
        <Link to={"/dashboard/profile"}>
          <div className="SellerSidebar-Profile">
            <img src={profileIcon} alt="icon" />
            <p>Profile</p>
          </div>
        </Link>
      </div>
      <div className="Sidebar-Wrapper">
        <Link to={"/"}>
          <div className="SellerSidebar-Logout">
            <img src={homeIcon} alt="icon" />
            <p>Home</p>
          </div>
        </Link>
        <div className="SellerSidebar-Logout" onClick={handleSignout}>
          <img src={logoutIcon} alt="icon" />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
}

export default SellerSidebar;
