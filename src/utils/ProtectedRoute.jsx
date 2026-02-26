import { useEffect, useRef } from "react";
import { useAuth } from "../hooks/useAuth";
import FullPageSpinner from "./FullPageSpinner";

const ProtectedRoute = ({ children }) => {
  const { status, auth, openAuthModal } = useAuth();
  const loading = status === "loading";
  const isAuthenticated = auth.isAuthenticated;
  console.log("authentication in profile", isAuthenticated);
  const modalOpenedRef = useRef(false);

  useEffect(() => {
    // Open auth modal ONCE if user is not authenticated
    if (!loading && !isAuthenticated && !modalOpenedRef.current) {
      openAuthModal("login");
      modalOpenedRef.current = true;
    }
  }, [loading, isAuthenticated, openAuthModal]);

  // While checking auth → block everything
  if (loading) {
    return <FullPageSpinner />;
  }

  // Not authenticated → block route (modal is already open)
  if (!isAuthenticated) {
    return null;
  }

  // Authenticated → render protected content
  return children;
};

export default ProtectedRoute;
