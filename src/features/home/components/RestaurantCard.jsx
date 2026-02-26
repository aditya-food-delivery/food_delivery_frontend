import { useNavigate } from "react-router-dom";
import RatingBadge from "../../../components/common/RatingBadge";
import PropTypes from "prop-types";
const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/restaurants/${restaurant.id}`)}
      className="cursor-pointer rounded-xl overflow-hidden hover:shadow-md transition bg-white"
    >
      <img
        src={restaurant.coverImageUrl}
        alt={restaurant.name}
        className="w-full h-40 object-cover"
      />

      <div className="p-3">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-sm">{restaurant.name}</h3>
          <RatingBadge rating={restaurant.rating} />
        </div>

        <p className="text-xs text-gray-500 truncate">
          {restaurant.cuisines?.join(", ")}
        </p>

        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>{restaurant.deliveryTimeMinutes} min</span>
          <span>₹{restaurant.costForTwo} for two</span>
        </div>
      </div>
    </div>
  );
};

RestaurantCard.propTypes = {
  restaurant: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    rating: PropTypes.number,
    deliveryTimeMinutes: PropTypes.number,
    costForTwo: PropTypes.number,
    cuisines: PropTypes.arrayOf(PropTypes.string),
    coverImageUrl: PropTypes.string,
  }).isRequired,
};

export default RestaurantCard;

