import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Category from "./Pages/Category";
import Cart from "./Pages/Cart";
import ProductDetail from "./Pages/ProductDetail";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/men" element={<Category />} />
        <Route path="/women" element={<Category />} />
        <Route path="/kids" element={<Category />} />
        <Route path="/product" element={<ProductDetail />}>
          <Route path=":productID" element={<ProductDetail />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
