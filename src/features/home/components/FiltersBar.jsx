const FiltersBar = () => {
  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex gap-3 overflow-x-auto">
        <button className="px-4 py-2 border rounded-full text-sm hover:bg-gray-50">
          Filters
        </button>

        <button className="px-4 py-2 border rounded-full text-sm hover:bg-gray-50">
          Pure Veg
        </button>

        <button className="px-4 py-2 border rounded-full text-sm hover:bg-gray-50">
          Cuisines
        </button>

        <button className="px-4 py-2 border rounded-full text-sm hover:bg-gray-50">
          Rating: 4.0+
        </button>
      </div>
    </div>
  );
};

export default FiltersBar;
