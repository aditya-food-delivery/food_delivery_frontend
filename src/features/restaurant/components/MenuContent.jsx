import PropTypes from "prop-types";
import CategorySection from "./CategorySection";

const MenuContent = ({ categories }) => {
  const visibleCategories = categories.filter((cat) => cat.items?.length > 0);

  return (
    <div className="space-y-6">
      {visibleCategories.map((category) => (
        <CategorySection key={category.id} category={category} />
      ))}
    </div>
  );
};

MenuContent.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default MenuContent;
