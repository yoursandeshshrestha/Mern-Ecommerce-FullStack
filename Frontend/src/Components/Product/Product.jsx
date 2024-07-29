import React, { useState, useEffect } from "react";
import testData from "../../assets/FrontendAssets/all_product";
import ProductItem from "../ProductItem/ProductItem";
import "./Product.css";

const PRODUCTS_PER_PAGE = 15;

function Product() {
  const [data, setData] = useState(testData);
  const [currentPage, setCurrentPage] = useState(1);

  const filterData = () => {
    let filteredData = testData;
    setData(filteredData);
    setCurrentPage(1);
  };

  useEffect(() => {
    filterData();
  }, []);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedData = data.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  const totalPages = Math.ceil(data.length / PRODUCTS_PER_PAGE);

  return (
    <div className="Product-Container">
      <div className="Product-Filter-Options">
        <button>Best Sellers</button>
        <button>New Products</button>
        {/* <div className="total-item">
          <p>{data.length} Items</p>
        </div> */}
      </div>
      <div className="Product">
        {paginatedData.map((item, index) => (
          <ProductItem
            key={index}
            id={item.id}
            name={item.name}
            category={item.category}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
      <div className="Pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? "active" : ""}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Product;
