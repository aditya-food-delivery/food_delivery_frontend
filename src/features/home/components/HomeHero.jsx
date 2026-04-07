import PropTypes from "prop-types";

const LightningIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m13 2-7 11h5l-1 9 8-12h-5l0-8Z"
    />
  </svg>
);

const SparkIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m12 3 1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m18 15 .9 2.1L21 18l-2.1.9L18 21l-.9-2.1L15 18l2.1-.9L18 15Z"
    />
  </svg>
);

const ClockIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="8" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 2" />
  </svg>
);

const HomeHero = ({
  city,
  restaurantCount,
  openCount,
  avgRating,
  fastestDelivery,
  topCuisines,
  highlights,
}) => {
  const spotlightItems = [
    {
      label: "Open right now",
      value: openCount,
      suffix: "spots",
      icon: <LightningIcon />,
      tone: "from-amber-500/20 via-amber-500/10 to-transparent text-amber-100",
    },
    {
      label: "Average rating",
      value: avgRating ? avgRating.toFixed(1) : "New",
      suffix: avgRating ? "/5" : "",
      icon: <SparkIcon />,
      tone: "from-emerald-500/20 via-emerald-500/10 to-transparent text-emerald-100",
    },
    {
      label: "Fastest delivery",
      value: fastestDelivery ? fastestDelivery : "--",
      suffix: "mins",
      icon: <ClockIcon />,
      tone: "from-sky-500/20 via-sky-500/10 to-transparent text-sky-100",
    },
  ];

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] bg-[#1b1120] px-6 py-8 text-white shadow-[0_35px_120px_-45px_rgba(88,28,135,0.55)] sm:px-8 sm:py-10 lg:px-12 lg:py-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(251,146,60,0.34),_transparent_34%),radial-gradient(circle_at_80%_20%,_rgba(236,72,153,0.24),_transparent_28%),linear-gradient(135deg,_#1b1120_0%,_#2d1a38_55%,_#0f172a_100%)]" />
      <div className="absolute -right-12 top-10 h-40 w-40 rounded-full bg-orange-400/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-52 w-52 rounded-full bg-fuchsia-500/15 blur-3xl" />

      <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_420px] lg:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-orange-100/90">
            Curated around {city}
          </div>

          <h1 className="mt-6 max-w-3xl font-['Poppins'] text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            Bring a restaurant street to your sofa tonight.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/72 sm:text-lg">
            Discover standout kitchens, fast-delivery favourites, and comfort-food cravings
            in one refined feed designed for your next order.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {topCuisines.map((cuisine) => (
              <span
                key={cuisine}
                className="rounded-full border border-white/12 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm"
              >
                {cuisine}
              </span>
            ))}
            {!topCuisines.length ? (
              <span className="rounded-full border border-white/12 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm">
                Chef specials
              </span>
            ) : null}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {spotlightItems.map((item) => (
              <div
                key={item.label}
                className={`rounded-[1.75rem] border border-white/12 bg-gradient-to-br ${item.tone} p-4 backdrop-blur-sm`}
              >
                <div className="mb-6 inline-flex rounded-2xl bg-white/10 p-3 text-white">
                  {item.icon}
                </div>
                <p className="text-sm text-white/70">{item.label}</p>
                <p className="mt-2 text-3xl font-semibold text-white">
                  {item.value}
                  <span className="ml-1 text-sm font-medium text-white/65">{item.suffix}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="rounded-[2rem] border border-white/12 bg-white/10 p-5 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-100/80">
                  Tonight&apos;s line-up
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  {restaurantCount} places ready for discovery
                </h2>
              </div>
              <div className="rounded-full bg-emerald-400/15 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">
                Live feed
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {highlights.map((restaurant, index) => (
                <div
                  key={restaurant.id}
                  className="flex items-center gap-4 rounded-[1.5rem] border border-white/10 bg-slate-950/20 px-4 py-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-lg font-semibold text-white/90">
                    0{index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-base font-semibold text-white">{restaurant.name}</p>
                    <p className="truncate text-sm text-white/60">
                      {restaurant.cuisines?.slice(0, 2).join(" / ") || "Popular comfort food"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">
                      {restaurant.deliveryTime ?? "--"} min
                    </p>
                    <p className="text-xs text-white/60">
                      {restaurant.rating ? `${restaurant.rating.toFixed(1)} rating` : "Fresh pick"}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-5 text-sm leading-6 text-white/65">
              Balanced between quick delivery, strong ratings, and crowd-pleasing cuisines.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

HomeHero.propTypes = {
  city: PropTypes.string.isRequired,
  restaurantCount: PropTypes.number.isRequired,
  openCount: PropTypes.number.isRequired,
  avgRating: PropTypes.number,
  fastestDelivery: PropTypes.number,
  topCuisines: PropTypes.arrayOf(PropTypes.string).isRequired,
  highlights: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      cuisines: PropTypes.arrayOf(PropTypes.string),
      rating: PropTypes.number,
      deliveryTime: PropTypes.number,
    }),
  ).isRequired,
};

export default HomeHero;
