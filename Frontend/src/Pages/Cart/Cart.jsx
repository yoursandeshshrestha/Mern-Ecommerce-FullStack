import React from "react";
import "./Cart.css";
import testImage from "../../assets/Ecommerce-design-idea/Images/20.png";
import crossImage from "../../assets/UserAsset/close.png";

function Cart() {
  return (
    <div className="Cart-Container">
      <div className="Shopping-Cart">
        <h2>Shopping Cart</h2>
        <div className="Cart-Product-Details">
          <p>Product</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Subtotal</p>
        </div>
        <div className="Cart-Product-List-Wrapper">
          <div className="Cart-Product-List">
            <button className="Cross-button">
              <img src={crossImage} alt="cross" />
            </button>
            <img src={testImage} alt="Product image" />
            <p>Cardigan </p>
            <p className="price-for-gray">
              <span>&#8377;</span>1499
            </p>
            <div className="Quantity-Container">
              <button>-</button>
              <p>3</p>
              <button>+</button>
            </div>
            <p>
              <span>&#8377;</span>3000
            </p>
          </div>
        </div>
      </div>
      <div className="Cart-Total">
        <h2>Cart Totals</h2>
        <div className="Cart-Total-Detail">
          <p>Subtotal</p>
          <p>
            <span>&#8377;</span>300
          </p>
        </div>
        <div className="Cart-Total-Shipping">
          <div className="Cart-Total-Shipping-Other">
            <p>Estimated shipping and handling </p>
            <p>
              <span>&#8377;</span>60
            </p>
          </div>
          <div className="Cart-Total-Shipping-Other">
            <p>Estimated Tax </p>
            <p>--</p>
          </div>
        </div>
        <div className="Cart-Total-Total">
          <p>All Total</p>
          <p>
            <span>&#8377;</span>60
          </p>
        </div>
        <button className="Check-Out-Button">Proceed to Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
