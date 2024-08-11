import React, { useContext, useState, useEffect } from "react";
import "./Checkout.css";
import test from "../../assets/Ecommerce-design-idea/Images/20.png";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/userContext";
import axios from "axios";

function Checkout() {
  const { currentUser } = useContext(userContext);
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState(
    currentUser?.cartDetails || []
  );
  const [country, setCountry] = useState(
    currentUser?.shippingData?.country || ""
  );
  const [city, setCity] = useState(currentUser?.shippingData?.city || "");
  const [address, setAddress] = useState(
    currentUser?.shippingData?.address || ""
  );
  const [state, setState] = useState(currentUser?.shippingData?.state || "");
  const [pincode, setPincode] = useState(
    currentUser?.shippingData?.pinCode || ""
  );
  const [phone, setPhone] = useState(currentUser?.shippingData?.phoneNo || "");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const calculateSubtotal = () => {
    return cartProducts.reduce(
      (total, item) =>
        total + (item.productPrice || 0) * (item.productQuantity || 0),
      0
    );
  };

  const handleCheckout = async () => {
    try {
      const orderData = {
        buyer: currentUser._id,
        shippingData: {
          address,
          city,
          state,
          country,
          pinCode: pincode,
          phoneNo: phone,
        },
        orderedProducts: cartProducts.map((product) => ({
          productName: product.productName,
          productID: product.productID,
          price: product.productPrice,
          image: product.productImage,
          size: product.size,
          description: product.description,
          category: product.category,
          quantity: product.productQuantity,
          seller: product.seller,
          shopName: product.shopName,
        })),
        paymentInfo: {
          id: paymentMethod,
          status: "Completed",
        },
        productsQuantity: cartProducts.reduce(
          (total, item) => total + item.productQuantity,
          0
        ),
        totalPrice: calculateSubtotal() + 60, // Assuming 60 is the shipping cost
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/order/create`,
        orderData,
        { withCredentials: true }
      );

      console.log("Order successful:", response.data);
      navigate("/cart/thankyou");
    } catch (error) {
      console.error("Error processing checkout", error);
    }
  };

  return (
    <div className="Checkout-Container">
      <div className="Checkout-Navbar">
        <h3>Checkout</h3>
        <p>
          <Link to="/">Home</Link> / <Link to="/cart">Cart</Link> /{" "}
          <Link to="/cart/checkout">Checkout</Link>
        </p>
      </div>
      <div className="Checkout-Wrapper">
        <div className="Checkout-Left-Section">
          <h3>Shipping Address</h3>
          <form className="Checkout-Form">
            <div className="Input-Group-One">
              <div className="Checkout-Input-Group">
                <label>Country</label>
                <input
                  type="text"
                  placeholder="Country / Region"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div className="Checkout-Input-Group">
                <label>City</label>
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>
            <div className="Checkout-Input-Group">
              <label>Address</label>
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="Input-Group-One">
              <div className="Checkout-Input-Group">
                <label>State</label>
                <input
                  type="text"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
              <div className="Checkout-Input-Group">
                <label>Pincode</label>
                <input
                  type="text"
                  placeholder="Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
              </div>
              <div className="Checkout-Input-Group">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="Payment-Method-Container">
              <h3>Payment Method</h3>
              <div className="Payment-Method-Wrapper">
                <div className="Payment-Method-Container-Input-Group">
                  <input
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  <label htmlFor="cod">Cash on Delivery</label>
                </div>
                <div className="Payment-Method-Container-Input-Group">
                  <input
                    type="radio"
                    id="online"
                    name="paymentMethod"
                    checked={paymentMethod === "online"}
                    onChange={() => setPaymentMethod("online")}
                  />
                  <label htmlFor="online">Pay Online</label>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="Checkout-Right-Section">
          <div className="Checkout-Right-Top-Section">
            <h3>Order Summary</h3>
            <div className="Checkout-Item-Summary">
              <p>Items</p>
              <p>{cartProducts.length}</p>
            </div>
            <div className="Checkout-Total-Summary">
              <p>Total</p>
              <p>
                <span>&#8377;</span>
                {calculateSubtotal() + 60}
              </p>
            </div>
          </div>
          <div className="Checkout-Right-Bottom-Section">
            <h3>Order Details</h3>
            <div className="Checkout-Right-Bottom-Section-Products">
              {cartProducts.map((product) => (
                <div className="Checkout-Right-Products" key={product._id}>
                  <img
                    src={`${import.meta.env.VITE_IMAGE_URL}/uploads/${
                      product.productImage
                    }`}
                    alt={product.productName}
                  />
                  <div className="Checkout-Right-Products-Desc">
                    <p>{product.productName}</p>
                    <p>{product.description}</p>
                    <div className="Checkout-Section-Q-P">
                      <p>Qty {product.productQuantity}</p> -
                      <p>
                        <span>&#8377;</span>
                        {product.productPrice * product.productQuantity}
                      </p>
                    </div>
                    <p>Remove Item</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="Checkout-Button-Section">
            <button onClick={handleCheckout}>Place Order</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
