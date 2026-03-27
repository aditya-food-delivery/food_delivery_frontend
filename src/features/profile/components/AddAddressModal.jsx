import { useState } from "react";
import PropTypes from "prop-types";

const inputClasses =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100";

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
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/45 p-4 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl"
      >
        <div className="bg-gradient-to-r from-orange-500 to-rose-500 px-6 py-6 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-orange-100">
                Delivery setup
              </p>
              <h3 className="mt-1 text-2xl font-bold">Add a new address</h3>
              <p className="mt-2 text-sm text-orange-50/90">
                Save your address details so checkout becomes faster next time.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold text-white transition hover:bg-white/25"
            >
              Close
            </button>
          </div>
        </div>

        <div className="grid gap-6 p-6">
          <div className="grid gap-4 md:grid-cols-3">
            {["Home", "Work", "Other"].map((option) => (
              <label
                key={option}
                className={`cursor-pointer rounded-2xl border px-4 py-4 text-sm font-semibold transition ${
                  form.type === option
                    ? "border-orange-500 bg-orange-50 text-orange-600"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  value={option}
                  checked={form.type === option}
                  onChange={handleChange}
                  className="sr-only"
                />
                {option}
              </label>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Address line 1
              </label>
              <input
                name="line1"
                value={form.line1}
                onChange={handleChange}
                placeholder="House number, street, area"
                required
                className={inputClasses}
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Address line 2
              </label>
              <input
                name="line2"
                value={form.line2}
                onChange={handleChange}
                placeholder="Apartment, suite, landmark"
                className={inputClasses}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Enter city"
                required
                className={inputClasses}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="Enter state"
                required
                className={inputClasses}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="Country"
                required
                className={inputClasses}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                ZIP code
              </label>
              <input
                name="zipCode"
                value={form.zipCode}
                onChange={handleChange}
                placeholder="Postal code"
                required
                className={inputClasses}
              />
            </div>
          </div>

          <label className="flex items-center gap-3 rounded-2xl border border-orange-100 bg-orange-50 px-4 py-4 text-sm text-gray-700">
            <input
              type="checkbox"
              name="defaultFlag"
              checked={form.defaultFlag}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-400"
            />
            <span>
              Make this my default delivery address
            </span>
          </label>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSaving ? "Saving..." : "Save Address"}
            </button>
          </div>
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
