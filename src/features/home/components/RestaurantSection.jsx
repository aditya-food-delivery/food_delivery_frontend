import PropTypes from "prop-types";
import RestaurantCard from "./RestaurantCard";

const RestaurantSection = ({ city, restaurants }) => {
  if (!restaurants.length) {
    return (
      <section className="rounded-[2rem] border border-orange-100 bg-white px-6 py-12 text-center shadow-[0_20px_60px_-40px_rgba(234,88,12,0.45)]">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
          Search Results
        </p>
        <h2 className="mt-3 font-serif text-3xl text-slate-900">
          No restaurants found in {city}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-500">
          Try another city from the URL or seed a few restaurants in the search service for this location.
        </p>
      </section>
    );
  }

  const openRestaurants = restaurants.filter((restaurant) => restaurant.isOpen).length;
  const featuredRestaurant = [...restaurants].sort(
    (a, b) => (b.rating ?? 0) - (a.rating ?? 0),
  )[0];

  return (
    <section className="pb-10">
      <div className="flex flex-col gap-2 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
            Delivery picks
          </p>
          <h2 className="mt-2 font-serif text-3xl text-slate-900 sm:text-4xl">
            Best restaurants around {city}
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-500">
          {openRestaurants} are delivering right now, and {featuredRestaurant?.name || "our featured spot"} is leading the pack with the strongest rating.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </section>
  );
};

RestaurantSection.propTypes = {
  city: PropTypes.string.isRequired,
  restaurants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      rating: PropTypes.number,
      deliveryTime: PropTypes.number,
      costForTwo: PropTypes.number,
      priceRange: PropTypes.string,
      coverImageUrl: PropTypes.string,
      cuisines: PropTypes.arrayOf(PropTypes.string),
      pureVeg: PropTypes.bool,
      isOpen: PropTypes.bool,
    }),
  ).isRequired,
};

export default RestaurantSection;
