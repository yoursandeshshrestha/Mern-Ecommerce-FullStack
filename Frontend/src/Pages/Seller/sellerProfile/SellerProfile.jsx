import React, { useContext, useState } from "react";
import "./SellerProfile.css";
import axios from "axios";
import Cookies from "js-cookie";
import profile from "../../../assets/SellerAsset/profile.png";
import { userContext } from "../../../Context/userContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SellerProfile() {
  const { currentUser, setCurrentUser } = useContext(userContext);
  const [username, setUsername] = useState(currentUser?.username || "");
  const [shopName, setShopName] = useState(currentUser?.shopName || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword) {
      toast.error("Please enter your current password.");
      return;
    }

    const token = Cookies.get("token");

    if (token) {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/users/profile`,
          { username, shopName, email, password, currentPassword },
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setCurrentUser(response.data.user);
        setCurrentPassword("");
        toast.success("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error(
          error.response?.data?.message ||
            "Failed to update profile. Please try again."
        );
      }
    } else {
      toast.error("You are not authenticated.");
    }
  };

  return (
    <div className="SellerProfile-Container">
      <div className="SellerProfile-Nav">
        <div className="SellerProfile-heading">
          <img src={profile} alt="Profile Icon" />
          <h2>Manage Profile</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="update-info-container">
          {/* <p>Update Information</p> */}
          <div className="group-firsttwo-input">
            <div className="update-first-input">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="update-second-input">
              <label htmlFor="shopname">Shop Name</label>
              <input
                type="text"
                className="shopname"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
              />
            </div>
          </div>
          <div className="update-third-input">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="update-fourth-input">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              className="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="update-fifth-input">
            <label htmlFor="currentPassword">Current Password</label>
            <input
              type="password"
              className="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <button className="update-info-button button-38" type="submit">
            Save Changes
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
}

export default SellerProfile;
