// ProtectedRoute.tsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../store/rootReducer";

const ProtectedRoute: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  // If the user is not authenticated, redirect to the login page
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
