const inspirations = [
  { name: "Pizza", image: "https://source.unsplash.com/100x100/?pizza" },
  { name: "Burger", image: "https://source.unsplash.com/100x100/?burger" },
  { name: "Biryani", image: "https://source.unsplash.com/100x100/?biryani" },
  { name: "Cake", image: "https://source.unsplash.com/100x100/?cake" },
];

const InspirationSection = () => {
  return (
    <div className="py-6">
      <h2 className="text-xl font-semibold mb-4">
        Inspiration for your first order
      </h2>

      <div className="flex gap-6 overflow-x-auto">
        {inspirations.map((item) => (
          <div
            key={item.name}
            className="flex flex-col items-center min-w-[80px]"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 rounded-full object-cover shadow-sm"
            />
            <span className="text-sm mt-2">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InspirationSection;
