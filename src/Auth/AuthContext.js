import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.log("Error parsing user data", error);
      }
    }
  }, []);

  const login = userInfo => {
    try {
      const userStr = JSON.stringify(userInfo);
      localStorage.setItem("user", userStr);
      setUser(userInfo);
    } catch (error) {
      console.error("Error storing user data:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
