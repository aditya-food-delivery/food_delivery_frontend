import PropTypes from "prop-types";

const RatingBadge = ({ rating }) => {
  return (
    <div className="rounded-md bg-green-600 px-2 py-1 text-xs font-semibold text-white">
      {rating} *
    </div>
  );
};

RatingBadge.propTypes = {
  rating: PropTypes.number,
};

export default RatingBadge;
