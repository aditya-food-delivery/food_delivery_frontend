import { useState } from "react";
import PropTypes from "prop-types";

const AddAddressModal = ({ onClose, onSave, isSaving }) => {
  const [form, setForm] = useState({
    type: "Home",
    line1: "",
    line2: "",
    city: "",
    state: "",
    country: "India",
    zipCode: "",
    defaultFlag: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-black/40 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-xl"
      >
        <h3 className="text-xl font-semibold mb-4">Add Address</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            name="type"
            value={form.type}
            onChange={handleChange}
            placeholder="Type (Home, Work)"
            className="border rounded-lg px-3 py-2"
          />
          <input
            name="zipCode"
            value={form.zipCode}
            onChange={handleChange}
            placeholder="Zip Code"
            required
            className="border rounded-lg px-3 py-2"
          />
          <input
            name="line1"
            value={form.line1}
            onChange={handleChange}
            placeholder="Address Line 1"
            required
            className="border rounded-lg px-3 py-2 md:col-span-2"
          />
          <input
            name="line2"
            value={form.line2}
            onChange={handleChange}
            placeholder="Address Line 2"
            className="border rounded-lg px-3 py-2 md:col-span-2"
          />
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
            required
            className="border rounded-lg px-3 py-2"
          />
          <input
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="State"
            required
            className="border rounded-lg px-3 py-2"
          />
          <input
            name="country"
            value={form.country}
            onChange={handleChange}
            placeholder="Country"
            required
            className="border rounded-lg px-3 py-2 md:col-span-2"
          />
        </div>

        <label className="flex items-center gap-2 mt-4 text-sm text-gray-700">
          <input
            type="checkbox"
            name="defaultFlag"
            checked={form.defaultFlag}
            onChange={handleChange}
          />
          Make this my default address
        </label>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="px-4 py-2 rounded-lg bg-red-500 text-white disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Save Address"}
          </button>
        </div>
      </form>
    </div>
  );
};

AddAddressModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
};

AddAddressModal.defaultProps = {
  isSaving: false,
};

export default AddAddressModal;
