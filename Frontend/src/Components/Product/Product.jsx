import React, { useState, useEffect } from "react";
import ProductItem from "../ProductItem/ProductItem";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./Product.css";

function Product() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products?page=${page}`
        );
        setData((prevData) => [...prevData, ...response.data]);
        setHasMore(response.data.length > 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="Product-Container">
      <div className="Product-Filter-Options">
        <button>All Products</button>
        <button>New Products</button>
        <p>{data.length} out of </p>
      </div>
      <div className="Product">
        {loading && page === 1 ? (
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
      {hasMore && (
        <div className="Button_Container">
          <Button
            onClick={loadMore}
            disabled={loading}
            className="Load-More-Button"
          >
            {loading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
}

export default Product;
