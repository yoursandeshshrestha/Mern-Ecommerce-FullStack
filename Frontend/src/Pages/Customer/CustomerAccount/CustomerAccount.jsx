import React, { useContext, useState } from "react";
import "./CustomerAccount.css";
import { userContext } from "../../../Context/userContext";

function CustomerAccount() {
  const { currentUser } = useContext(userContext);
  const [isEditable, setIsEditable] = useState(false);

  const handleChangeClick = () => {
    setIsEditable((prev) => !prev);
  };

  return (
    <div
      className={`CustomerAccount-Container ${isEditable ? "editable" : ""}`}
    >
      <div className="CustomerAccount-Info">
        <div className="CustomerAccount-Wrapper">
          <h2>Account Details</h2>
          <form action="">
            <div className="input-group">
              <label htmlFor="">Username</label>
              <input
                type="text"
                placeholder="your name"
                value={currentUser.username}
                disabled={!isEditable}
              />
            </div>
            <div className="input-group">
              <label htmlFor="">Email Address</label>
              <input
                type="email"
                placeholder="your email"
                value={currentUser.email}
                disabled={!isEditable}
              />
            </div>
          </form>
        </div>
        <div className="CustomerAccount-Buttons">
          <button onClick={handleChangeClick}>
            {isEditable ? "Cancel" : "Change"}
          </button>
          {isEditable && <button className="update">Update</button>}
        </div>
      </div>
      <div className="CustomerAccount-Password">
        <h2 className="second-h2">Password Change</h2>
        <form action="">
          <div className="input-group">
            <label htmlFor="">Current Password</label>
            <input
              type="password"
              placeholder="Required to save changes"
              disabled={!isEditable}
            />
          </div>
          <div className="input-group">
            <label htmlFor="">New Password</label>
            <input
              type="password"
              placeholder="leave blank to leave unchanged"
              disabled={!isEditable}
            />
          </div>
          <div className="input-group">
            <label htmlFor="">Confirm Password</label>
            <input
              type="password"
              placeholder="leave blank to leave unchanged"
              disabled={!isEditable}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomerAccount;
