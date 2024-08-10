import React, { useState, useEffect } from "react";
import "./CustomerOrder.css";
import axios from "axios";
import cookie from "js-cookie";

function CustomerOrder() {
  const token = cookie.get("token");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/order`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setOrders(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <div className="CustomerOrder-Container">
      <h3>Your Orders</h3>
      <table className="OrdersTable">
        <thead>
          <tr>
            <th>Product</th>
            <th>Date</th>
            <th>Shopname</th>
            <th>Payment</th>
            <th>Total Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="6">No orders found.</td>
            </tr>
          ) : (
            orders.flatMap((order) =>
              order.orderedProducts.map((product, index) => (
                <tr key={`${order._id}-${index}`}>
                  <td>
                    <div className="ProductDetails">
                      <strong>{product.productName}</strong>
                      <span className="OrderID">Order ID: #{order._id}</span>
                    </div>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>{product.shopName}</td>
                  <td>
                    <span
                      className={`PaymentStatus ${order.paymentInfo.status}`}
                    >
                      {order.paymentInfo.status}
                    </span>
                  </td>
                  <td>
                    <span>&#8377;</span>
                    {product.price.toFixed(2)}
                  </td>
                  <td>
                    <span className={`OrderStatus ${product.orderStatus}`}>
                      {product.orderStatus}
                    </span>
                  </td>
                </tr>
              ))
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerOrder;
