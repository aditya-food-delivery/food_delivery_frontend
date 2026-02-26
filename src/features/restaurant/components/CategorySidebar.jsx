import PropTypes from "prop-types";

const CategorySidebar = ({ categories }) => {
  return (
    <div className="w-56 sticky top-24 h-fit border-r border-gray-100">
      {categories
        .filter((cat) => cat.items?.length > 0)
        .map((category) => (
          <div
            key={category.id}
            className="py-2 text-sm text-gray-600 hover:text-red-500 cursor-pointer"
          >
            {category.name}
          </div>
        ))}
    </div>
  );
};

CategorySidebar.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default CategorySidebar;
