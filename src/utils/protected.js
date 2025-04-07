import React from "react";
import { Navigate } from "react-router-dom";
import isAuthenticated from "../utils/auth";

const ProtectedRoute = ({ element }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;