import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserOrdersThunk } from "../../order/orderThunks";
import {
  selectUserOrders,
  selectUserOrdersError,
  selectUserOrdersPagination,
  selectUserOrdersStatus,
} from "../../order/orderSelectors";

const formatCurrency = (amount) => {
  const value = Number(amount ?? 0);
  return `Rs. ${value.toFixed(2)}`;
};

const formatDate = (value) => {
  if (!value) return "N/A";

  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getStatusClasses = (status) => {
  switch (status) {
    case "CONFIRMED":
    case "DELIVERED":
      return "bg-green-100 text-green-700";
    case "PENDING":
    case "CREATED":
      return "bg-amber-100 text-amber-700";
    case "FAILED":
    case "CANCELLED":
      return "bg-red-100 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
};

const OrdersSection = ({ userId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector(selectUserOrders);
  const status = useSelector(selectUserOrdersStatus);
  const error = useSelector(selectUserOrdersError);
  const pagination = useSelector(selectUserOrdersPagination);
  const [page, setPage] = useState(0);
  const size = 6;

  useEffect(() => {
    if (!userId) return;
    dispatch(getUserOrdersThunk({ userId, page, size }));
  }, [dispatch, page, size, userId]);

  const hasOrders = orders.length > 0;
  const canGoPrevious = page > 0;
  const canGoNext = page + 1 < Math.max(pagination.totalPages || 0, 1);

  return (
    <section className="flex-1 rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Orders</h2>
          <p className="mt-1 text-sm text-gray-500">
            Track and revisit every order placed by this user.
          </p>
        </div>

        <div className="rounded-full bg-orange-50 px-4 py-2 text-sm font-medium text-orange-600">
          {pagination.totalElements || 0} total orders
        </div>
      </div>

      {status === "loading" ? (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-12 text-center text-gray-500">
          Loading order history...
        </div>
      ) : null}

      {status === "failed" ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-5 text-sm text-red-700">
          {typeof error === "string"
            ? error
            : "Could not load order history right now."}
        </div>
      ) : null}

      {status !== "loading" && !hasOrders ? (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-12 text-center">
          <p className="text-lg font-semibold text-gray-800">
            No orders found yet
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Once this user places an order, it will appear here.
          </p>
        </div>
      ) : null}

      {hasOrders ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <article
              key={order.orderId}
              className="rounded-2xl border border-gray-200 p-5 transition hover:border-orange-200 hover:shadow-sm"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-base font-semibold text-gray-900">
                      Order #{String(order.orderId).slice(0, 8)}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(order.status)}`}
                    >
                      {order.status || "UNKNOWN"}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(order.paymentStatus)}`}
                    >
                      Payment {order.paymentStatus || "UNKNOWN"}
                    </span>
                  </div>

                  <div className="grid gap-2 text-sm text-gray-600 sm:grid-cols-2">
                    <p>Placed on {formatDate(order.createdAt)}</p>
                    <p>Total {formatCurrency(order.amount)}</p>
                    <p>Restaurant ID {String(order.restaurantId).slice(0, 8)}...</p>
                    <p>
                      Razorpay {order.razorpayOrderId ? "ready" : "not generated"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 px-4 py-3">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Items
                    </p>
                    <div className="space-y-2">
                      {order.items?.length ? (
                        order.items.map((item) => (
                          <div
                            key={`${order.orderId}-${item.menuItemId}`}
                            className="flex items-center justify-between gap-3 text-sm"
                          >
                            <span className="truncate text-gray-700">
                              {item.quantity} x {item.name}
                            </span>
                            <span className="shrink-0 font-medium text-gray-900">
                              {formatCurrency(item.price)}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">No items returned.</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => navigate(`/orders/${order.orderId}`)}
                    className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : null}

      {hasOrders ? (
        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={!canGoPrevious}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              canGoPrevious
                ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                : "cursor-not-allowed bg-gray-100 text-gray-400"
            }`}
          >
            Previous
          </button>

          <p className="text-sm text-gray-500">
            Page {page + 1} of {Math.max(pagination.totalPages || 1, 1)}
          </p>

          <button
            type="button"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={!canGoNext}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              canGoNext
                ? "bg-gray-900 text-white hover:bg-gray-800"
                : "cursor-not-allowed bg-gray-100 text-gray-400"
            }`}
          >
            Next
          </button>
        </div>
      ) : null}
    </section>
  );
};

OrdersSection.propTypes = {
  userId: PropTypes.string,
};

OrdersSection.defaultProps = {
  userId: "",
};

export default OrdersSection;
