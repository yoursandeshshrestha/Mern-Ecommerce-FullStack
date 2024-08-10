import React, { useContext } from "react";
import "./Thankyou.css";
import orderPlaced from "../../assets/UserAsset/orderPlaced.png";
import { userContext } from "../../Context/userContext";
import { Link } from "react-router-dom";

function Thankyou() {
  const { currentUser } = useContext(userContext);
  return (
    <div className="Thankyou-Container">
      <div className="Thankyou-section-one">
        <img src={orderPlaced} alt="icon" />
        <p>Order Placed Successfully!</p>
      </div>
      <div className="Thankyou-section-two">
        <p>Thank you, {currentUser?.username} for shopping with us</p>
        <Link to={"/"}>
          <button>Continue Shopping</button>
        </Link>
      </div>
    </div>
  );
}

export default Thankyou;
