import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "../utils/userAxios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [panel, setPanel] = useState(false);
  useEffect(() => {
    const storedUserData = Cookies.get("userData");
    if (storedUserData) {
      setAuth(JSON.parse(storedUserData));
    } else {
      setAuth(null);
    }
  }, []);

  const authFunc = (userData) => {
    if (userData) {
      Cookies.set("userData", JSON.stringify(userData), { expires: 7 });
      setAuth(userData);
    } else {
      Cookies.remove("userData");
      setAuth(null);
    }
  };
  const handleLogout = async () => {
    authFunc(null);
    try {
      const response = await axios.get("user/signout");
      if (response.statusCode === 200) {
        localStorage.removeItem("userData");
        toast.success("Logout Successful!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };


  return (
    <AuthContext.Provider
      value={{ auth, authFunc, handleLogout, panel, setPanel }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
