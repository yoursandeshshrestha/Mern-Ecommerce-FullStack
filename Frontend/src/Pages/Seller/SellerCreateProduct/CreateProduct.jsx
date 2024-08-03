import React, { useState } from "react";
import "./CreateProduct.css";
import productIcon from "../../../assets/SellerAsset/createproduct.png";
import tick from "../../../assets/SellerAsset/check-mark.png";

function CreateProduct() {
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedGender, setSelectedGender] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleSizeClick = (size) => {
    setSelectedSizes((prevSelectedSizes) =>
      prevSelectedSizes.includes(size)
        ? prevSelectedSizes.filter((s) => s !== size)
        : [...prevSelectedSizes, size]
    );
  };

  const handleGenderClick = (gender) => {
    setSelectedGender(gender);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="CreateProduct-Container">
      <div className="CreateProduct-TopSection">
        <div className="CreateProduct-heading">
          <img src={productIcon} alt="icon" />
          <h2>Add new product</h2>
        </div>
        <button>
          <img src={tick} alt="icon" />
          Add Product
        </button>
      </div>
      <div className="CreateProduct-Main-Wrapper">
        <div className="CreateProduct-General">
          <p>General Information</p>
          <div className="General-first-input">
            <label htmlFor="productname">Product Name</label>
            <input type="text" name="productname" />
          </div>
          <div className="General-second-input">
            <label htmlFor="">Product Description</label>
            <textarea name="Product Description" id=""></textarea>
          </div>
          <div className="size-gender-wrapper">
            <div className="size-section">
              <label htmlFor="size">Size</label>
              <div className="size-section-buttons">
                {["XS", "S", "M", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeClick(size)}
                    className={selectedSizes.includes(size) ? "selected" : ""}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="gender-section">
              <label htmlFor="gender">Gender</label>
              <div className="gender-section-buttons">
                {["Men", "Women", "Unisex"].map((gender) => (
                  <label
                    key={gender}
                    onClick={() => handleGenderClick(gender)}
                    className={selectedGender === gender ? "selected" : ""}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={gender.toLowerCase()}
                    />
                    {gender}
                  </label>
                ))}
              </div>
            </div>
          </div>
          {/* Price Section */}
          <div className="Price-Section">
            <p>Price</p>
            <div className="price-section-wrapper">
              <div className="price-first-input">
                <label htmlFor="price">Selling Price</label>
                <input type="number" name="price" />
              </div>
              <div className="price-second-input">
                <label htmlFor="oldprice">Actual Price</label>
                <input type="number" name="oldprice" />
              </div>
            </div>
          </div>
        </div>
        <div className="RightSection">
          <div className="Image-Container">
            <p>Upload Image</p>
            <div className="Image-input">
              <input type="file" name="image" onChange={handleImageChange} />
            </div>
            {imagePreview && (
              <div className="Image-Preview">
                <img src={imagePreview} alt="Uploaded Preview" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
