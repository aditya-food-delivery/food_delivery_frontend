import PropTypes from "prop-types";

const AddressCard = ({ addresses, onAddAddress }) => {
  const addressList = addresses?.getAddressesByProfileId ?? [];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Addresses</h3>
        <button
          type="button"
          onClick={onAddAddress}
          className="text-sm px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50"
        >
          + Add Address
        </button>
      </div>

      {addressList.length === 0 ? (
        <p className="text-gray-500 text-sm">No addresses added yet.</p>
      ) : (
        addressList.map((address) => (
          <div
            key={address.id}
            className={`border rounded-lg p-4 mb-4
              ${address.defaultFlag ? "border-blue-500 bg-blue-50" : ""}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium">{address.type || "Address"}</span>
              {address.defaultFlag && (
                <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded">
                  DEFAULT
                </span>
              )}
            </div>

            <p className="text-sm text-gray-700">
              {address.line1}, {address.city}, {address.state}
            </p>
            <p className="text-sm text-gray-500">
              {address.country} - {address.zipCode}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

/* 🔐 Props Validation */
AddressCard.propTypes = {
  addresses: PropTypes.shape({
    getAddressesByProfileId: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        type: PropTypes.string,
        line1: PropTypes.string,
        city: PropTypes.string,
        state: PropTypes.string,
        country: PropTypes.string,
        zipCode: PropTypes.string,
        defaultFlag: PropTypes.bool,
      }),
    ),
  }).isRequired,
  onAddAddress: PropTypes.func,
};

AddressCard.defaultProps = {
  onAddAddress: () => {},
};

export default AddressCard;
