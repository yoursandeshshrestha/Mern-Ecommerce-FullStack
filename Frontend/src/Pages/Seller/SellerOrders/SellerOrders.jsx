import React, { useState, useEffect } from "react";
import "./SellerOrders.css";
import axios from "axios";
import cookie from "js-cookie";
import { Link } from "react-router-dom";

function SellerOrders() {
  const token = cookie.get("token");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/order/seller-orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    };

    fetchOrders();
  }, [token]);

  const handleStatusChange = async (orderId, productId, newStatus) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/order/update-status`,
        { orderId, productId, newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                orderedProducts: order.orderedProducts.map((product) =>
                  product._id === productId
                    ? { ...product, orderStatus: newStatus }
                    : product
                ),
              }
            : order
        )
      );
    } catch (error) {
      console.error("Failed to update order status", error);
    }
  };

  return (
    <div className="SellerOrders-Container">
      <h3>Manage your orders</h3>
      <table className="OrdersTable">
        <thead>
          <tr>
            <th>Product</th>
            <th>Date</th>
            <th>Address</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Total Price</th>
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
                      <Link
                        to={`/products/${product.productID}`}
                        className="ProductName"
                      >
                        <strong>{product.productName}</strong>
                      </Link>
                      <span className="OrderID">Order ID: #{order._id}</span>
                    </div>
                  </td>
                  <td>
                    {new Date(order.createdAt).toLocaleDateString("ist", {
                      day: "numeric",
                      year: "numeric",
                      month: "short",
                    })}
                  </td>
                  <td>
                    {order.shippingData.city}, {order.shippingData.state}
                  </td>
                  <td>
                    <span
                      className={`PaymentStatus ${order.paymentInfo.status}`}
                    >
                      {order.paymentInfo.status}
                    </span>
                  </td>
                  <td>
                    <select
                      value={product.orderStatus}
                      className={`OrderStatus ${product.orderStatus} select-button`}
                      onChange={(e) =>
                        handleStatusChange(
                          order._id,
                          product._id,
                          e.target.value
                        )
                      }
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipping">Shipping</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <span>&#8377;</span>
                    {product.price.toFixed(2)}
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

export default SellerOrders;
