import React, { useState, useEffect, useContext } from "react";
import { userContext } from "../../Context/userContext";
import "./Navbar.css";
import cartImage from "../../assets/FrontendAssets/cart_icon.png";
import userImage from "../../assets/FrontendAssets/user.png";
import loveImage from "../../assets/FrontendAssets/love.png";
import { Link } from "react-router-dom";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { currentUser } = useContext(userContext);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
            <p>{currentUser.email}</p>
            <Link to={"/love"}>
              <img src={loveImage} alt="love" />
            </Link>
            <div className="cart-container">
              <Link to={"/cart"}>
                <img src={cartImage} alt="cart" />
              </Link>
            </div>
            <div className="Navbar-Cart-Count">0</div>
            <Link to={"/customer/dashboard"}>
              <img src={userImage} alt="user" />
            </Link>
          </>
        )}
        {currentUser && currentUser.accountType === "Seller" && (
          <Link to={"/seller/dashboard"}>
            <p>Dashboard</p>
          </Link>
        )}
        {currentUser === null && (
          <Link to={"/login"}>
            <img src={userImage} alt="user" />
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
