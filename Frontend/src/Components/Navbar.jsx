import React from "react";
import cartImage from "../assets/FrontendAssets/cart_icon.png";
import userImage from "../assets/FrontendAssets/user.png";
import loveImage from "../assets/FrontendAssets/love.png";

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="Navbar">
      <div className="logo">
        <p>E-commerce</p>
      </div>
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
        <Link to={"/kids"}>
          <li>Kids</li>
        </Link>
      </ul>
      <div className="Navbar-More-Menu">
        <Link to={"/love"}>
          <img src={loveImage} alt="cart" />
        </Link>
        <div className="cart-container">
          <Link to={"/cart"}>
            {" "}
            <img src={cartImage} alt="cart" />
          </Link>
        </div>
        <div className="Navbar-Cart-Count">0</div>
        <Link to={"/login"}>
          <img src={userImage} alt="cart" />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
