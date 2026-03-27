import PropTypes from "prop-types";

const items = [
  {
    id: "basic",
    label: "Basic Info",
    hint: "Profile details",
  },
  {
    id: "address",
    label: "Address",
    hint: "Delivery locations",
  },
  {
    id: "orders",
    label: "Orders",
    hint: "Order history",
  },
];

const ProfileSidebar = ({ active, onChange }) => {
  return (
    <aside className="w-full rounded-2xl bg-white p-4 shadow-sm lg:w-72 lg:self-start">
      <div className="mb-4 border-b border-gray-100 px-2 pb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
          Profile Menu
        </p>
        <h2 className="mt-2 text-xl font-bold text-gray-900">Your account</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage personal info, addresses, and your orders.
        </p>
      </div>

      <ul className="space-y-2">
        {items.map((item) => {
          const isActive = active === item.id;

          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onChange(item.id)}
                className={`w-full rounded-2xl px-4 py-3 text-left transition ${
                  isActive
                    ? "bg-orange-500 text-white shadow-sm"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="block text-sm font-semibold">{item.label}</span>
                <span
                  className={`mt-1 block text-xs ${
                    isActive ? "text-orange-100" : "text-gray-500"
                  }`}
                >
                  {item.hint}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

ProfileSidebar.propTypes = {
  active: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ProfileSidebar;
