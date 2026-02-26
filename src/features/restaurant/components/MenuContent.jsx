import PropTypes from "prop-types";
import CategorySection from "./CategorySection";

const MenuContent = ({ categories }) => {
  return (
    <div className="flex-1">
      {categories
        .filter((cat) => cat.items?.length > 0)
        .map((category) => (
          <CategorySection key={category.id} category={category} />
        ))}
    </div>
  );
};

MenuContent.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default MenuContent;
