import React from "react";
import "./ProductDetail.css";
import { Link } from "react-router-dom";
import TestImage from "../../assets/Ecommerce-design-idea/Images/HM.jpg";
import Star from "../../assets/FrontendAssets/star_icon.png";
import StarDull from "../../assets/FrontendAssets/star_dull_icon.png";
import love from "../../assets/FrontendAssets/love.png";

function ProductDetail() {
  const productName = "Wide joggers";
  const price = 300;
  const availability = "In Stock";
  const description =
    "Loose-fit joggers in sweatshirt fabric with an elasticated, drawstring waist, " +
    "discreet pockets in the side seams, and wide legs.";

  return (
    <div className="ProductDetail-Container">
      <div className="ProductDetail-Wrapper">
        <img src={TestImage} alt="Product Image" className="Main-Image" />
        <div className="ProductDetail-Side">
          <p>
            <Link to="/">Home</Link> | <Link to="/product">Product</Link> |
            <Link to="/women"> Women</Link> |
            <Link to="/product-name"> {productName}</Link>
          </p>
          <div className="ProductDetail-SectionOne">
            <h2>{productName}</h2>
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
          <p className="ProductDetail-Price">
            <span>&#8377;</span>
            {price}
          </p>
          <p className="ProductDetail-Availability">
            Availability | <span>{availability}</span>
          </p>
          <p>{description}</p>
          <div className="ProductDetail-Buttons">
            <button>Add To Cart</button>
            <button>
              <img src={love} />
              Add To Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
