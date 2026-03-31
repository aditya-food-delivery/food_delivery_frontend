import PropTypes from "prop-types";

const FiltersBar = ({
  city,
  restaurantCount,
  pureVegCount,
  openCount,
  topCuisines,
}) => {
  const chips = [
    `${restaurantCount} places in ${city}`,
    `${openCount} delivering now`,
    `${pureVegCount} pure veg`,
    ...topCuisines,
  ].filter(Boolean);

  return (
    <div className="sticky top-0 z-20 border-b border-orange-100/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto px-4 py-4 sm:px-6 lg:px-8">
        {chips.map((chip) => (
          <div
            key={chip}
            className="whitespace-nowrap rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700 shadow-sm shadow-orange-100/60"
          >
            {chip}
          </div>
        ))}
      </div>
    </div>
  );
};

FiltersBar.propTypes = {
  city: PropTypes.string.isRequired,
  restaurantCount: PropTypes.number.isRequired,
  pureVegCount: PropTypes.number.isRequired,
  openCount: PropTypes.number.isRequired,
  topCuisines: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default FiltersBar;
