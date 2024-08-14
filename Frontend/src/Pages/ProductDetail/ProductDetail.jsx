import React, { useEffect, useState, useContext } from "react";
import "./ProductDetail.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Star from "../../assets/FrontendAssets/star_icon.png";
import StarDull from "../../assets/FrontendAssets/star_dull_icon.png";
import love from "../../assets/FrontendAssets/love.png";
import { userContext } from "../../Context/userContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductDetail() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null); // State to handle the selected size
  const { id } = useParams();
  const { currentUser } = useContext(userContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/${id}`
        );
        setData(response.data);
      } catch (error) {
        setError("Error fetching product details.");
        toast.error("Error fetching product details.");
      }
    };

    fetchData();
  }, [id]);

  const addToCart = async () => {
    if (!selectedSize) {
      toast.error("Please select a size before adding to the cart.");
      return;
    }

    if (!currentUser || currentUser.accountType !== "Customer") {
      toast.error(
        "You need to be logged in as a customer to add items to your cart."
      );
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/cart/add`,
        {
          userId: currentUser._id,
          productID: id,
          productQuantity: 1,
          productName: data.name,
          productPrice: data.price,
          productImage: data.image,
          productSize: selectedSize, // Include the selected size in the request
        }
      );
      toast.success("Item added to cart!");
      console.log("Item added to cart:", response.data);
    } catch (error) {
      console.error(
        "Error adding to cart:",
        error.response?.data?.message || error.message
      );
      toast.error("Error adding item to cart. Please try again.");
    }
  };

  if (error) {
    return <div className="ProductDetail-Container">Error: {error}</div>;
  }

  if (!data) {
    return <div className="ProductDetail-Container">Loading...</div>;
  }

  const imgLink = `${import.meta.env.VITE_IMAGE_URL}/uploads/${data.image}`;

  return (
    <div className="ProductDetail-Container">
      <ToastContainer />
      <div className="ProductDetail-Wrapper">
        <img src={imgLink} alt={`${data.name} Image`} className="Main-Image" />
        <div className="ProductDetail-Side">
          <p>
            <Link to="/">Home</Link> | <Link to="/product">Product</Link> |
            <Link to={`/women/${data.category}`}> {data.category}</Link> |
            <Link to={`/product/${data.name}`}> {data.name}</Link>
          </p>
          <div className="ProductDetail-SectionOne">
            <h2>{data.name}</h2>
            <div className="Rating-Section">
              <ul>
                {[...Array(4)].map((_, index) => (
                  <li key={index}>
                    <img src={Star} alt="Star" />
                  </li>
                ))}
                <li>
                  <img src={StarDull} alt="Star Dull" />
                </li>
              </ul>
              <p>3 Reviews</p>
            </div>
          </div>
          <div className="ProductDetail-Price">
            <p className="ProductDetail-New">
              <span>&#8377;</span>
              {data.price}
            </p>
            {data.oldPrice && (
              <p className="ProductDetail-Old">
                <span>&#8377;</span>
                {data.oldPrice}
              </p>
            )}
          </div>
          <div className="ProductDetail-Info">
            <p className="ProductDetail-Availability">
              Availability |{" "}
              <span>{data.stock > 0 ? "In Stock" : "Out of Stock"}</span>
            </p>
            <div className="ProductDetail-Size">
              {data.size.map((element, index) => (
                <p
                  key={index}
                  className={`ProductDetail-Size-Element ${
                    selectedSize === element ? "selected" : ""
                  }`}
                  onClick={() => setSelectedSize(element)}
                >
                  {element}
                </p>
              ))}
            </div>
          </div>
          <p className="ProductDetail-Description">{data.description}</p>
          <div className="ProductDetail-Buttons">
            <button onClick={addToCart}>Add To Cart</button>
            <button>
              <img src={love} alt="Add To Wishlist" />
              Add To Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
