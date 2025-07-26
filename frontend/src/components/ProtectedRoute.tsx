import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser, userData, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  // If no user is authenticated, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // If user is authenticated but no user data exists in Firestore, redirect to login
  if (!userData) {
    return <Navigate to="/login" />;
  }

  // If user exists but registration is not complete, redirect to login
  if (!userData.isRegistered) {
    return <Navigate to="/login" />;
  }

  // If user exists but profile is not complete, redirect to profile setup
  if (!userData.isProfileComplete) {
    return <Navigate to="/user-profile" />;
  }

  return children;
};

export default ProtectedRoute;
