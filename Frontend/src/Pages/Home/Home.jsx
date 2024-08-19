import React, { useState, useEffect } from "react";
import "./Home.css";
import Product from "../../Components/Product/Product";
import Banner from "../../Components/Banner/Banner";

// Banner Image
import topImage from "../../assets/Ecommerce-design-idea/banner.png";
import topImage2 from "../../assets/Ecommerce-design-idea/banner2.png";
import ProductBox from "../../Components/Product/ProductBox";

import { Link, NavLink } from "react-router-dom";

// Background images
import bgImage1 from "../../assets/Ecommerce-design-idea/S2.png";
import bgImage2 from "../../assets/Ecommerce-design-idea/Images/S1.jpg";

const bannerInfo = (
  <div className="Banner-Info">
    <h2>
      Tops & <br /> T-shirts
    </h2>
    <p>For everything casual and more</p>
    <Link to={"/shop"}>
      <button>Shop More</button>
    </Link>
  </div>
);

function Home() {
  const [bgImage, setBgImage] = useState(bgImage1);
  const bgImages = [bgImage1, bgImage2];

  useEffect(() => {
    const interval = setInterval(() => {
      setBgImage((prevImage) => {
        const currentIndex = bgImages.indexOf(prevImage);
        const nextIndex = (currentIndex + 1) % bgImages.length;
        return bgImages[nextIndex];
      });
    }, 100000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="Home" style={{ backgroundImage: `url(${bgImage})` }}>
        <h3 className="Title">New Arrivals</h3>
        <div className="Home-Options">
          <NavLink to={"/shop"}>
            <p>Men Collection</p>
          </NavLink>
          <NavLink to={"/shop"}>
            <p>Women Collection</p>
          </NavLink>
        </div>
      </div>
      <Product />
      <Banner image1={topImage} image2={topImage2} bannerInfo={bannerInfo} />
      <ProductBox />
    </>
  );
}

export default Home;
