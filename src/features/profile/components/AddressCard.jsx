import PropTypes from "prop-types";

const formatAddressLine = (address) =>
  [address.line1, address.line2, address.city, address.state]
    .filter(Boolean)
    .join(", ");

const getAddressTone = (type) => {
  switch ((type || "").toLowerCase()) {
    case "work":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "other":
      return "bg-slate-50 text-slate-700 border-slate-200";
    default:
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
  }
};

const AddressCard = ({ addresses, onAddAddress }) => {
  const addressList = Array.isArray(addresses) ? addresses : [];

  return (
    <section className="flex-1 rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Saved Addresses</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage delivery locations for faster checkout.
          </p>
        </div>

        <button
          type="button"
          onClick={onAddAddress}
          className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          Add Address
        </button>
      </div>

      {addressList.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-12 text-center">
          <p className="text-lg font-semibold text-gray-800">
            No addresses saved yet
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Add your home or work address to speed up delivery.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {addressList.map((address) => (
            <article
              key={address.id}
              className={`rounded-2xl border p-5 shadow-sm transition hover:shadow-md ${
                address.defaultFlag
                  ? "border-orange-200 bg-orange-50/60"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getAddressTone(address.type)}`}
                  >
                    {address.type || "Home"}
                  </span>
                  {address.defaultFlag ? (
                    <span className="ml-2 inline-flex rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
                      Default
                    </span>
                  ) : null}
                </div>

                <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  {address.country || "India"}
                </span>
              </div>

              <p className="text-base font-semibold text-gray-900">
                {address.city || "Saved address"}
              </p>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {formatAddressLine(address)}
              </p>
              <p className="mt-3 text-sm text-gray-500">
                ZIP Code: {address.zipCode || "Not provided"}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

AddressCard.propTypes = {
  addresses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string,
      line1: PropTypes.string,
      line2: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      country: PropTypes.string,
      zipCode: PropTypes.string,
      defaultFlag: PropTypes.bool,
    }),
  ),
  onAddAddress: PropTypes.func,
};

AddressCard.defaultProps = {
  addresses: [],
  onAddAddress: () => {},
};

export default AddressCard;
