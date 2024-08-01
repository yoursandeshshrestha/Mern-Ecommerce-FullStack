import React, { useEffect, useState } from "react";
import "./ProductDetail.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Star from "../../assets/FrontendAssets/star_icon.png";
import StarDull from "../../assets/FrontendAssets/star_dull_icon.png";
import love from "../../assets/FrontendAssets/love.png";

function ProductDetail() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/${id}`
        );
        console.log(response);
        setData(response.data);
      } catch (error) {
        setError(error.message);
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="ProductDetail-Container">Error: {error}</div>;
  }

  if (!data) {
    return <div className="ProductDetail-Container">Product not found</div>;
  }

  const imgLink = `${import.meta.env.VITE_IMAGE_URL}/uploads/${data.image}`;

  return (
    <div className="ProductDetail-Container">
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
                <li key="star-dull">
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
            <p className="ProductDetail-Old">
              <span>&#8377;</span>
              {data.oldPrice}
            </p>
          </div>
          <div className="ProductDetail-Info">
            <p className="ProductDetail-Availability">
              Availability |{" "}
              <span>{data.stock > 0 ? "In Stock" : "Out of Stock"}</span>
            </p>
            <p className="ProductDetail-Size">
              Size | <span>{data.size}</span>
            </p>
          </div>
          <p>{data.description}</p>
          <div className="ProductDetail-Buttons">
            <button>Add To Cart</button>
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
