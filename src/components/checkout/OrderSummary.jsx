import PropTypes from "prop-types";

const OrderSummary = ({
  subtotal,
  selectedAddress,
  taxes = 0,
  deliveryFee = 40,
}) => {
  const total = subtotal + taxes + deliveryFee;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Price Details</h3>

      <div className="space-y-3 pb-4 border-b border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-700">Subtotal</span>
          <span className="text-gray-900 font-medium">
            ₹{subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-700">Taxes & Fees</span>
          <span className="text-gray-900 font-medium">₹{taxes.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-700">Delivery Fee</span>
          <span className="text-gray-900 font-medium">
            ₹{deliveryFee.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="flex justify-between py-4">
        <span className="font-semibold text-gray-900">Total</span>
        <span className="text-xl font-bold text-orange-600">
          ₹{total.toFixed(2)}
        </span>
      </div>

      {/* Delivery Address Summary */}
      {selectedAddress && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs font-semibold text-blue-900">Delivery to:</p>
          <p className="text-sm text-blue-800 mt-1">
            {selectedAddress.type || "Home"}
          </p>
          <p className="text-xs text-blue-700 mt-1">
            {selectedAddress.street || selectedAddress.line1},{" "}
            {selectedAddress.city}
          </p>
        </div>
      )}
    </div>
  );
};

OrderSummary.propTypes = {
  subtotal: PropTypes.number.isRequired,
  selectedAddress: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    type: PropTypes.string,
    street: PropTypes.string,
    line1: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zipCode: PropTypes.string,
  }),
  taxes: PropTypes.number,
  deliveryFee: PropTypes.number,
};

OrderSummary.defaultProps = {
  selectedAddress: null,
  taxes: 0,
  deliveryFee: 40,
};

export default OrderSummary;
