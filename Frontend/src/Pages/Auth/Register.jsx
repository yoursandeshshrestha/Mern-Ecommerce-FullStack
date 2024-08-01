import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("Customer");
  const [shopName, setShopName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/register`,
        {
          username,
          email,
          password,
          accountType,
          shopName: accountType === "Seller" ? shopName : undefined,
        }
      );
      setLoading(false);
      console.log(response.data.message);
      setUsername("");
      setEmail("");
      setPassword("");
      setAccountType("Customer");
      setShopName("");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
      setLoading(false);
    }
  };

  return (
    <div className="Auth-Container">
      {error && <p className="error">{error}</p>}
      <div className="Auth-Wrapper">
        <h1>Create Account</h1>
        <p className="p">Let's get started</p>
        <form onSubmit={handleRegister}>
          <div className="Form-Section">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="John Doe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="Form-Section">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="johndoe@something.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="Form-Section">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder=".................."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="Form-Section">
            <label>Register as</label>
            <div className="Form-Section-accountType">
              <label
                className={`accountType-selection ${
                  accountType === "Customer" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="accountType"
                  value="Customer"
                  checked={accountType === "Customer"}
                  onChange={(e) => setAccountType(e.target.value)}
                />
                Customer
              </label>
              <label
                className={`accountType-selection ${
                  accountType === "Seller" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="accountType"
                  value="Seller"
                  checked={accountType === "Seller"}
                  onChange={(e) => setAccountType(e.target.value)}
                />
                Seller
              </label>
            </div>
          </div>
          {accountType === "Seller" && (
            <div className="Form-Section">
              <label htmlFor="shopName">Shop Name</label>
              <input
                type="text"
                name="shopName"
                id="shopName"
                placeholder="Your Shop Name"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
              />
            </div>
          )}
          <button
            className="Auth-Submit-Button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
          <p className="text">
            Already have an account?{" "}
            <span className="link">
              <Link to={"/login"}>Login</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
