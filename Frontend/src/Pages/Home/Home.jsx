import React from "react";
import "./Home.css";
import Product from "../../Components/Product/Product";
import Banner from "../../Components/Banner/Banner";

// Banner Image
import topImage from "../../assets/Ecommerce-design-idea/banner.png";
import topImage2 from "../../assets/Ecommerce-design-idea/banner2.png";
import ProductBox from "../../Components/Product/ProductBox";

const bannerInfo = (
  <div className="Banner-Info">
    <h2>
      Tops & <br /> T-shirts
    </h2>
    <p>For everything casual and more</p>
    <button>Shop More</button>
  </div>
);

function Home() {
  return (
    <>
      <div className="Home">
        <h3 className="Title">New Arrivals</h3>
        <div className="Home-Options">
          <p>Men Collection</p>
          <p>Women Collection</p>
        </div>
      </div>
      <Product />
      <Banner image1={topImage} image2={topImage2} bannerInfo={bannerInfo} />
      <ProductBox />
    </>
  );
}

export default Home;
