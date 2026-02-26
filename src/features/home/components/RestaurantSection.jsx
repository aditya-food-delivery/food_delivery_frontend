import RestaurantCard from "./RestaurantCard";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
const RestaurantSection = ({ restaurants }) => {
  const { city } = useParams();
  const selectedCity = city || "Delhi";
  console.log(restaurants);
  return (
    <div className="pb-10">
      <h2 className="text-xl font-semibold mb-4">
        Best Food in {selectedCity}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

RestaurantSection.propTypes = {
  restaurants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      rating: PropTypes.number,
      deliveryTimeMinutes: PropTypes.number,
      costForTwo: PropTypes.number,
      priceRange: PropTypes.string,
      coverImageUrl: PropTypes.string,
      cuisines: PropTypes.arrayOf(PropTypes.string),
      pureVeg: PropTypes.bool,
    }),
  ).isRequired,
};

export default RestaurantSection;
