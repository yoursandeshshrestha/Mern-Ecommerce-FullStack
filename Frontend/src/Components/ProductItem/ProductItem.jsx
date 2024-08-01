import React from "react";
import "./ProductItem.css";
import { Link } from "react-router-dom";

function ProductItem(props) {
  const imageLink = `${import.meta.env.VITE_IMAGE_URL}/uploads/${props.image}`;

  return (
    <div className="ProductItem-Container">
      <img src={imageLink} alt="productImage" />
      <Link to={`/${props.id}`}>
        <div className="ProductItem-Info">
          <p className="ProductName">{props.name}</p>
          {/* <p className="ProductCategory">{props.category}</p> */}
          <p className="ProductPrice">{props.new_price}$</p>
        </div>
      </Link>
    </div>
  );
}

export default ProductItem;
