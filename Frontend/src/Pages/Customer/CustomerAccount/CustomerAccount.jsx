import React, { useContext } from "react";
import "./CustomerAccount.css";
import { userContext } from "../../../Context/userContext";

function CustomerAccount() {
  const { currentUser } = useContext(userContext);

  return (
    <div className="CustomerAccount-Container">
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
              />
            </div>
            <div className="input-group">
              <label htmlFor="">Email Address</label>
              <input
                type="email"
                placeholder="your email"
                value={currentUser.email}
              />
            </div>
          </form>
        </div>
        <button>Update</button>
      </div>
      <div className="CustomerAccount-Password">
        <h2 className="second-h2">Password Change</h2>
        <form action="">
          <div className="input-group">
            <label htmlFor="">Current Password</label>
            <input type="Password" placeholder="Required to save changes" />
          </div>
          <div className="input-group">
            <label htmlFor="">New Password</label>
            <input
              type="Password"
              placeholder="leave a blank to leave unchanged"
            />
          </div>
          <div className="input-group">
            <label htmlFor="">Confirm Password</label>
            <input
              type="Password"
              placeholder="leave a blank to leave unchanged"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomerAccount;
