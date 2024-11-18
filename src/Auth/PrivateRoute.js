import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ element }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default PrivateRoute;
