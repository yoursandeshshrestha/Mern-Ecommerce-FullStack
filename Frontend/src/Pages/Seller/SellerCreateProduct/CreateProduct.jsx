import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import CreatableSelect from "react-select/creatable";
import "./CreateProduct.css";
import productIcon from "../../../assets/SellerAsset/createproduct.png";
import tick from "../../../assets/SellerAsset/check-mark.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultCategories = [
  { value: "jacket", label: "Jacket" },
  { value: "shirt", label: "Shirt" },
  { value: "pants", label: "Pants" },
  { value: "shoes", label: "Shoes" },
];

function CreateProduct() {
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    productname: "",
    productdescription: "",
    price: "",
    oldprice: "",
    stock: "",
  });

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

  const handleCategoryChange = (newValue) => {
    setSelectedCategories(newValue);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = Cookies.get("token");

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.productname);
    formDataToSend.append("description", formData.productdescription);
    formDataToSend.append(
      "category",
      JSON.stringify(selectedCategories.map((cat) => cat.value))
    );
    formDataToSend.append("price", formData.price);
    formDataToSend.append("oldPrice", formData.oldprice);
    formDataToSend.append("stock", formData.stock);
    formDataToSend.append("image", imageFile);
    formDataToSend.append("size", JSON.stringify(selectedSizes));
    formDataToSend.append("gender", selectedGender);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/products`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Product created successfully!");
        // Reset the form
        setFormData({
          productname: "",
          productdescription: "",
          price: "",
          oldprice: "",
          stock: "",
        });
        setSelectedSizes([]);
        setSelectedGender(null);
        setSelectedCategories([]);
        setImagePreview(null);
        setImageFile(null);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="CreateProduct-Container">
      <div className="CreateProduct-TopSection">
        <div className="CreateProduct-heading">
          <img src={productIcon} alt="icon" />
          <h2>Add new product</h2>
        </div>
        <button onClick={handleSubmit}>
          <img src={tick} alt="icon" />
          Add Product
        </button>
      </div>
      <form onSubmit={handleSubmit} className="CreateProduct-Main-Wrapper">
        <div className="CreateProduct-General">
          <p>General Information</p>
          <div className="General-first-input">
            <label htmlFor="productname">Product Name</label>
            <input
              type="text"
              name="productname"
              value={formData.productname}
              onChange={handleInputChange}
            />
          </div>
          <div className="General-second-input">
            <label htmlFor="productdescription">Product Description</label>
            <textarea
              name="productdescription"
              value={formData.productdescription}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="size-gender-wrapper">
            <div className="size-section">
              <label htmlFor="size">Size</label>
              <div className="size-section-buttons">
                {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    type="button"
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
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>
              <div className="price-second-input">
                <label htmlFor="oldprice">Actual Price</label>
                <input
                  type="number"
                  name="oldprice"
                  value={formData.oldprice}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="RightSection">
          <div className="Stock-section">
            <p>Stock</p>
            <div className="Stock-first-input">
              <label htmlFor="stock">Available Stocks</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="Category-section">
            <p>Category</p>
            <label htmlFor="category">Product Category</label>
            <CreatableSelect
              isMulti
              name="categories"
              options={defaultCategories}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleCategoryChange}
              value={selectedCategories}
              placeholder="Select or create categories..."
            />
          </div>
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
      </form>
      <ToastContainer />
    </div>
  );
}

export default CreateProduct;
