import React, { useState, useEffect, useRef } from "react";
import ProductItem from "../ProductItem/ProductItem";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./ProductBox.css";
import arrowIcon from "../../assets/Ecommerce-design-idea/Images/right-arrow.png";

function ProductBox() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/search?query=top&limit=5`
        );
        setData((prevData) => [...prevData, ...response.data]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="Product-Container-Box">
      <div className="Product-Box">
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : data.length > 0 ? (
          <>
            {data.map((item) => (
              <ProductItem
                key={item._id}
                id={item._id}
                name={item.name}
                category={item.category}
                image={item.image}
                new_price={item.price}
                old_price={item.oldPrice}
                createdAt={item.createdAt}
              />
            ))}
          </>
        ) : (
          <p className="NO-PRODUCT-FOUND">No products available.</p>
        )}
      </div>
    </div>
  );
}

export default ProductBox;
