import React, { useState, useEffect } from "react";
import ProductItem from "../ProductItem/ProductItem";
import axios from "axios";
import "./Product.css";

function Product() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="Product-Container">
      <div className="Product-Filter-Options">
        <button>Best Sellers</button>
        <button>New Products</button>
      </div>
      <div className="Product">
        {data.length > 0 ? (
          data.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              name={item.name}
              category={item.category}
              image={item.image}
              new_price={item.price}
              old_price={item.oldPrice}
            />
          ))
        ) : (
          <p>No products available.</p> // Handle empty data scenario
        )}
      </div>
    </div>
  );
}

export default Product;
