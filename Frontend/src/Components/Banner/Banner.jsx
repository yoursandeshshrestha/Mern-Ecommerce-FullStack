import React from "react";
import "./Banner.css";

function Banner(props) {
  return (
    <div className="Banner-Container">
      <div className="Banner-Wrapper">
        <img src={props.image1} alt="image" />
        <img src={props.image2} alt="image" />
        {props.bannerInfo}
      </div>
    </div>
  );
}

export default Banner;
