import React from "react";
import "./ProductItem.css";
import { Link } from "react-router-dom";

function ProductItem(props) {
  const imageLink = `${import.meta.env.VITE_IMAGE_URL}/uploads/${props.image}`;

  const createdDate = new Date(props.createdAt);
  const currentDate = new Date();
  const timeDifference = currentDate - createdDate;
  const differenceInDays = timeDifference / (1000 * 3600 * 24);
  const isNew = differenceInDays <= 1;

  return (
    <div className="ProductItem-Container">
      <div className="Image-Container">
        <img src={imageLink} alt="productImage" />
        {isNew && <p className="NewTag">New</p>}
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
