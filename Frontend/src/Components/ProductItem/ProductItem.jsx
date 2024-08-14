import React from "react";
import "./ProductItem.css";
import { Link } from "react-router-dom";

function ProductItem(props) {
  const imageLink = `${import.meta.env.VITE_IMAGE_URL}/uploads/${props.image}`;

  return (
    <div className="ProductItem-Container">
      <div className="Image-Container">
        <img src={imageLink} alt="productImage" />
      </div>
      <Link to={`products/${props.id}`}>
        <div className="ProductItem-Info">
          <p className="ProductName">{props.name}</p>
          {/* <p className="ProductCategory">{props.category}</p> */}
          <p className="ProductPrice">
            <span>&#8377;</span>
            {props.new_price}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default ProductItem;
