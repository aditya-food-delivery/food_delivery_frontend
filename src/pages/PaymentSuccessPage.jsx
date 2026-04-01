import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getOrderStatusThunk } from "../features/order/orderThunks";
import {
  selectCurrentOrder,
  selectOrderStatus,
  selectOrderStatusLoading,
} from "../features/order/orderSelectors";
import FullPageSpinner from "../utils/FullPageSpinner";

const formatCurrency = (amount) => {
  const value = Number(amount ?? 0);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
};

const formatTimestamp = (value) => {
  if (!value) {
    return "Just now";
  }

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return "Just now";
  }

  return parsedDate.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const formatBadgeClass = (status) => {
  if (status === "CONFIRMED") {
    return "bg-emerald-100 text-emerald-800";
  }

  if (status === "PENDING") {
    return "bg-amber-100 text-amber-800";
  }

  return "bg-slate-100 text-slate-700";
};

const PaymentSuccessPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const currentOrder = useSelector(selectCurrentOrder);
  const storedOrderStatus = useSelector(selectOrderStatus(orderId));
  const isLoading = useSelector(selectOrderStatusLoading(orderId));

  const paymentState = location.state || {};
  const orderFromState = paymentState.order;
  const paymentResponse = paymentState.paymentResponse;

  const fallbackOrder =
    orderFromState ||
    (currentOrder?.orderId === orderId ? currentOrder : null);

  const orderDetails = storedOrderStatus || fallbackOrder;
  const orderItems = orderDetails?.items || fallbackOrder?.items || [];
  const amount = orderDetails?.amount ?? fallbackOrder?.amount ?? 0;
  const paymentId =
    paymentResponse?.razorpay_payment_id ||
    orderDetails?.paymentId ||
    "Awaiting confirmation";
  const placedAt =
    orderDetails?.updatedAt || orderDetails?.createdAt || fallbackOrder?.createdAt;

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderStatusThunk(orderId));
    }
  }, [dispatch, orderId]);

  if (isLoading && !orderDetails) {
    return <FullPageSpinner />;
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] px-4 py-10">
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Payment received
          </h1>
          <p className="mt-3 text-slate-600">
            We could not load the full order summary yet, but your payment flow
            has completed.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate(`/orders/${orderId}`)}
              className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              View order details
            </button>
            <button
              type="button"
              onClick={() => navigate("/profile?tab=orders")}
              className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Go to my orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] px-4 py-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <section className="overflow-hidden rounded-[32px] border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-orange-50 shadow-sm">
          <div className="grid gap-8 px-6 py-8 md:grid-cols-[auto,1fr] md:px-10">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-200">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">
                Payment Successful
              </p>
              <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
                Your order is confirmed and already moving to the kitchen.
              </h1>
              <p className="max-w-2xl text-sm text-slate-600 md:text-base">
                We have saved your payment and order details. You can track this
                order anytime from your orders section.
              </p>
              <div className="flex flex-wrap gap-3 pt-2 text-sm">
                <span className="rounded-full bg-white px-4 py-2 font-medium text-slate-700 shadow-sm">
                  Order #{String(orderId).slice(0, 8)}
                </span>
                <span className="rounded-full bg-white px-4 py-2 font-medium text-slate-700 shadow-sm">
                  Paid at {formatTimestamp(placedAt)}
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.4fr,0.9fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Order summary</h2>
                <p className="text-sm text-slate-500">
                  Review the items and current order status.
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${formatBadgeClass(
                  orderDetails.paymentStatus,
                )}`}
              >
                Payment {orderDetails.paymentStatus || "CONFIRMED"}
              </span>
            </div>

            <div className="space-y-4 pt-5">
              {orderItems.length > 0 ? (
                orderItems.map((item, index) => (
                  <div
                    key={`${item.menuItemId || item.id || index}-${index}`}
                    className="flex items-start justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3"
                  >
                    <div>
                      <p className="font-semibold text-slate-900">
                        {item.name || "Ordered item"}
                      </p>
                      <p className="text-sm text-slate-500">
                        Qty {item.quantity || 1}
                      </p>
                    </div>
                    <p className="font-semibold text-slate-900">
                      {formatCurrency((item.price || 0) * (item.quantity || 1))}
                    </p>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl bg-slate-50 px-4 py-5 text-sm text-slate-500">
                  Item details are not available in the current response yet,
                  but the order has been created successfully.
                </div>
              )}
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">Payment details</h2>
              <div className="mt-5 space-y-4 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-500">Amount paid</span>
                  <span className="font-semibold text-slate-900">
                    {formatCurrency(amount)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-500">Payment ID</span>
                  <span className="max-w-[180px] truncate font-mono text-xs text-slate-900">
                    {paymentId}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-500">Order status</span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${formatBadgeClass(
                      orderDetails.status,
                    )}`}
                  >
                    {orderDetails.status || "CONFIRMED"}
                  </span>
                </div>
                {orderDetails.razorpayOrderId && (
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-slate-500">Gateway order ID</span>
                    <span className="max-w-[180px] truncate font-mono text-xs text-slate-900">
                      {orderDetails.razorpayOrderId}
                    </span>
                  </div>
                )}
              </div>
            </section>

            <section className="rounded-3xl border border-orange-100 bg-orange-50 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">What next?</h2>
              <p className="mt-2 text-sm text-slate-600">
                We will keep your latest order status updated as the restaurant
                accepts and prepares it.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => navigate(`/orders/${orderId}`)}
                  className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
                >
                  Track this order
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/profile?tab=orders")}
                  className="rounded-xl border border-orange-200 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-orange-100"
                >
                  View all orders
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="rounded-xl border border-transparent px-5 py-3 font-semibold text-slate-600 transition hover:bg-white"
                >
                  Continue shopping
                </button>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
