const Tabs = () => {
  return (
    <div className="flex gap-6 border-b border-gray-200 mt-6">
      <button className="py-3 text-red-500 border-b-2 border-red-500 text-sm font-medium">
        Order Online
      </button>
      <button className="py-3 text-gray-500 text-sm font-medium">
        Reviews
      </button>
    </div>
  );
};

export default Tabs;
