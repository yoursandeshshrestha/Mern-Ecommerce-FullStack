import React from "react";
import "./ProductItem.css";

function ProductItem(props) {
  return (
    <div className="ProductItem-Container">
      <img src={props.image} alt="productImage" />
      <div className="ProductItem-Info">
        <p className="ProductName">{props.name}</p>
        <p className="ProductCategory">{props.category}</p>
        <p className="ProductPrice">{props.new_price}$</p>
      </div>
    </div>
  );
}

export default ProductItem;
