import React, { useState, useEffect } from "react";
import testData from "../assets/FrontendAssets/all_product";
import ProductItem from "./ProductItem";
import "./Product.css";

const PRODUCTS_PER_PAGE = 10;

function Product() {
  const [data, setData] = useState(testData);
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const filterData = () => {
    let filteredData = testData;
    if (category) {
      filteredData = filteredData.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase()
      );
    }
    if (size) {
      filteredData = filteredData.filter(
        (item) => item.size && item.size.toLowerCase() === size.toLowerCase()
      );
    }
    if (color) {
      filteredData = filteredData.filter(
        (item) => item.color && item.color.toLowerCase() === color.toLowerCase()
      );
    }
    setData(filteredData);
    setCurrentPage(1); // Reset to first page on filter change
  };

  useEffect(() => {
    filterData();
  }, [category, size, color]);

  // Calculate paginated data
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedData = data.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  const totalPages = Math.ceil(data.length / PRODUCTS_PER_PAGE);

  return (
    <div className="Product-Container">
      <div className="Product-Wrapper">
        <div className="Product-Filter-Options">
          <select name="category" id="category" onChange={handleCategoryChange}>
            <option value="">ALL</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kid">Kids</option>
          </select>
          <select name="size" id="size" onChange={handleSizeChange}>
            <option value="">ALL</option>
            <option value="s">S</option>
            <option value="m">M</option>
            <option value="l">L</option>
          </select>
          <select name="color" id="color" onChange={handleColorChange}>
            <option value="">ALL</option>
            <option value="black">Black</option>
            <option value="white">White</option>
          </select>
        </div>
        <div className="total-item">
          <p>{data.length} Items</p>
        </div>
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
