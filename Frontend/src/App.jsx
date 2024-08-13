import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import Home from "./Pages/Home/Home";
import Category from "./Pages/Category/Category";
import Cart from "./Pages/Cart/Cart";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import ScrollToTop from "./Components/ScrollToTop";
import MainLayout from "./Layout/MainLayout";
import SellerLayout from "./Layout/SellerLayout";
import CreateProduct from "./Pages/Seller/SellerCreateProduct/CreateProduct";
import SellerAllProducts from "./Pages/Seller/SellerAllProducts/SellerAllProducts";
import SellerProfile from "./Pages/Seller/sellerProfile/SellerProfile";
import CustomerLayout from "./Layout/CustomerLayout";
import CustomerProfile from "./Pages/Customer/CustomerAccount/CustomerAccount";
import CustomerAddress from "./Pages/Customer/CustomerAddress/CustomerAddress";
import CheckoutLayout from "./Layout/CheckoutLayout";
import Checkout from "./Pages/Checkout/Checkout";
import Thankyou from "./Pages/Thankyou/Thankyou";
import CustomerOrder from "./Pages/Customer/CustomerOrder/CustomerOrder";
import SellerOrders from "./Pages/Seller/SellerOrders/SellerOrders";
import EditProduct from "./Pages/Seller/EditProduct/EditProduct";

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
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="all-products" element={<SellerAllProducts />} />
          <Route path="profile" element={<SellerProfile />} />
          <Route path="manage-orders" element={<SellerOrders />} />
          <Route
            path="all-product/edit-product/:id"
            element={<EditProduct />}
          />
        </Route>
        <Route path="my-account" element={<CustomerLayout />}>
          <Route path="edit-account" element={<CustomerProfile />} />
          <Route path="orders" element={<CustomerOrder />} />
          <Route path="address" element={<CustomerAddress />} />
        </Route>
        <Route path="cart" element={<CheckoutLayout />}>
          <Route path="checkout" element={<Checkout />} />
          <Route path="thankyou" element={<Thankyou />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
