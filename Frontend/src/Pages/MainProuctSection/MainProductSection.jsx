import React, { useEffect, useState } from "react";
import "./MainProductSection.css";
import backgroundImage from "../../assets/Ecommerce-design-idea/Images/woman-man.png";
import { Range } from "react-range";
import ProductItem from "../../Components/ProductItem/ProductItem";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function MainProductSection() {
  const [showWomenSubcategories, setShowWomenSubcategories] = useState(false);
  const [showMenSubcategories, setShowMenSubcategories] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState([10, 100]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedGender, setSelectedGender] = useState("");

  const toggleWomenSubcategories = () => {
    setShowWomenSubcategories(!showWomenSubcategories);
    setShowMenSubcategories(false);
    setSelectedGender("Women");
  };

  const toggleMenSubcategories = () => {
    setShowWomenSubcategories(false);
    setShowMenSubcategories(!showMenSubcategories);
    setSelectedGender("Men");
  };

  const sizeOptions = ["XS", "S", "M", "L", "XL"];

  const toggleSizeSelection = (size) => {
    setSelectedSizes((prevSelectedSizes) =>
      prevSelectedSizes.includes(size)
        ? prevSelectedSizes.filter((s) => s !== size)
        : [...prevSelectedSizes, size]
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products?gender=${selectedGender}`
        );
        console.log(response.data);

        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedGender]);

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
              <p>New Arrivals</p>
              <p>Discounted Products</p>
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
              <button>Filter</button>
            </div>
            <div className="Sidebar-Section-Three">
              <h2>Size</h2>
              <div className="SizeSelection-Buttons">
                {sizeOptions.map((index, size) => (
                  <button
                    key={index}
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
              We found <span>{data.length} products</span> for you
            </p>
            <select name="" id="">
              <option value="" disabled>
                Sort By
              </option>
              <option value="">Newest</option>
              <option value="">Oldest</option>
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
        </div>
      </div>
    </div>
  );
}

export default MainProductSection;
