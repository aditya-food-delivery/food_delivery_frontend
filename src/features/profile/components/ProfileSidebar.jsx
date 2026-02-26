// components/profile/ProfileSidebar.jsx
import PropTypes from "prop-types";
const ProfileSidebar = ({ active, onChange }) => {
  const items = [
    { id: "basic", label: "Basic Info" },
    { id: "address", label: "Address" },
    { id: "Order", label: "Order" },
    { id: "History", label: "History" },
  ];

  return (
    <aside className="w-full lg:w-64 bg-white rounded-xl shadow-sm">
      <ul className="p-3 space-y-1">
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => onChange(item.id)}
            className={`cursor-pointer px-4 py-2 rounded-lg text-sm
              ${
                active === item.id
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </aside>
  );
};
ProfileSidebar.propTypes = {
  /** Currently active tab id */
  active: PropTypes.string.isRequired,

  /** Callback fired when a tab is clicked */
  onChange: PropTypes.func.isRequired,
};
export default ProfileSidebar;
