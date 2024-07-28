import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ element }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/verify-token`,
          { withCredentials: true }
        );
        setIsAuthorized(response.data.valid);
      } catch (error) {
        setIsAuthorized(false);
      }
    };

    verifyToken();
  }, []);

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
