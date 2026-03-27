import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import "./App.css";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import AuthModal from "./features/auth/components/AuthModal.jsx";
import ProfilePage from "./features/profile/components/ProfilePage";
import ProtectedRoute from "./utils/ProtectedRoute";
import RestaurantPage from "./pages/RestaurantPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import { useAuthBootstrap } from "./hooks/useAuthBootstrap";
import { useAuth } from "./hooks/useAuth";
import { initializeCart } from "./features/cart/cartSlice";

function App() {
  console.log("App mounted");
  const dispatch = useDispatch();

  // 🔐 Load user on app start (refresh-safe auth)
  useAuthBootstrap();

  // 🛒 Initialize cart from localStorage
  useEffect(() => {
    dispatch(initializeCart());
  }, [dispatch]);

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

        <Route path="/cart" element={<CartPage />} />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders/:orderId"
          element={
            <ProtectedRoute>
              <OrderDetailsPage />
            </ProtectedRoute>
          }
        />

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
