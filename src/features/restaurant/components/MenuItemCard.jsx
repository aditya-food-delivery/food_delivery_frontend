import PropTypes from "prop-types";
import { useState } from "react";
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

  const isAvailable = item.available === "AVAILABLE";
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
    dispatch(
      updateItemQuantity({ menuItemId: item.id, quantity: quantity + 1 }),
    );
  };

  const handleDecreaseQuantity = () => {
    if (quantity <= 1) {
      dispatch(removeFromCart(item.id));
    } else {
      dispatch(
        updateItemQuantity({ menuItemId: item.id, quantity: quantity - 1 }),
      );
    }
  };

  return (
    <div className="flex justify-between border-b border-gray-100 pb-4">
      <div>
        <div className="flex items-center gap-2">
          <span
            className={`w-3 h-3 rounded-full ${
              item.vegFlag ? "bg-green-600" : "bg-red-500"
            }`}
          />
          <h3 className="text-sm font-medium">{item.name}</h3>
        </div>

        <p className="text-xs text-gray-500 mt-1">{item.description}</p>

        <p className="text-sm font-semibold mt-1">₹{item.price}</p>

        {!isAvailable && (
          <p className="text-xs text-red-500 mt-1">Not Available</p>
        )}
      </div>

      <div className="flex flex-col items-end">
        <div className="w-20 h-20 bg-gray-100 rounded-lg mb-2" />

        {/* Add/Remove Button */}
        {quantity === 0 ? (
          <button
            onClick={handleAddToCart}
            disabled={!isAvailable}
            className={`px-4 py-2 text-sm font-bold rounded-full border-2 transition-all whitespace-nowrap ${
              isAvailable
                ? "text-orange-500 border-orange-500 hover:bg-orange-50 cursor-pointer"
                : "text-gray-400 border-gray-300 cursor-not-allowed opacity-50"
            }`}
          >
            ADD
          </button>
        ) : (
          /* Quantity Selector - Zomato Style */
          <div className="flex items-center border border-orange-500 rounded-full overflow-hidden bg-white">
            <button
              onClick={handleDecreaseQuantity}
              className="px-2 py-1 text-orange-500 hover:bg-orange-50 font-bold"
            >
              −
            </button>
            <span className="px-3 py-1 text-sm font-semibold text-gray-700 min-w-8 text-center">
              {quantity}
            </span>
            <button
              onClick={handleIncreaseQuantity}
              className="px-2 py-1 text-orange-500 hover:bg-orange-50 font-bold"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

MenuItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number,
    vegFlag: PropTypes.bool,
    available: PropTypes.string,
  }).isRequired,
};

export default MenuItemCard;
