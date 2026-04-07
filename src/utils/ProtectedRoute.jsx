import { useEffect, useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import FullPageSpinner from "./FullPageSpinner";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { status, auth, openAuthModal } = useAuth();
  const loading = status === "loading";
  const isAuthenticated = auth.isAuthenticated;
  const modalOpenedRef = useRef(false);

  useEffect(() => {
    if (!loading && !isAuthenticated && !modalOpenedRef.current) {
      openAuthModal("login");
      modalOpenedRef.current = true;
    }
  }, [loading, isAuthenticated, openAuthModal]);

  if (loading) {
    return <FullPageSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
