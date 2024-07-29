import axios from "axios";
import React, { useState } from "react";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login`,
        {
          email,
          password,
        }
      );
      setLoading(false);
      console.log(response.data);
      Cookies.set("token", response.data.token, { expires: 3 });
      navigate("/home");
    } catch (error) {
      console.error("There was an error logging in!", error);
      setError(error.response?.data?.message || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="Auth-Container">
      {error && <p className="error">{error}</p>}
      <div className="Auth-Wrapper">
        <h1>Login Account</h1>
        <p className="p">Let's get started</p>
        <form onSubmit={handleSubmit}>
          <div className="Form-Section">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="johndoe@something.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="Form-Section">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="..............."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button
            className="Auth-Submit-Button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="text">
            Don't have an account?{" "}
            <span className="link">
              <Link to={"/register"}>Register</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
