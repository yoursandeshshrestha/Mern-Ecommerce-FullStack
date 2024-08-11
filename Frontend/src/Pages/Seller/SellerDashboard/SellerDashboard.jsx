import React, { useContext, useEffect, useState } from "react";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { userContext } from "../../../Context/userContext";
import axios from "axios"; // For making API requests
import "./SellerDashboard.css";
import cookie from "js-cookie";

// Registering ChartJS components
ChartJS.register(
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const SellerDashboard = () => {
  const { currentUser } = useContext(userContext);
  const token = cookie.get("token");

  const [salesData, setSalesData] = useState(null);
  const [revenueData, setRevenueData] = useState(null);
  const [productCategoryData, setProductCategoryData] = useState(null);
  const [orderStatusData, setOrderStatusData] = useState(null);

  useEffect(() => {
    const fetchSellerOrders = async () => {
      try {
        const [orderResponse, productResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/order/seller-orders`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get(
            `${import.meta.env.VITE_API_URL}/products/seller/${
              currentUser._id
            }`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),
        ]);

        const orders = orderResponse.data;
        const products = productResponse.data;

        const monthlySales = {};
        const monthlyRevenue = {};
        const categoryCount = {};
        const orderStatusCount = {};

        // Process Orders
        orders.forEach((order) => {
          const month = new Date(order.paidAt).toLocaleString("default", {
            month: "long",
          });

          // Sales count
          if (monthlySales[month]) {
            monthlySales[month] += order.productsQuantity;
          } else {
            monthlySales[month] = order.productsQuantity;
          }

          // Revenue calculation
          if (monthlyRevenue[month]) {
            monthlyRevenue[month] += order.totalPrice;
          } else {
            monthlyRevenue[month] = order.totalPrice;
          }
        });

        orders.forEach((order) => {
          order.orderedProducts.forEach((product) => {
            // Process order status data
            const status = product.orderStatus;
            if (orderStatusCount[status]) {
              orderStatusCount[status]++;
            } else {
              orderStatusCount[status] = 1;
            }

            // Process product category data
            product.category.forEach((cat) => {
              if (cat === "Men" || cat === "Women") {
                if (categoryCount[cat]) {
                  categoryCount[cat]++;
                } else {
                  categoryCount[cat] = 1;
                }
              }
            });
          });
        });

        setSalesData({
          labels: Object.keys(monthlySales),
          datasets: [
            {
              label: "Monthly Sales",
              data: Object.values(monthlySales),
              backgroundColor: "rgba(75,192,192,0.4)",
            },
          ],
        });

        setRevenueData({
          labels: Object.keys(monthlyRevenue),
          datasets: [
            {
              label: "Monthly Revenue",
              data: Object.values(monthlyRevenue),
              backgroundColor: "rgba(255,99,132,0.6)",
            },
          ],
        });

        // Set the processed order status data for the chart
        setOrderStatusData({
          labels: Object.keys(orderStatusCount),
          datasets: [
            {
              label: "Order Status",
              data: Object.values(orderStatusCount),
              backgroundColor: ["#f9dfbe", "#cce0fa", "#c8ffe5", "#fdbcbc"],
            },
          ],
        });

        // Set the processed product category data for the chart, filtering to only include "Men" and "Women"
        setProductCategoryData({
          labels: Object.keys(categoryCount),
          datasets: [
            {
              label: "Product Categories",
              data: Object.values(categoryCount),
              backgroundColor: [
                "rgba(255,99,132,0.6)",
                "rgba(54,162,235,0.6)",
                // Add more colors if needed
              ],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching seller orders:", error);
      }
    };

    fetchSellerOrders();
  }, [currentUser, token]);

  return (
    <div className="SellerDashboard-Container">
      <div className="SellerDashboard-Wrapper">
        <h2>Welcome, {currentUser?.username}!</h2>
      </div>

      {/* Add Charts */}
      <div className="SellerDashboard-Charts">
        <div className="SellerDashboard-SectionOne">
          {/* Bar Chart for Sales */}
          <div className="chart-container">
            <h3>Monthly Sales</h3>
            {salesData && <Bar data={salesData} />}
          </div>

          {/* Line Chart for Revenue */}
          <div className="chart-container">
            <h3>Monthly Revenue</h3>
            {revenueData && <Line data={revenueData} />}
          </div>
        </div>

        {/* Pie Chart for Product Categories */}
        <div className="chart-container">
          <h3>Product Category Distribution</h3>
          {productCategoryData && <Pie data={productCategoryData} />}
        </div>

        {/* Doughnut Chart for Order Status */}
        <div className="chart-container">
          <h3>Order Status Breakdown</h3>
          {orderStatusData && <Doughnut data={orderStatusData} />}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
