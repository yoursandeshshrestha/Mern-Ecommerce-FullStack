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
  const [totalProduct, setTotalProduct] = useState(null);
  const [isDiscounted, setIsDiscounted] = useState(false);
  const [activeButton, setActiveButton] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const queryParams = `?page=${page}&limit=10${
          isDiscounted ? "&discounted=true" : ""
        }`;
        const [productsResponse, totalResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/products${queryParams}`),
          axios.get(`${import.meta.env.VITE_API_URL}/products`),
        ]);

        console.log(productsResponse);

        if (page === 1) {
          setData(productsResponse.data.products);
        } else {
          setData((prevData) => [
            ...prevData,
            ...productsResponse.data.products,
          ]);
        }

        setTotalProduct(totalResponse.data.totalProducts);
        setHasMore(productsResponse.data.totalProducts > 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      setLoading(false);
    };
  }, [page, isDiscounted]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const fetchDiscountedProducts = () => {
    setPage(1);
    setData([]);
    setIsDiscounted(true);
    setActiveButton("discounted");
  };

  const fetchAllProducts = () => {
    setPage(1);
    setData([]);
    setIsDiscounted(false);
    setActiveButton("all");
  };

  return (
    <div className="Product-Container">
      <div className="Product-Filter-Options">
        <div className="Product-Options">
          <Button
            onClick={fetchAllProducts}
            className={activeButton === "all" ? "active" : ""}
          >
            All Products
          </Button>
          <Button
            onClick={fetchDiscountedProducts}
            className={activeButton === "discounted" ? "active" : ""}
          >
            Discounted Products
          </Button>
        </div>
        <p>
          {data.length} out of {totalProduct} Products
        </p>
      </div>
      <div className="Product">
        {loading && data.length === 0 ? (
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
      {hasMore && !loading && (
        <div className="Button_Container">
          <Button
            onClick={loadMore}
            disabled={loading}
            className="Load-More-Button"
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}

export default Product;
