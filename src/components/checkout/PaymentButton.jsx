import { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCurrentOrder } from "../../features/order/orderSelectors";
import { updateOrderPaymentStatus } from "../../features/order/orderSlice";
import { clearCart } from "../../features/cart/cartSlice";

const PaymentButton = ({ disabled, isLoading, onPaymentInitiate, cartTotal = 0 }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentOrder = useSelector(selectCurrentOrder);

  const displayAmount = currentOrder?.amount || cartTotal;
  const isReadyToPay = Boolean(currentOrder?.razorpayOrderId);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const openRazorpayModal = (order) => {
    const options = {
      key: "rzp_test_RfWUk3bp0PCoPz",
      amount: Math.round(order.amount * 100),
      currency: "INR",
      order_id: order.razorpayOrderId,
      name: "Food Delivery",
      description: `Order #${order.orderId}`,
      customer_notification: 1,
      handler: async (paymentResponse) => {
        try {
          dispatch(
            updateOrderPaymentStatus({
              orderId: order.orderId,
              paymentStatus: "CONFIRMED",
            }),
          );
          dispatch(clearCart());
          navigate(`/orders/${order.orderId}/success`, {
            state: {
              paymentSuccess: true,
              paymentResponse,
              order,
            },
          });
        } catch (error) {
          console.error("Payment verification failed:", error);
        }
      },
      prefill: {
        name: order.userId,
        email: "",
        contact: "",
      },
      notes: {
        orderId: order.orderId,
        restaurantId: order.restaurantId,
      },
      theme: {
        color: "#f97316",
      },
      modal: {
        ondismiss: () => {
          console.log("Payment modal closed by user");
        },
      },
    };

    if (window.Razorpay) {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      alert("Payment gateway not available. Please try again.");
    }
  };

  const handlePaymentClick = async () => {
    if (onPaymentInitiate) {
      await onPaymentInitiate();
    }

    if (!currentOrder || !currentOrder.razorpayOrderId) {
      alert("Order is not ready yet. Please wait.");
      return;
    }

    openRazorpayModal(currentOrder);
  };

  return (
    <button
      type="button"
      onClick={handlePaymentClick}
      disabled={disabled || isLoading}
      className={`mt-4 flex min-h-14 w-full items-center justify-center rounded-xl px-6 py-4 text-base font-semibold transition-all duration-200 ${
        disabled || isLoading
          ? "cursor-not-allowed bg-gray-200 text-gray-500 opacity-80"
          : "bg-orange-500 text-white shadow-md hover:bg-orange-600 hover:shadow-lg active:scale-[0.99]"
      }`}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-3">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-orange-200 border-t-orange-600" />
          <span>Preparing payment...</span>
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          <span>{isReadyToPay ? "Pay Now" : "Pay"}</span>
          <span aria-hidden="true">|</span>
          <span>Rs. {displayAmount?.toFixed(2) || "0.00"}</span>
        </span>
      )}
    </button>
  );
};

PaymentButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onPaymentInitiate: PropTypes.func.isRequired,
  cartTotal: PropTypes.number,
};

export default PaymentButton;
