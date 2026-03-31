import PropTypes from "prop-types";
import RatingBadge from "../../../components/common/RatingBadge";

const RestaurantHeader = ({ restaurant }) => {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-orange-100 bg-[radial-gradient(circle_at_top_left,#fff7ed_0%,#ffffff_45%,#fff1f2_100%)] px-6 py-8 shadow-[0_30px_70px_-45px_rgba(15,23,42,0.35)] sm:px-8 lg:px-10 lg:py-10">
      <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-orange-200/30 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-rose-200/30 blur-3xl" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            {restaurant.pureVeg && (
              <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                Pure Veg
              </span>
            )}
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
                restaurant.isOpen
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-slate-200 text-slate-700"
              }`}
            >
              {restaurant.isOpen ? "Open Now" : "Currently Closed"}
            </span>
          </div>

          <h1 className="mt-4 font-serif text-4xl leading-tight text-slate-950 sm:text-5xl">
            {restaurant.name}
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            {restaurant.description}
          </p>

          <p className="mt-4 text-sm font-medium text-slate-500">
            {restaurant.address}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {restaurant.cuisines?.map((cuisine) => (
              <span
                key={cuisine}
                className="rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
              >
                {cuisine}
              </span>
            ))}
          </div>
        </div>

        <div className="relative flex min-w-[260px] flex-col gap-4 rounded-[1.75rem] bg-slate-950 px-5 py-5 text-white shadow-xl shadow-slate-900/20">
          <div className="flex items-center justify-between">
            <p className="text-sm uppercase tracking-[0.25em] text-white/60">
              Search score
            </p>
            <RatingBadge rating={restaurant.rating} />
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl bg-white/10 px-3 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-white/55">ETA</p>
              <p className="mt-2 text-xl font-semibold">{restaurant.deliveryTime ?? "--"}m</p>
            </div>
            <div className="rounded-2xl bg-white/10 px-3 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-white/55">For two</p>
              <p className="mt-2 text-xl font-semibold">{"\u20B9"}{restaurant.costForTwo}</p>
            </div>
            <div className="rounded-2xl bg-white/10 px-3 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-white/55">Budget</p>
              <p className="mt-2 text-xl font-semibold">{restaurant.priceRange}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

RestaurantHeader.propTypes = {
  restaurant: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    address: PropTypes.string,
    deliveryTime: PropTypes.number,
    costForTwo: PropTypes.number,
    priceRange: PropTypes.string,
    cuisines: PropTypes.arrayOf(PropTypes.string),
    rating: PropTypes.number,
    pureVeg: PropTypes.bool,
    isOpen: PropTypes.bool,
  }).isRequired,
};

export default RestaurantHeader;
