import { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderStatusThunk } from "../features/order/orderThunks";
import { selectOrderStatus } from "../features/order/orderSelectors";
import FullPageSpinner from "../utils/FullPageSpinner";

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const orderStatus = useSelector(selectOrderStatus(orderId));

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderStatusThunk(orderId));
    }
  }, [orderId, dispatch]);

  if (!orderStatus) {
    return <FullPageSpinner />;
  }

  const paymentSuccess = location.state?.paymentSuccess;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        {paymentSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3">
              <svg
                className="w-6 h-6 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h2 className="text-lg font-bold text-green-900">
                  Payment Successful!
                </h2>
                <p className="text-green-700 text-sm">
                  Your order has been confirmed and is being prepared.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Order Details
          </h1>

          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-200">
            <div>
              <p className="text-gray-600 text-sm">Order ID</p>
              <p className="font-mono font-semibold text-gray-900">
                {orderId.substring(0, 8)}...
              </p>
            </div>

            <div>
              <p className="text-gray-600 text-sm">Order Status</p>
              <p className="font-semibold">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    orderStatus.status === "CONFIRMED"
                      ? "bg-green-100 text-green-800"
                      : orderStatus.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {orderStatus.status}
                </span>
              </p>
            </div>

            <div>
              <p className="text-gray-600 text-sm">Payment Status</p>
              <p className="font-semibold">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    orderStatus.paymentStatus === "CONFIRMED"
                      ? "bg-green-100 text-green-800"
                      : orderStatus.paymentStatus === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {orderStatus.paymentStatus}
                </span>
              </p>
            </div>

            <div>
              <p className="text-gray-600 text-sm">Payment ID</p>
              <p className="font-mono font-semibold text-gray-900">
                {orderStatus.paymentId?.substring(0, 8) || "N/A"}...
              </p>
            </div>
          </div>

          {orderStatus.failureReason && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
              <p className="text-red-800 text-sm">
                <strong>Failure Reason:</strong> {orderStatus.failureReason}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate("/")}
            className="py-3 px-4 bg-gray-200 text-gray-900 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/profile?tab=orders")}
            className="py-3 px-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
          >
            View All Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
