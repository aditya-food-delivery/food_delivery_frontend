import PropTypes from "prop-types";

const RatingBadge = ({ rating }) => {
  return (
    <div className="bg-green-600 text-white text-xs px-2 py-1 rounded-md font-semibold">
      {rating} ★
    </div>
  );
};

RatingBadge.propTypes = {
  rating: PropTypes.number,
};

export default RatingBadge;
