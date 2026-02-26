import { Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage";
import AuthModal from "./features/auth/components/AuthModal.jsx";
import ProfilePage from "./features/profile/components/ProfilePage";
import ProtectedRoute from "./utils/ProtectedRoute";
import RestaurantPage from "./pages/RestaurantPage";
import { useAuthBootstrap } from "./hooks/useAuthBootstrap";
import { useAuth } from "./hooks/useAuth";

function App() {
  console.log("App mounted");

  // 🔐 Load user on app start (refresh-safe auth)
  useAuthBootstrap();

  // 🔁 Global auth state (Redux)
  const { showAuthModal, authMode, closeAuthModal } = useAuth();

  return (
    <>
      {/* 🌍 Global Auth Modal */}
      {showAuthModal && (
        <AuthModal mode={authMode} setShowLogin={closeAuthModal} />
      )}

      {/* Navbar (no local auth state anymore) */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:city" element={<HomePage />} />
        <Route path="/restaurants/:id" element={<RestaurantPage />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;


