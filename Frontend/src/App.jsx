import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import ProtectedRoute from "./Components/ProtectedRoute";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="/home" element={<ProtectedRoute element={<Home />} />} /> */}
      </Routes>
    </>
  );
}

export default App;
