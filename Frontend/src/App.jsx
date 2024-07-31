import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import Home from "./Pages/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Category from "./Pages/Category/Category";
import Cart from "./Pages/Cart/Cart";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import Footer from "./Components/Footer/Footer";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/men" element={<Category />} />
        <Route path="/women" element={<Category />} />
        <Route path="/kids" element={<Category />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/:id" element={<ProductDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
