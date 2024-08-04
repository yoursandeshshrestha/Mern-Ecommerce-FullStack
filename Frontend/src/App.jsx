import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import Home from "./Pages/Home/Home";
import Category from "./Pages/Category/Category";
import Cart from "./Pages/Cart/Cart";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import ScrollToTop from "./Components/ScrollToTop";
import SellerMain from "./Pages/Seller/SellerMain/SellerMain";
import MainLayout from "./Layout/MainLayout";
import SellerLayout from "./Layout/SellerLayout";
import CreateProduct from "./Pages/Seller/SellerCreateProduct/CreateProduct";
import SellerAllProducts from "./Pages/Seller/SellerAllProducts/SellerAllProducts";
import SellerProfile from "./Pages/Seller/sellerProfile/SellerProfile";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="men" element={<Category />} />
          <Route path="women" element={<Category />} />
          <Route path="kids" element={<Category />} />
          <Route path="cart" element={<Cart />} />
          <Route path="products/:id" element={<ProductDetail />} />
        </Route>
        <Route path="dashboard" element={<SellerLayout />}>
          <Route path="product" element={<CreateProduct />} />
          <Route path="allproduct" element={<SellerAllProducts />} />
          <Route path="profile" element={<SellerProfile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
