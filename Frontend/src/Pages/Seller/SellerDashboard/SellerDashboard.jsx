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
import axios from "axios";
import "./SellerDashboard.css";
import cookie from "js-cookie";

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
        const genderCount = {};
        const orderStatusCount = {};

        orders.forEach((order) => {
          const month = new Date(order.paidAt).toLocaleString("default", {
            month: "long",
          });

          if (monthlySales[month]) {
            monthlySales[month] += order.productsQuantity;
          } else {
            monthlySales[month] = order.productsQuantity;
          }

          if (monthlyRevenue[month]) {
            monthlyRevenue[month] += order.totalPrice;
          } else {
            monthlyRevenue[month] = order.totalPrice;
          }
        });

        orders.forEach((order) => {
          order.orderedProducts.forEach((product) => {
            const status = product.orderStatus;
            if (orderStatusCount[status]) {
              orderStatusCount[status]++;
            } else {
              orderStatusCount[status] = 1;
            }
          });
        });

        products.product.forEach((product) => {
          const gender = product.gender;
          if (gender === "Men" || gender === "Women" || gender === "Unisex") {
            if (genderCount[gender]) {
              genderCount[gender]++;
            } else {
              genderCount[gender] = 1;
            }
          }
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

        setProductCategoryData({
          labels: Object.keys(genderCount),
          datasets: [
            {
              label: "Gender Categories",
              data: Object.values(genderCount),
              backgroundColor: [
                "rgb(200, 161, 224)",
                "rgba(54,162,235,0.6)",
                "#C65BCF",
              ],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching seller orders:", error);
      }
    };

    fetchSellerOrders();
  }, []);

  return (
    <div className="SellerDashboard-Container">
      <div className="SellerDashboard-Wrapper">
        <h2>Welcome, {currentUser?.username}!</h2>
      </div>

      <div className="SellerDashboard-Charts">
        <div className="SellerDashboard-SectionOne">
          <div className="chart-container">
            <h3>Monthly Sales</h3>
            {salesData && <Bar data={salesData} />}
          </div>

          <div className="chart-container">
            <h3>Monthly Revenue</h3>
            {revenueData && <Line data={revenueData} />}
          </div>
        </div>

        <div className="chart-container">
          <h3>Product Category Distribution</h3>
          {productCategoryData && <Pie data={productCategoryData} />}
        </div>

        <div className="chart-container">
          <h3>Order Status Breakdown</h3>
          {orderStatusData && <Doughnut data={orderStatusData} />}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
