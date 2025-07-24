// src/Routes/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../Utils/Utiles";

const PrivateRoute = ({ children }) => {
  const token = getToken();
  console.log("Token in PrivateRoute:", token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
