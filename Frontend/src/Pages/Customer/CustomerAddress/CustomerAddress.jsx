import React, { useState, useContext, useEffect } from "react";
import "./CustomerAddress.css";
import { userContext } from "../../../Context/userContext";
import axios from "axios";
import cookie from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CustomerAddress() {
  const { currentUser } = useContext(userContext);

  const token = cookie.get("token");

  const [country, setCountry] = useState(currentUser?.shippingData?.country);
  const [address, setAddress] = useState(currentUser?.shippingData?.address);
  const [city, setCity] = useState(currentUser?.shippingData?.city);
  const [state, setState] = useState(currentUser?.shippingData?.state);
  const [pinCode, setPinCode] = useState(currentUser?.shippingData?.pinCode);
  const [phoneNo, setPhoneNo] = useState(currentUser?.shippingData?.phoneNo);

  const [isEditable, setIsEditable] = useState(false);

  const handleChangeClick = () => {
    setIsEditable((prev) => !prev);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("You must be logged in to update your profile.");
      return;
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/profile/address`,
        {
          country,
          address,
          city,
          state,
          pinCode,
          phoneNo,
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
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while updating the profile."
      );
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="CustomerAddress-Container">
      <form onSubmit={handleUpdate}>
        <div className="CustomerAddress-Form">
          <div className="CustomerAddress-Left">
            <h2 className="CustomerAddress-Heading">Shipping Address</h2>
            <div className="CustomerInput">
              <div className="input-group">
                <label>Country</label>
                <input
                  type="text"
                  placeholder="Country / Region"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  disabled={!isEditable}
                />
              </div>
              <div className="input-group">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={!isEditable}
                />
              </div>
              <div className="input-group">
                <label>City</label>
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  disabled={!isEditable}
                />
              </div>
              <div className="input-group">
                <label>State</label>
                <input
                  type="text"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  disabled={!isEditable}
                />
              </div>
              <div className="input-group">
                <label>Pincode</label>
                <input
                  type="text"
                  placeholder="Pincode"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  disabled={!isEditable}
                />
              </div>
              <div className="input-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  disabled={!isEditable}
                />
              </div>
            </div>
          </div>
          <div className="CustomerAddress-Right">
            <div className="CustomerAddress-Buttons">
              <button type="button" onClick={handleChangeClick}>
                {isEditable ? "Cancel" : "Change"}
              </button>
              {isEditable && (
                <button type="submit" className="update">
                  Update
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default CustomerAddress;
