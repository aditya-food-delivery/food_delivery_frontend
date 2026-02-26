import PropTypes from "prop-types";

const RestaurantGallery = ({ image }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      <img
        src={image}
        alt="Restaurant"
        className="col-span-2 h-56 w-full object-cover rounded-xl"
      />
      <div className="bg-gray-100 rounded-xl h-56 flex items-center justify-center text-gray-400">
        More Photos
      </div>
    </div>
  );
};

RestaurantGallery.propTypes = {
  image: PropTypes.string,
};

export default RestaurantGallery;
