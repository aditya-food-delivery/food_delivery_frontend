import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  updateItemQuantity,
  removeFromCart,
} from "../../cart/cartSlice";
import { selectCartItemByMenuId } from "../../cart/cartSelectors";
import { selectRestaurant } from "../restaurantDetailsSelectors";

const MenuItemCard = ({ item }) => {
  const dispatch = useDispatch();
  const restaurant = useSelector(selectRestaurant);
  const cartItem = useSelector(selectCartItemByMenuId(item.id));

  const isAvailable = item.active;
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        menuItemId: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        restaurantId: restaurant?.id,
        restaurantName: restaurant?.name,
      }),
    );
  };

  const handleIncreaseQuantity = () => {
    dispatch(updateItemQuantity({ menuItemId: item.id, quantity: quantity + 1 }));
  };

  const handleDecreaseQuantity = () => {
    if (quantity <= 1) {
      dispatch(removeFromCart(item.id));
      return;
    }

    dispatch(updateItemQuantity({ menuItemId: item.id, quantity: quantity - 1 }));
  };

  return (
    <article className="flex flex-col gap-5 rounded-[1.75rem] border border-slate-100 bg-white p-5 transition hover:border-orange-200 hover:shadow-[0_20px_50px_-40px_rgba(234,88,12,0.5)] sm:flex-row sm:items-start sm:justify-between">
      <div className="max-w-2xl">
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-bold ${
              item.vegFlag === "VEG"
                ? "border-emerald-600 text-emerald-600"
                : "border-rose-500 text-rose-500"
            }`}
          >
            {item.vegFlag === "VEG" ? "V" : "N"}
          </span>
          <h3 className="text-lg font-semibold text-slate-900">{item.name}</h3>
          {!item.active && (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
              Unavailable
            </span>
          )}
        </div>

        <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <span className="text-lg font-semibold text-slate-950">{"\u20B9"}{item.price}</span>
          {item.hasVariants && (
            <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
              {item.variants.length} size options
            </span>
          )}
          {item.hasAddons && (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              Add-ons available
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col items-start gap-3 sm:items-end">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-32 w-full rounded-[1.5rem] object-cover shadow-[0_16px_40px_-30px_rgba(15,23,42,0.5)] sm:w-40"
        />

        {quantity === 0 ? (
          <button
            onClick={handleAddToCart}
            disabled={!isAvailable}
            className={`min-w-28 rounded-full border px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] transition ${
              isAvailable
                ? "border-orange-500 bg-white text-orange-600 hover:bg-orange-50"
                : "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
            }`}
          >
            Add
          </button>
        ) : (
          <div className="flex items-center overflow-hidden rounded-full border border-orange-500 bg-white text-orange-600">
            <button
              onClick={handleDecreaseQuantity}
              className="px-4 py-2 text-lg font-semibold hover:bg-orange-50"
            >
              -
            </button>
            <span className="min-w-10 px-3 text-center text-sm font-semibold text-slate-700">
              {quantity}
            </span>
            <button
              onClick={handleIncreaseQuantity}
              className="px-4 py-2 text-lg font-semibold hover:bg-orange-50"
            >
              +
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

MenuItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number,
    vegFlag: PropTypes.string,
    active: PropTypes.bool,
    imageUrl: PropTypes.string,
    hasVariants: PropTypes.bool,
    hasAddons: PropTypes.bool,
    variants: PropTypes.array,
  }).isRequired,
};

export default MenuItemCard;
