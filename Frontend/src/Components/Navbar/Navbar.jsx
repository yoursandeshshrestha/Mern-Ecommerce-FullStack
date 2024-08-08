import React, { useState, useEffect, useContext } from "react";
import { userContext } from "../../Context/userContext";
import "./Navbar.css";
import cartImage from "../../assets/FrontendAssets/cart_icon.png";
import userImage from "../../assets/FrontendAssets/user.png";
import loveImage from "../../assets/FrontendAssets/love.png";
import logoutIcon from "../../assets/SellerAsset/logout.png";
import dashboardImage from "../../assets/SellerAsset/dashboard.png";
import { Link } from "react-router-dom";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { currentUser, logout, cartItemCount } = useContext(userContext);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
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

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className={`Navbar ${scrolled ? "scrolled" : ""}`}>
      <ul className="Navbar-Menu">
        <Link to={"/"}>
          <li>Home</li>
        </Link>
        <Link to={"/men"}>
          <li>Mens</li>
        </Link>
        <Link to={"/women"}>
          <li>Women</li>
        </Link>
      </ul>
      <div className="logo">
        <p>E-commerce</p>
      </div>
      <div className="Navbar-More-Menu">
        {currentUser && currentUser.accountType === "Customer" && (
          <>
            <Link to={"/love"}>
              <img src={loveImage} alt="love" />
            </Link>
            <div className="cart-container">
              <Link to={"/cart"}>
                <img src={cartImage} alt="cart" />
              </Link>
            </div>
            <div className="Navbar-Cart-Count">{cartItemCount}</div>
            <div className="user-icon-dropdown">
              <img
                src={userImage}
                alt="user"
                onClick={toggleDropdown}
                className="user-icon"
              />
              {dropdownVisible && (
                <div className="dropdown-menu">
                  <Link to={"/my-account"} className="profile-Button-Navbar">
                    <img src={userImage} alt="icon" />
                    <p>Profile</p>
                  </Link>

                  <div className="logout-Button-Navbar" onClick={logout}>
                    <img src={logoutIcon} alt="icon" />
                    <p>logout</p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
        {currentUser && currentUser.accountType === "Seller" && (
          <div className="user-icon-dropdown">
            <img
              src={userImage}
              alt="user"
              onClick={toggleDropdown}
              className="user-icon"
            />
            {dropdownVisible && (
              <div className="dropdown-menu">
                <Link to={"/dashboard"} className="profile-Button-Navbar">
                  <img src={dashboardImage} alt="icon" />
                  <p>Dashboard</p>
                </Link>

                <div className="logout-Button-Navbar" onClick={logout}>
                  <img src={logoutIcon} alt="icon" />
                  <p>logout</p>
                </div>
              </div>
            )}
          </div>
        )}
        {currentUser === null && (
          <>
            <Link to={"/love"}>
              <img src={loveImage} alt="love" />
            </Link>
            <div className="cart-container">
              <Link to={"/cart"}>
                <img src={cartImage} alt="cart" />
              </Link>
            </div>
            <div className="Navbar-Cart-Count">0</div>
            <Link to={"/login"}>
              <img src={userImage} alt="user" />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
