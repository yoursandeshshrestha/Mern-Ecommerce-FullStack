import React from "react";
import cartImage from "../assets/FrontendAssets/cart_icon.png";

function Navbar() {
  return (
    <div className="Navbar">
      <div className="logo">
        <p>E-commerce</p>
      </div>
      <ul className="Navbar-Menu">
        <li>Home</li>
        <li>Men</li>
        <li>Women</li>
        <li>Kids</li>
      </ul>
      <div className="Navbar-More-Menu">
        <button>Login</button>
        <div className="cart">
          <img src={cartImage} alt="cart" />
        </div>
        <div className="Navbar-Cart-Count">0</div>
      </div>
    </div>
  );
}

export default Navbar;
