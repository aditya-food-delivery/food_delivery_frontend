import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddresses,
  addAddress,
} from "../../features/profile/profileThunks";
import { selectUserData } from "../../features/auth/authSelectors";
import {
  selectAddresses,
  selectDefaultAddress,
} from "../../features/profile/profileSelectors";

const AddressSelection = ({ selectedAddress, onSelectAddress }) => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const addressList = useSelector(selectAddresses);
  const defaultAddress = useSelector(selectDefaultAddress);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    type: "Home",
    landmarkOrInstructions: "",
  });

  useEffect(() => {
    if (userData?.id) {
      dispatch(fetchAddresses(userData.id));
    }
  }, [userData?.id, dispatch]);

  useEffect(() => {
    if (!selectedAddress && defaultAddress) {
      onSelectAddress(defaultAddress);
    }
  }, [defaultAddress, onSelectAddress, selectedAddress]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();

    if (!userData?.id) {
      alert("Please login to add an address.");
      return;
    }

    try {
      const resultAction = await dispatch(
        addAddress({ profileId: userData.id, input: formData }),
      );

      const newAddress = resultAction.payload || {
        id: Date.now().toString(),
        ...formData,
      };

      onSelectAddress(newAddress);
      setShowAddAddressForm(false);
      setFormData({
        street: "",
        city: "",
        state: "",
        zipCode: "",
        type: "Home",
        landmarkOrInstructions: "",
      });
    } catch (error) {
      console.error("Failed to add address", error);
      alert("Failed to add address. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Delivery Address</h2>

      {addressList && addressList.length > 0 ? (
        <div className="space-y-3">
          {addressList.map((address) => (
            <div
              key={address.id}
              onClick={() => onSelectAddress(address)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                selectedAddress?.id === address.id
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 hover:border-orange-300"
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="address"
                  checked={selectedAddress?.id === address.id}
                  onChange={() => onSelectAddress(address)}
                  className="mt-1 w-4 h-4 cursor-pointer"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {address.type || "Home"}
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    {address.street || address.line1}, {address.city},{" "}
                    {address.state} - {address.zipCode}
                  </p>
                  {address.landmarkOrInstructions && (
                    <p className="text-sm text-gray-600 mt-1">
                      {address.landmarkOrInstructions}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center py-4">No addresses saved</p>
      )}

      <button
        onClick={() => setShowAddAddressForm(!showAddAddressForm)}
        className="mt-4 w-full py-2 px-4 border-2 border-orange-500 text-orange-600 font-medium rounded-lg hover:bg-orange-50 transition-colors"
      >
        + Add New Address
      </button>

      {/* Add Address Modal */}
      {showAddAddressForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Add New Address
              </h3>

              <form onSubmit={handleAddressSubmit} className="space-y-4">
                {/* Type Selection */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Address Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option>Home</option>
                    <option>Work</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Street */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    placeholder="Enter street address"
                    required
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Enter city"
                    required
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* State & Zip Code */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Enter state"
                      required
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="Zip code"
                      required
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                {/* Landmark/Instructions */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    name="landmarkOrInstructions"
                    value={formData.landmarkOrInstructions}
                    onChange={handleInputChange}
                    placeholder="Nearby landmark or delivery instructions"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddAddressForm(false)}
                    className="flex-1 bg-gray-100 text-gray-900 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

AddressSelection.propTypes = {
  selectedAddress: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    type: PropTypes.string,
    street: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zipCode: PropTypes.string,
    landmarkOrInstructions: PropTypes.string,
  }),
  onSelectAddress: PropTypes.func.isRequired,
};

AddressSelection.defaultProps = {
  selectedAddress: null,
};

export default AddressSelection;
