import React from "react";
import "./BillingDetails.css";
import { Link } from "react-router-dom";

function BillingDetails() {
  return (
    <div className="BillingDetails-Container">
      <div className="BillingDetails-Header">
        <h2>Billing Details</h2>
        <p>
          <Link to={"/"}>Home</Link> / <Link to={"/cart"}>Cart</Link> /{" "}
          <Link to={"/cart/billing-details"}>Billing-Details</Link>
        </p>
      </div>
      <form action="">
        <div className="input-section">
          <div className="input-group">
            <label>Country</label>
            <input type="text" placeholder="Country / Region" />
          </div>
          <div className="input-group">
            <label>Address</label>
            <input type="text" placeholder="Address" />
          </div>
          <div className="input-group">
            <label>City</label>
            <input type="text" placeholder="City" />
          </div>
          <div className="input-group">
            <label>State</label>
            <input type="text" placeholder="State" />
          </div>
          <div className="input-group">
            <label>Pincode</label>
            <input type="text" placeholder="Pincode" />
          </div>
          <div className="input-group">
            <label>Phone Number</label>
            <input type="text" placeholder="Phone Number" />
          </div>
        </div>
        <div className="button-section">
          <h2>Checkout Section</h2>
          <button>Checkout</button>
        </div>
      </form>
    </div>
  );
}

export default BillingDetails;
