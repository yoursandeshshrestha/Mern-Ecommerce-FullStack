import React, { useEffect, useState, useContext } from "react";
import "./SellerAllProducts.css";
import axios from "axios";
// Icon
import Product from "../../../assets/SellerAsset/product.png";
// Context
import { userContext } from "../../../Context/userContext";

function SellerAllProducts() {
  const [data, setData] = useState([]);
  const { currentUser } = useContext(userContext);

  useEffect(() => {
    if (currentUser) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/products/seller/${currentUser._id}`
          );
          setData(response.data.product);
        } catch (error) {
          console.error("Error fetching data", error.message);
        }
      };
      fetchData();
    }
  }, [currentUser]);

  return (
    <div className="SellerAllProduct-Container">
      {/* Navbar */}
      <div className="SellerAllProduct-Nav">
        <div className="SellerAllProduct-heading">
          <img src={Product} alt="Product Icon" />
          <h2>All Products</h2>
        </div>
      </div>

      {/* Main Content */}
      <div className="SellerAllProduct-Product-Container">
        {data.length > 0 ? (
          data.map((product) => (
            <div key={product._id} className="SellerAllProduct-Product">
              <img
                src={`${import.meta.env.VITE_IMAGE_URL}/uploads/${
                  product.image
                }`}
                alt="Product"
              />
              <div className="SellerAllProduct-ProductInfo">
                <p>{product.name}</p>
                <p>{product.price}</p>
              </div>
            </div>
          ))
        ) : (
          <div>You have no products</div>
        )}
      </div>
    </div>
  );
}

export default SellerAllProducts;
