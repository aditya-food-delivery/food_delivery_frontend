import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import RatingBadge from "../../../components/common/RatingBadge";

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();
  const cuisines = restaurant.cuisines?.slice(0, 3) || [];
  const offerLabel =
    restaurant.deliveryTime && restaurant.deliveryTime <= 30
      ? "Fast delivery"
      : "Chef curated";

  return (
    <article
      onClick={() => navigate(`/restaurants/${restaurant.id}`)}
      className="group cursor-pointer overflow-hidden rounded-[2rem] border border-orange-100/80 bg-white shadow-[0_18px_50px_-35px_rgba(15,23,42,0.42)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_70px_-35px_rgba(234,88,12,0.42)]"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={restaurant.coverImageUrl}
          alt={restaurant.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-900/15 to-transparent" />

        <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-[#ef4f5f] px-3 py-1 text-xs font-semibold text-white shadow-lg">
              {offerLabel}
            </span>
            {restaurant.pureVeg ? (
              <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                Pure Veg
              </span>
            ) : null}
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold shadow-lg ${
                restaurant.isOpen
                  ? "bg-white text-emerald-700"
                  : "bg-slate-900/70 text-white"
              }`}
            >
              {restaurant.isOpen ? "Open now" : "Closed"}
            </span>
          </div>
          <RatingBadge rating={restaurant.rating} />
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 text-white">
          <div>
            <h3 className="font-serif text-2xl leading-tight">{restaurant.name}</h3>
            <p className="mt-1 text-sm text-white/80">
              {restaurant.locality}, {restaurant.city}
            </p>
          </div>
          <div className="rounded-2xl bg-white/15 px-3 py-2 text-right backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-white/75">Delivery</p>
            <p className="text-lg font-semibold">{restaurant.deliveryTime ?? "--"} min</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <p className="line-clamp-2 text-sm leading-6 text-slate-600">
            {restaurant.description || "Freshly prepared meals with fast doorstep delivery."}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {cuisines.length ? (
              cuisines.map((cuisine) => (
                <span
                  key={cuisine}
                  className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700"
                >
                  {cuisine}
                </span>
              ))
            ) : (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                Cuisine details coming soon
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-[linear-gradient(135deg,#fff7ed_0%,#ffffff_100%)] px-4 py-3 text-sm text-slate-600">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Budget</p>
            <p className="mt-1 font-semibold text-slate-900">Rs {restaurant.costForTwo} for two</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Price band</p>
            <p className="mt-1 font-semibold text-slate-900">{restaurant.priceRange}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-500">
            {restaurant.locality || "Popular nearby location"}
          </p>
          <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 transition group-hover:border-orange-300 group-hover:text-orange-600">
            View menu
          </span>
        </div>
      </div>
    </article>
  );
};

RestaurantCard.propTypes = {
  restaurant: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    city: PropTypes.string,
    locality: PropTypes.string,
    description: PropTypes.string,
    rating: PropTypes.number,
    deliveryTime: PropTypes.number,
    costForTwo: PropTypes.number,
    cuisines: PropTypes.arrayOf(PropTypes.string),
    coverImageUrl: PropTypes.string,
    priceRange: PropTypes.string,
    pureVeg: PropTypes.bool,
    isOpen: PropTypes.bool,
  }).isRequired,
};

export default RestaurantCard;
