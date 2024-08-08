import React, { useContext } from "react";
import "./CustomerDashboard.css";
import { userContext } from "../../../Context/userContext";

function CustomerDashboard() {
  const { currentUser } = useContext(userContext);
  console.log(currentUser);

  return (
    <div className="CustomerDashboard-Container">
      <div className="CustomerDashboard-Top">
        <h2>Hello, {currentUser?.username}</h2>
        <p>
          From your account dashboard you can view your recent orders, manage
          your shipping and billing addresses, and edit your password and
          account details.
        </p>
      </div>
    </div>
  );
}

export default CustomerDashboard;
