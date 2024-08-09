import React, { useContext, useState } from "react";
import "./CustomerAccount.css";
import { userContext } from "../../../Context/userContext";
import axios from "axios";
import cookie from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CustomerAccount() {
  const { currentUser } = useContext(userContext);
  // console.log(currentUser);
  const token = cookie.get("token");
  const [isEditable, setIsEditable] = useState(false);
  const [username, setUsername] = useState(currentUser?.username);
  const [email, setEmail] = useState(currentUser?.email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangeClick = () => {
    setIsEditable((prev) => !prev);
  };

  const handleUpdate = async (e) => {
    // e.preventDefault();

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/profile`,
        {
          username,
          email,
          currentPassword,
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("Profile updated successfully!");
        setIsEditable(false);
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    }
  };

  return (
    <div
      className={`CustomerAccount-Container ${isEditable ? "editable" : ""}`}
    >
      <ToastContainer />
      <div className="CustomerAccount-Info">
        <div className="CustomerAccount-Wrapper">
          <h2>Account Details</h2>
          <form className="CustomerAccount-Form">
            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="your name"
                value={username}
                disabled={!isEditable}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="your email"
                value={email}
                disabled={!isEditable}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </form>
        </div>
        <div className="CustomerAccount-Buttons">
          <button onClick={handleChangeClick}>
            {isEditable ? "Cancel" : "Change"}
          </button>
          {isEditable && (
            <button className="update" onClick={handleUpdate}>
              Update
            </button>
          )}
        </div>
      </div>
      <div className="CustomerAccount-Password">
        <h2 className="second-h2">Password Change</h2>
        <form className="CustomerAccount-Form">
          <div className="input-group">
            <label>Current Password</label>
            <input
              type="password"
              placeholder="Required to save changes"
              disabled={!isEditable}
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
              }}
            />
          </div>
          <div className="input-group">
            <label>New Password</label>
            <input
              type="password"
              placeholder="leave blank to leave unchanged"
              disabled={!isEditable}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
          </div>
          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="leave blank to leave unchanged"
              disabled={!isEditable}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomerAccount;
