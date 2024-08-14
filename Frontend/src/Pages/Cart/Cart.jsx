import React, { useContext, useState, useEffect } from "react";
import "./Cart.css";
import crossImage from "../../assets/UserAsset/close.png";
import emptyCart from "../../assets/UserAsset/cartEmpty.jpg";
import { userContext } from "../../Context/userContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const { currentUser } = useContext(userContext);
  const [cartProducts, setCartProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setCartProducts(currentUser.cartDetails || []);
    }
  }, [currentUser]);

  const calculateSubtotal = () => {
    return (
      cartProducts.reduce((total, item) => {
        return total + (item.productPrice || 0) * (item.productQuantity || 0);
      }, 0) || 0
    );
  };

  const handleRemoveItem = async (id) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/cart/remove`,
        { userId: currentUser._id, productID: id }
      );

      setCartProducts(response.data.cartDetails);
    } catch (error) {
      console.error("Error removing product from cart", error);
    }
  };

  const updateProductQuantity = async (productID, quantityChange) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/cart/update-quantity`,
        { userId: currentUser._id, productID, quantityChange }
      );

      setCartProducts(response.data.cartDetails);
    } catch (error) {
      console.error("Error updating product quantity", error);
    }
  };

  if (cartProducts.length === 0) {
    return (
      <div className="No-Product-Container">
        <img src={emptyCart} alt="picture" />
        <p>There's nothing in here</p>
        <Link to={"/"}>
          <button className="button-38">Go Shopping</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="Cart-Container">
      <div className="Shopping-Cart">
        <h2>Shopping Cart</h2>
        <table className="Cart-Product-Table">
          <thead>
            <tr>
              <th></th>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Size</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody className="tbody-container">
            {cartProducts.map((item) => (
              <tr key={item._id}>
                <td>
                  <button className="Cross-button">
                    <img
                      src={crossImage}
                      alt="Remove item"
                      onClick={() => handleRemoveItem(item.productID)}
                    />
                  </button>
                </td>
                <td>
                  <img
                    src={`${import.meta.env.VITE_IMAGE_URL}/uploads/${
                      item.productImage
                    }`}
                    alt={item.productName}
                    className="Product-Image"
                  />
                </td>
                <td>{item.productName}</td>
                <td>{item.productSize}</td>
                <td className="Product-Price">
                  <span>&#8377;</span>
                  {item.productPrice}
                </td>
                <td className="Quantity-Container">
                  <button
                    className="Quantity-Button"
                    onClick={() => updateProductQuantity(item.productID, -1)}
                  >
                    -
                  </button>
                  <p>{item.productQuantity}</p>
                  <button
                    className="Quantity-Button"
                    onClick={() => updateProductQuantity(item.productID, 1)}
                  >
                    +
                  </button>
                </td>
                <td className="Product-Total">
                  <span>&#8377;</span>
                  {item.productPrice * item.productQuantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="Cart-Total">
        <h2>Cart Totals</h2>
        <div className="Cart-Total-Detail">
          <p>Subtotal</p>
          <p>
            <span>&#8377;</span>
            {calculateSubtotal()}
          </p>
        </div>
        <div className="Cart-Total-Shipping">
          <div className="Cart-Total-Shipping-Other">
            <p>Estimated shipping and handling</p>
            <p>
              <span>&#8377;</span>60
            </p>
          </div>
          <div className="Cart-Total-Shipping-Other">
            <p>Estimated Tax</p>
            <p>--</p>
          </div>
        </div>
        <div className="Cart-Total-Total">
          <p>All Total</p>
          <p>
            <span>&#8377;</span>
            {calculateSubtotal() + 60}
          </p>
        </div>
        <button
          className="Check-Out-Button"
          onClick={() => navigate("/cart/checkout")}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
