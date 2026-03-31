import PropTypes from "prop-types";
import MenuItemCard from "./MenuItemCard";

const CategorySection = ({ category }) => {
  return (
    <section
      id={`category-${category.id}`}
      className="rounded-[2rem] border border-orange-100 bg-white p-6 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.35)]"
    >
      <div className="mb-5 flex items-end justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-500">
            Category
          </p>
          <h2 className="mt-2 font-serif text-3xl text-slate-950">{category.name}</h2>
        </div>
        <span className="rounded-full bg-orange-50 px-3 py-2 text-xs font-semibold text-orange-600">
          {category.items.length} items
        </span>
      </div>

      <div className="space-y-5">
        {category.items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
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
