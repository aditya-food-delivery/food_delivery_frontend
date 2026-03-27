import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectCartItems,
  selectCartTotal,
  selectCartRestaurant,
} from "../features/cart/cartSelectors";
import {
  selectCurrentOrder,
  selectCurrentOrderStatus,
} from "../features/order/orderSelectors";
import {
  createOrderThunk,
  getOrderStatusThunk,
} from "../features/order/orderThunks";
import { selectUserData } from "../features/auth/authSelectors";
import CartReview from "../components/checkout/CartReview";
import AddressSelection from "../components/checkout/AddressSelection";
import OrderSummary from "../components/checkout/OrderSummary";
import PaymentButton from "../components/checkout/PaymentButton";
import FullPageSpinner from "../utils/FullPageSpinner";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const cartRestaurant = useSelector(selectCartRestaurant);
  const currentOrder = useSelector(selectCurrentOrder);
  const orderCreationStatus = useSelector(selectCurrentOrderStatus);
  const userData = useSelector(selectUserData);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderError, setOrderError] = useState(null);
  const [orderCreated, setOrderCreated] = useState(false);
  const [isPollingStatus, setIsPollingStatus] = useState(false);
  const [pollAttempts, setPollAttempts] = useState(0);
  const paymentReady = Boolean(currentOrder?.razorpayOrderId);
  const buttonLoading =
    isProcessing ||
    orderCreationStatus === "loading" ||
    (isPollingStatus && !paymentReady);

  // Polling function with exponential backoff
  const pollOrderStatus = async (orderId, attempt = 0) => {
    const maxAttempts = 10; // Maximum polling attempts
    const baseDelay = 1000; // Base delay in milliseconds (1 second)
    const maxDelay = 30000; // Maximum delay (30 seconds)

    if (attempt >= maxAttempts) {
      console.error(
        "❌ [POLLING FAILED] Max polling attempts reached, razorpayOrderId not received after",
        maxAttempts,
        "attempts",
      );
      setOrderError(
        "Payment setup taking longer than expected. Please refresh and try again.",
      );
      setIsPollingStatus(false);
      setPollAttempts(0);
      return;
    }

    console.log(
      `🚀 [POLLING START] Beginning polling session for orderId: ${orderId}`,
    );

    try {
      console.log(
        `🔄 [POLLING] Starting attempt ${attempt + 1}/${maxAttempts} for orderId:`,
        orderId,
      );
      console.log(
        `📡 [API CALL] Fetching order status from backend for orderId: ${orderId}`,
      );
      setPollAttempts(attempt + 1);

      const statusResult = await dispatch(
        getOrderStatusThunk(orderId),
      ).unwrap();
      console.log("📥 [API RESPONSE] Order status received:", statusResult);
      console.log(`🔍 [CHECKING] Looking for razorpayOrderId in response...`);

      if (statusResult.razorpayOrderId) {
        console.log(
          "✅ [SUCCESS] Razorpay Order ID found:",
          statusResult.razorpayOrderId,
        );
        console.log("🛑 [POLLING] Stopping polling - payment ready!");
        setIsPollingStatus(false);
        setPollAttempts(0);
        return; // Success, stop polling
      } else {
        // Continue polling with exponential backoff
        const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
        console.log(
          `⏳ [RETRY] Razorpay Order ID not ready, waiting ${delay}ms before next attempt...`,
        );
        console.log(
          `📊 [STATUS] Attempt ${attempt + 1} completed, ${maxAttempts - attempt - 1} attempts remaining`,
        );

        setTimeout(() => {
          pollOrderStatus(orderId, attempt + 1);
        }, delay);
      }
    } catch (error) {
      console.error(
        `❌ [API ERROR] Polling attempt ${attempt + 1} failed for orderId ${orderId}:`,
        error,
      );
      console.log(
        `🔄 [RETRY] Continuing polling despite error, attempt ${attempt + 1} failed`,
      );

      // Continue polling even on error, but with backoff
      const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
      console.log(
        `⏳ [BACKOFF] Waiting ${delay}ms before retry after error...`,
      );

      setTimeout(() => {
        pollOrderStatus(orderId, attempt + 1);
      }, delay);
    }
  };

  // Redirect to home if no cart items
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/");
    }
  }, [cartItems.length, navigate]);

  useEffect(() => {
    if (!paymentReady) return;

    setIsPollingStatus(false);
    setPollAttempts(0);
  }, [paymentReady]);

  // Auto-create order when user has cart items and selects address
  useEffect(() => {
    const createOrderForCheckout = async () => {
      setIsProcessing(true);
      setOrderError(null);

      const createOrderRequest = {
        userId: userData.id,
        restaurantId: cartRestaurant.id,
        items: cartItems.map((item) => ({
          menuItemId: item.menuItemId,
          quantity: item.quantity,
          name: item.name,
          price: item.price,
        })),
        idempotencyKey: `${userData.id}-${Date.now()}`,
      };

      try {
        console.log("🚀 Auto-creating order for checkout:", createOrderRequest);

        const result = await dispatch(
          createOrderThunk(createOrderRequest),
        ).unwrap();
        console.log("✅ Order auto-created successfully:", result);

        // Start polling for order status with exponential backoff
        console.log(
          `🎯 [ORDER CREATED] Order ${result.orderId} created successfully, starting polling for razorpayOrderId`,
        );
        setIsPollingStatus(true);
        pollOrderStatus(result.orderId);

        setOrderCreated(true);
      } catch (error) {
        console.error("❌ Order auto-creation failed:", error);
        setOrderError(
          error?.message || "Could not create order. Please try again.",
        );
      } finally {
        setIsProcessing(false);
      }
    };

    if (
      cartItems.length > 0 &&
      selectedAddress &&
      userData?.id &&
      !orderCreated &&
      !currentOrder &&
      orderCreationStatus === "idle" &&
      !isProcessing
    ) {
      createOrderForCheckout();
    }
  }, [
    cartItems,
    selectedAddress,
    userData?.id,
    orderCreated,
    currentOrder,
    orderCreationStatus,
    isProcessing,
    dispatch,
    cartRestaurant.id,
  ]);

  // Cleanup polling on unmount or address change
  useEffect(() => {
    return () => {
      setIsPollingStatus(false);
      setPollAttempts(0);
    };
  }, [selectedAddress]);

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-8 px-4 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
            Secure Checkout
          </h1>
          <p className="text-[var(--text-secondary)]">
            Complete your order with confidence
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Order Review */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cart Review */}
            <CartReview items={cartItems} total={cartTotal} />

            {/* Address Selection */}
            <AddressSelection
              selectedAddress={selectedAddress}
              onSelectAddress={setSelectedAddress}
            />

            {/* Order Creation Status */}
            {isProcessing && (
              <div className="bg-gradient-to-r from-[var(--primary-50)] to-[var(--primary-100)] dark:from-[var(--primary-900)] dark:to-[var(--primary-800)] border border-[var(--primary-200)] dark:border-[var(--primary-700)] rounded-xl p-6 shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[var(--primary-600)]"></div>
                  <div>
                    <p className="text-[var(--primary-800)] dark:text-[var(--primary-200)] font-medium">
                      Creating your order...
                    </p>
                    <p className="text-[var(--primary-600)] dark:text-[var(--primary-300)] text-sm">
                      This will just take a moment
                    </p>
                  </div>
                </div>
              </div>
            )}

            {orderCreated && !isPollingStatus && !paymentReady && (
                <div className="bg-gradient-to-r from-[var(--secondary-50)] to-[var(--accent-50)] dark:from-[var(--secondary-900)] dark:to-[var(--accent-900)] border border-[var(--secondary-200)] dark:border-[var(--secondary-700)] rounded-xl p-6 shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className="animate-pulse-custom rounded-full h-5 w-5 bg-[var(--secondary-400)]"></div>
                    <div>
                      <p className="text-[var(--secondary-800)] dark:text-[var(--secondary-200)] font-medium">
                        Order confirmed! 🎉
                      </p>
                      <p className="text-[var(--secondary-600)] dark:text-[var(--secondary-300)] text-sm">
                        Setting up secure payment...
                      </p>
                    </div>
                  </div>
                </div>
              )}

            {isPollingStatus && !paymentReady && (
              <div className="bg-gradient-to-r from-[var(--info-bg)] to-[var(--primary-50)] dark:from-[var(--info-bg)] dark:to-[var(--primary-900)] border border-[var(--info-border)] dark:border-[var(--primary-700)] rounded-xl p-6 shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-[var(--info-border)] border-t-[var(--primary-500)]"></div>
                    <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--secondary-500)] animate-spin animation-delay-75"></div>
                  </div>
                  <div>
                    <p className="text-[var(--info)] dark:text-[var(--primary-200)] font-medium">
                      Almost ready! 🚀
                    </p>
                    <p className="text-[var(--text-secondary)] text-sm">
                      Connecting to payment gateway...
                    </p>
                  </div>
                </div>
              </div>
            )}

            {paymentReady && (
              <div className="bg-gradient-to-r from-[var(--success-bg)] to-[var(--secondary-50)] dark:from-[var(--success-bg)] dark:to-[var(--secondary-900)] border border-[var(--success-border)] dark:border-[var(--secondary-700)] rounded-xl p-6 shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="rounded-full h-6 w-6 bg-[var(--success)] flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[var(--success)] dark:text-[var(--secondary-200)] font-medium">
                      Ready to pay! 💳
                    </p>
                    <p className="text-[var(--text-secondary)] text-sm">
                      Click below to complete your order
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Order Status Messages */}
            {orderCreationStatus === "failed" && (
              <div className="bg-[var(--error-bg)] border border-[var(--error-border)] rounded-lg p-4">
                <p className="text-[var(--error)] font-medium">
                  Failed to create order. Please try again.
                </p>
              </div>
            )}
          </div>

          {/* Right Side - Summary & Payment */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <OrderSummary
                subtotal={cartTotal}
                selectedAddress={selectedAddress}
              />

              {orderError && (
                <div className="mt-4 p-3 rounded-lg bg-[var(--error-bg)] border border-[var(--error-border)] text-[var(--error)]">
                  {orderError}
                </div>
              )}

              <PaymentButton
                disabled={
                  !selectedAddress ||
                  buttonLoading ||
                  !currentOrder ||
                  !currentOrder.razorpayOrderId
                }
                isLoading={buttonLoading}
                cartTotal={cartTotal}
                onPaymentInitiate={async () => {
                  // Order is already created, just proceed with payment
                  console.log(
                    "💳 Initiating payment for existing order:",
                    currentOrder,
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {orderCreationStatus === "loading" && <FullPageSpinner />}
    </div>
  );
};

export default CheckoutPage;
