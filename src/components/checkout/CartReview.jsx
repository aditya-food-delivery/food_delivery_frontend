import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateItemQuantity,
} from "../../features/cart/cartSlice";

const CartReview = ({ items, total }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (menuItemId, quantity) => {
    dispatch(updateItemQuantity({ menuItemId, quantity }));
  };

  const handleRemoveItem = (menuItemId) => {
    dispatch(removeFromCart(menuItemId));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.menuItemId}
            className="flex items-center justify-between pb-3 border-b border-gray-200 last:border-b-0"
          >
            <div className="flex-1">
              <p className="font-medium text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-600">
                ₹{item.price.toFixed(2)} x {item.quantity}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Quantity Controls */}
              <button
                onClick={() =>
                  handleQuantityChange(item.menuItemId, item.quantity - 1)
                }
                className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-100 text-sm font-medium"
              >
                −
              </button>

              <span className="w-8 text-center font-medium">
                {item.quantity}
              </span>

              <button
                onClick={() =>
                  handleQuantityChange(item.menuItemId, item.quantity + 1)
                }
                className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-100 text-sm font-medium"
              >
                +
              </button>

              {/* Remove Button */}
              <button
                onClick={() => handleRemoveItem(item.menuItemId)}
                className="ml-2 text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Remove
              </button>
            </div>

            {/* Item Total */}
            <div className="text-right ml-4 min-w-20">
              <p className="font-semibold text-gray-900">
                ₹{(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Subtotal */}
      <div className="mt-4 pt-4 border-t border-gray-300">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Subtotal</span>
          <span className="font-semibold text-gray-900">
            ₹{total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

CartReview.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      menuItemId: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
        .isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  total: PropTypes.number.isRequired,
};

export default CartReview;
