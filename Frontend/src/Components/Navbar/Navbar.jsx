import React, { useState, useEffect, useContext } from "react";
import { userContext } from "../../Context/userContext";
import "./Navbar.css";
import cartImage from "../../assets/FrontendAssets/cart_icon.png";
import userImage from "../../assets/FrontendAssets/user.png";
import loveImage from "../../assets/FrontendAssets/love.png";
import logoutIcon from "../../assets/SellerAsset/logout.png";
import dashboardImage from "../../assets/SellerAsset/dashboard.png";
import ordersImage from "../../assets/SellerAsset/orderIcon.png";
import productImage from "../../assets/SellerAsset/product.png";
import createProductImage from "../../assets/SellerAsset/createproduct.png";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [loadingImages, setLoadingImages] = useState({
    cartImage: true,
    userImage: true,
    loveImage: true,
    logoutIcon: true,
    dashboardImage: true,
    ordersImage: true,
    productImage: true,
    createProductImage: true,
  });

  const { currentUser, logout, cartItemCount } = useContext(userContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    const handleClickOutside = (event) => {
      if (!event.target.closest(".user-icon-dropdown")) {
        setDropdownVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleImageLoad = (imageName) => {
    setLoadingImages((prevState) => ({
      ...prevState,
      [imageName]: false,
    }));
  };

  const renderImageWithLoader = (src, alt, imageName) => (
    <div style={{ position: "relative", display: "inline-block" }}>
      {loadingImages[imageName] && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
            width: "40px",
            height: "40px",
          }}
        >
          <CircularProgress size={24} />
        </Box>
      )}
      <img
        src={src}
        alt={alt}
        style={{ visibility: loadingImages[imageName] ? "hidden" : "visible" }}
        onLoad={() => handleImageLoad(imageName)}
        onError={() => handleImageLoad(imageName)}
        onClick={() => {
          setDropdownVisible(!dropdownVisible);
        }}
      />
    </div>
  );

  return (
    <div className={`Navbar ${scrolled ? "scrolled" : ""}`}>
      <ul className="Navbar-Menu">
        <Link to={"/"}>
          <li>Home</li>
        </Link>
        <Link to={"/shop"}>
          <li>Shop</li>
        </Link>
      </ul>
      <div className="logo">
        <p>E-commerce</p>
      </div>
      <div className="Navbar-More-Menu">
        {currentUser && currentUser.accountType === "Customer" && (
          <>
            <div className="cart-container">
              <Link to={"/cart"}>
                {renderImageWithLoader(cartImage, "cart", "cartImage")}
              </Link>
            </div>
            {cartItemCount > 0 ? (
              <div className="Navbar-Cart-Count">{cartItemCount}</div>
            ) : null}
            <div className="user-icon-dropdown">
              {renderImageWithLoader(userImage, "user", "userImage")}
              {dropdownVisible && (
                <div className="dropdown-menu">
                  <Link to={"/my-account"} className="profile-Button-Navbar">
                    {renderImageWithLoader(userImage, "icon", "userImage")}
                    <p>Profile</p>
                  </Link>
                  <Link
                    to={"/my-account/orders"}
                    className="profile-Button-Navbar"
                  >
                    {renderImageWithLoader(ordersImage, "icon", "ordersImage")}
                    <p>Orders</p>
                  </Link>
                  <div className="logout-Button-Navbar" onClick={logout}>
                    {renderImageWithLoader(logoutIcon, "icon", "logoutIcon")}
                    <p>Logout</p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
        {currentUser && currentUser.accountType === "Seller" && (
          <div className="user-icon-dropdown">
            {renderImageWithLoader(userImage, "user", "userImage")}
            {dropdownVisible && (
              <div className="dropdown-menu">
                <Link to={"/dashboard"} className="profile-Button-Navbar">
                  {renderImageWithLoader(
                    dashboardImage,
                    "icon",
                    "dashboardImage"
                  )}
                  <p>Dashboard</p>
                </Link>
                <Link
                  to={"/dashboard/all-products"}
                  className="profile-Button-Navbar"
                >
                  {renderImageWithLoader(productImage, "icon", "productImage")}
                  <p>View Product</p>
                </Link>
                <Link
                  to={"/dashboard/manage-orders"}
                  className="profile-Button-Navbar"
                >
                  {renderImageWithLoader(ordersImage, "icon", "ordersImage")}
                  <p>Manage Orders</p>
                </Link>
                <Link
                  to={"/dashboard/create-product"}
                  className="profile-Button-Navbar"
                >
                  {renderImageWithLoader(
                    createProductImage,
                    "icon",
                    "createProductImage"
                  )}
                  <p>Create Product</p>
                </Link>
                <div className="logout-Button-Navbar" onClick={logout}>
                  {renderImageWithLoader(logoutIcon, "icon", "logoutIcon")}
                  <p>Logout</p>
                </div>
              </div>
            )}
          </div>
        )}
        {currentUser === null && (
          <>
            <div className="cart-container">
              <Link to={"/cart"}>
                {renderImageWithLoader(cartImage, "cart", "cartImage")}
              </Link>
            </div>
            {cartItemCount > 0 ? (
              <div className="Navbar-Cart-Count">{cartItemCount}</div>
            ) : null}
            <Link to={"/login"}>
              {renderImageWithLoader(userImage, "user", "userImage")}
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
