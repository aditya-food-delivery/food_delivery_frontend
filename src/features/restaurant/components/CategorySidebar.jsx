import PropTypes from "prop-types";

const CategorySidebar = ({ categories }) => {
  const visibleCategories = categories.filter((cat) => cat.items?.length > 0);

  const scrollToCategory = (categoryId) => {
    document.getElementById(`category-${categoryId}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <aside className="top-24 h-fit rounded-[2rem] border border-orange-100 bg-white p-5 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.35)] lg:sticky">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-500">
        Menu Sections
      </p>
      <div className="mt-4 space-y-2">
        {visibleCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => scrollToCategory(category.id)}
            className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm text-slate-600 transition hover:bg-orange-50 hover:text-orange-600"
          >
            <span>{category.name}</span>
            <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-500">
              {category.items.length}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
};

CategorySidebar.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default CategorySidebar;
