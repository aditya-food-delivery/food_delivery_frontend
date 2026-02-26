import PropTypes from "prop-types";
import MenuItemCard from "./MenuItemCard";

const CategorySection = ({ category }) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-3">{category.name}</h2>

      <div className="space-y-4">
        {category.items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

CategorySection.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
  }).isRequired,
};

export default CategorySection;
