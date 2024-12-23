import React from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { currentUser } = useAuth();
  if (currentUser) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoutes;
