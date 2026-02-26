import PropTypes from "prop-types";
import RatingBadge from "../../../components/common/RatingBadge";

const RestaurantHeader = ({ restaurant }) => {
  return (
    <div className="py-6 border-b border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold">{restaurant.name}</h1>

          <p className="text-gray-500 text-sm mt-1">{restaurant.description}</p>

          <p className="text-gray-400 text-sm mt-1">
            {restaurant.locality}, {restaurant.city}
          </p>

          <div className="flex gap-4 text-sm text-gray-500 mt-2">
            <span>{restaurant.deliveryTimeMinutes} min</span>
            <span>₹{restaurant.costForTwo} for two</span>
            <span>{restaurant.priceRange}</span>
          </div>

          <div className="flex gap-2 mt-2">
            {restaurant.cuisines?.map((cuisine) => (
              <span
                key={cuisine}
                className="text-xs bg-gray-100 px-2 py-1 rounded-full"
              >
                {cuisine}
              </span>
            ))}
          </div>
        </div>

        <RatingBadge rating={restaurant.rating} />
      </div>
    </div>
  );
};

RestaurantHeader.propTypes = {
  restaurant: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    locality: PropTypes.string,
    city: PropTypes.string,
    deliveryTimeMinutes: PropTypes.number,
    costForTwo: PropTypes.number,
    priceRange: PropTypes.string,
    cuisines: PropTypes.arrayOf(PropTypes.string),
    rating: PropTypes.number,
  }).isRequired,
};

export default RestaurantHeader;

