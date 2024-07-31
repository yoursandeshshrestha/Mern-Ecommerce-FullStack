import React from "react";
import "./ProductDetail.css";
import { Link, useParams } from "react-router-dom";
import Star from "../../assets/FrontendAssets/star_icon.png";
import StarDull from "../../assets/FrontendAssets/star_dull_icon.png";
import love from "../../assets/FrontendAssets/love.png";
import all_product from "../../assets/FrontendAssets/all_product";

function ProductDetail() {
  const { id } = useParams();
  const product = all_product.find((item) => item.id === parseInt(id));

  if (!product) {
    return <div className="ProductDetail-Container">Product not found</div>;
  }

  return (
    <div className="ProductDetail-Container">
      <div className="ProductDetail-Wrapper">
        <img src={product.image} alt="Product Image" className="Main-Image" />
        <div className="ProductDetail-Side">
          <p>
            <Link to="/">Home</Link> | <Link to="/product">Product</Link> |
            <Link to="/women"> {product.category}</Link> |
            <Link to="/product-name"> {product.name}</Link>
          </p>
          <div className="ProductDetail-SectionOne">
            <h2>{product.name}</h2>
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
              {product.new_price}
            </p>
            <p className="ProductDetail-Old">
              <span>&#8377;</span>
              {product.old_price}
            </p>
          </div>
          <div className="ProductDetail-Info">
            <p className="ProductDetail-Availability">
              Availability |{" "}
              <span>{product.stock > 0 ? "In Stock" : "Out of Stock"}</span>
            </p>
            <p className="ProductDetail-Availability">
              Size | <span>{product.size}</span>
            </p>
          </div>
          <p>{product.description}</p>
          <div className="ProductDetail-Buttons">
            <button>Add To Cart</button>
            <button>
              <img src={love} alt="Love" />
              Add To Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
