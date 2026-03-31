const Tabs = () => {
  return (
    <div className="mt-8 flex gap-6 border-b border-orange-100">
      <button className="border-b-2 border-orange-500 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
        Order Online
      </button>
      <button className="py-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
        Menu Highlights
      </button>
    </div>
  );
};

export default Tabs;
