import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export const userContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        })
        .then((response) => {
          setCurrentUser(response.data.user);
        })
        .catch((error) => {
          console.error("Error fetching current user:", error);
          if (error.response && error.response.status === 401) {
            Cookies.remove("token");
          }
        });
    }
  }, []);

  const logout = () => {
    Cookies.remove("token");
    setCurrentUser(null);
    window.location.href = "/";
  };

  return (
    <userContext.Provider value={{ currentUser, setCurrentUser, logout }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
