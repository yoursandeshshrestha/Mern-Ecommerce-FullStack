import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export const userContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        })
        .then((response) => {
          const user = response.data.user;
          setCurrentUser(user);

          if (user && user.cartDetails) {
            setCartItemCount(user.cartDetails.length);
            // console.log(user);
          }
        })
        .catch((error) => {
          console.error("Error fetching current user:", error);
          if (error.response && error.response.status === 401) {
            Cookies.remove("token");
          }
        });
    }
  }, [currentUser]);

  const logout = () => {
    Cookies.remove("token");
    setCurrentUser(null);
    setCartItemCount(0);
    window.location.href = "/";
  };

  return (
    <userContext.Provider
      value={{ currentUser, setCurrentUser, cartItemCount, logout }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
