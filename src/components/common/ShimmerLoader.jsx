import PropTypes from "prop-types";
const ShimmerLoader = ({ type }) => {
  if (type === "grid") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-100 h-48 rounded-xl" />
        ))}
      </div>
    );
  }

  return null;
};
ShimmerLoader.propTypes = {
  type: PropTypes.oneOf(["grid"]),
};

export default ShimmerLoader;
