import PropTypes from "prop-types";

const MenuItemCard = ({ item }) => {
  const isAvailable = item.available === "AVAILABLE";

  return (
    <div className="flex justify-between border-b border-gray-100 pb-4">
      <div>
        <div className="flex items-center gap-2">
          <span
            className={`w-3 h-3 rounded-full ${
              item.vegFlag ? "bg-green-600" : "bg-red-500"
            }`}
          />
          <h3 className="text-sm font-medium">{item.name}</h3>
        </div>

        <p className="text-xs text-gray-500 mt-1">{item.description}</p>

        <p className="text-sm font-semibold mt-1">₹{item.price}</p>

        {!isAvailable && (
          <p className="text-xs text-red-500 mt-1">Not Available</p>
        )}
      </div>

      <div className="flex flex-col items-end">
        <div className="w-20 h-20 bg-gray-100 rounded-lg mb-2" />

        <button
          disabled={!isAvailable}
          className={`px-3 py-1 text-xs rounded-full border ${
            isAvailable
              ? "text-red-500 border-red-500 hover:bg-red-50"
              : "text-gray-400 border-gray-200 cursor-not-allowed"
          }`}
        >
          ADD
        </button>
      </div>
    </div>
  );
};

MenuItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number,
    vegFlag: PropTypes.bool,
    available: PropTypes.string,
  }).isRequired,
};

export default MenuItemCard;
