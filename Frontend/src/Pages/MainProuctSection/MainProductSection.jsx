import React, { useEffect, useState } from "react";
import "./MainProductSection.css";
import backgroundImage from "../../assets/Ecommerce-design-idea/Images/woman-man.png";
import { Range } from "react-range";
import ProductItem from "../../Components/ProductItem/ProductItem";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

function MainProductSection() {
  const [showWomenSubcategories, setShowWomenSubcategories] = useState(false);
  const [showMenSubcategories, setShowMenSubcategories] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [selectedGender, setSelectedGender] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");
  const [showDiscounted, setShowDiscounted] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);

  const navigate = useNavigate();

  const fetchAll = () => {
    setSelectedSizes([]);
    setPriceRange([0, 10000]);
    setSelectedGender("");
    setSortBy("");
    setOrder("");
    setShowDiscounted(false);
    setShowWomenSubcategories(false);
    setShowMenSubcategories(false);
    setPage(1);
  };

  const toggleWomenSubcategories = () => {
    setShowWomenSubcategories(!showWomenSubcategories);
    setShowMenSubcategories(false);
    setSelectedGender("Women");
    setShowDiscounted(false);
    setPage(1);
  };

  const toggleMenSubcategories = () => {
    setShowWomenSubcategories(false);
    setShowMenSubcategories(!showMenSubcategories);
    setSelectedGender("Men");
    setShowDiscounted(false);
    setPage(1);
  };

  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

  const toggleSizeSelection = (size) => {
    setSelectedSizes((prevSelectedSizes) =>
      prevSelectedSizes.includes(size)
        ? prevSelectedSizes.filter((s) => s !== size)
        : [...prevSelectedSizes, size]
    );
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    if (value === "newest") {
      setSortBy("createdAt");
      setOrder("desc");
      setPage(1);
    } else if (value === "oldest") {
      setSortBy("createdAt");
      setOrder("asc");
      setPage(1);
    } else if (value === "priceAsc") {
      setSortBy("price");
      setOrder("asc");
      setPage(1);
    } else if (value === "priceDesc") {
      setSortBy("price");
      setOrder("desc");
      setPage(1);
    }
  };

  const fetchDiscountedProducts = () => {
    setShowDiscounted(true);
    setSelectedGender("");
    setPage(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products?${new URLSearchParams({
            ...(selectedGender && { gender: selectedGender }),
            ...(sortBy && { sortBy }),
            ...(order && { order }),
            ...(selectedSizes.length > 0 && { size: selectedSizes.join(",") }),
            ...(priceRange[0] && { minPrice: priceRange[0] }),
            ...(priceRange[1] && { maxPrice: priceRange[1] }),
            ...(showDiscounted && { discounted: showDiscounted }),
            page,
            limit,
          }).toString()}`
        );

        setData(response.data.products);
        setTotalProducts(response.data.totalProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const params = new URLSearchParams({
      ...(selectedGender && { gender: selectedGender }),
      ...(sortBy && { sortBy }),
      ...(order && { order }),
      ...(selectedSizes.length > 0 && { size: selectedSizes.join(",") }),
      ...(priceRange[0] !== undefined && { minPrice: priceRange[0] }),
      ...(priceRange[1] !== undefined && { maxPrice: priceRange[1] }),
      ...(showDiscounted && { discounted: showDiscounted }),
      page,
      limit,
    });

    navigate(`?${params.toString()}`, { replace: true });
  }, [
    selectedGender,
    sortBy,
    order,
    selectedSizes,
    priceRange,
    showDiscounted,
    navigate,
    page,
    limit,
  ]);

  const handleNextPage = () => {
    if (page * limit < totalProducts) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="MainProductSection-Container">
      <div className="MainProductSection-Image">
        <img src={backgroundImage} alt="" />
        <h2>Shop Section</h2>
      </div>
      <div className="MainProductSection-Products">
        <div className="MainProductSection-Sidebar">
          <div className="MainProductSection-Wrapper">
            <div className="Sidebar-Section-One">
              <h2>Categories</h2>
              <p onClick={fetchAll} style={{ cursor: "pointer" }}>
                All
              </p>
              <p
                onClick={toggleWomenSubcategories}
                style={{ cursor: "pointer" }}
              >
                Women
              </p>
              {showWomenSubcategories && (
                <div className="Subcategories">
                  <p>Jeans</p>
                  <p>Top</p>
                </div>
              )}
              <p onClick={toggleMenSubcategories} style={{ cursor: "pointer" }}>
                Men
              </p>
              {showMenSubcategories && (
                <div className="Subcategories">
                  <p>Jeans</p>
                  <p>Top</p>
                </div>
              )}
              <p
                onClick={fetchDiscountedProducts}
                style={{ cursor: "pointer" }}
              >
                Discounted Products
              </p>
            </div>
            <div className="Sidebar-Section-Two">
              <h2>Filter by Price</h2>
              <div className="RangeSlider-Container">
                <Range
                  step={1}
                  min={0}
                  max={10000}
                  values={priceRange}
                  onChange={(values) => setPriceRange(values)}
                  renderTrack={({ props, children }) => (
                    <div {...props} className="RangeSlider-Track">
                      {children}
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    <div {...props} className="RangeSlider-Thumb" />
                  )}
                />
              </div>
              <div className="PriceRange-Values">
                <p>
                  Min: <span>&#x20B9;</span>
                  {priceRange[0]}
                </p>
                <p>
                  Max: <span>&#x20B9;</span>
                  {priceRange[1]}
                </p>
              </div>
              <button onClick={() => setPriceRange([0, 10000])}>
                Reset Price Filter
              </button>
            </div>
            <div className="Sidebar-Section-Three">
              <h2>Size</h2>
              <div className="SizeSelection-Buttons">
                {sizeOptions.map((size) => (
                  <button
                    key={size}
                    className={`SizeButton ${
                      selectedSizes.includes(size) ? "selected" : ""
                    }`}
                    onClick={() => toggleSizeSelection(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="MainProductSection-Body">
          <div className="MainProductSection-Body-Navbar">
            <p>
              We found <span>{totalProducts} products</span> for you
            </p>
            <select onChange={handleSortChange}>
              <option value="" disabled>
                Sort by
              </option>
              <option value="newest">Newest Arrivals</option>
              <option value="oldest">Oldest Arrivals</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
            </select>
          </div>
          <div className="MainProductSection-Body-Product-Section">
            {loading && data.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                  width: "100%",
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
              <p className="NO-PRODUCT-FOUND-SHOP">No products available.</p>
            )}
          </div>
          {totalProducts > 0 && (
            <div className="MainProductSection-Pagination">
              <p>
                Page {page} of {Math.ceil(totalProducts / limit)}
              </p>
              <div className="PaginationButtons">
                <button disabled={page === 1} onClick={handlePreviousPage}>
                  Previous
                </button>
                <button
                  disabled={page * limit >= totalProducts}
                  onClick={handleNextPage}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainProductSection;
