import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectCartItems,
  selectCartTotal,
  selectCartIsEmpty,
  selectCartRestaurant,
} from "../features/cart/cartSelectors";
import { selectAuth } from "../features/auth/authSelectors";
import CartReview from "../components/checkout/CartReview";
import FullPageSpinner from "../utils/FullPageSpinner";

const CartPage = () => {
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const cartIsEmpty = useSelector(selectCartIsEmpty);
  const cartRestaurant = useSelector(selectCartRestaurant);
  const { isAuthenticated } = useSelector(selectAuth);

  if (cartIsEmpty) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="mb-6">
            <svg
              className="w-24 h-24 mx-auto text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Add some delicious food items to get started
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
          <p className="text-gray-600 mt-2">
            {cartRestaurant.name && (
              <>
                From <strong>{cartRestaurant.name}</strong>
              </>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Cart Items */}
          <div className="lg:col-span-2">
            <CartReview items={cartItems} total={cartTotal} />
          </div>

          {/* Right Side - Summary & Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-white rounded-lg shadow p-6">
              {/* Price Summary */}
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Order Summary
              </h3>

              <div className="space-y-3 pb-4 border-b border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="text-gray-900 font-medium">
                    ₹{cartTotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Delivery Fee</span>
                  <span className="text-gray-900 font-medium">₹40.00</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Taxes</span>
                  <span className="text-gray-900 font-medium">₹0.00</span>
                </div>
              </div>

              <div className="flex justify-between py-4 mb-6">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="text-xl font-bold text-orange-600">
                  ₹{(cartTotal + 40).toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  if (!isAuthenticated) {
                    alert("Please login to proceed");
                    navigate("/");
                    return;
                  }
                  navigate("/checkout");
                }}
                className="w-full bg-orange-500 text-white py-3 px-4 font-semibold rounded-lg hover:bg-orange-600 transition-colors mb-3"
              >
                Proceed to Checkout
              </button>

              {/* Continue Shopping Button */}
              <button
                onClick={() => navigate("/")}
                className="w-full bg-gray-100 text-gray-900 py-3 px-4 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
