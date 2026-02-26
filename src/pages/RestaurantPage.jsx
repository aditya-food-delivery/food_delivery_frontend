import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchRestaurantDetails } from "../features/restaurant/restaurantThunks";
import {
  selectRestaurant,
  selectCategories,
  selectRestaurantDetailsLoading,
  selectRestaurantDetailsError,
} from "../features/restaurant/restaurantDetailsSelectors";

import RestaurantHeader from "../features/restaurant/components/RestaurantHeader";
import RestaurantGallery from "../features/restaurant/components/RestaurantGallery";
import Tabs from "../features/restaurant/components/Tabs";
import CategorySidebar from "../features/restaurant/components/CategorySidebar";
import MenuContent from "../features/restaurant/components/MenuContent";
import ShimmerLoader from "../components/common/ShimmerLoader";

const RestaurantPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const restaurant = useSelector(selectRestaurant);
  const categories = useSelector(selectCategories);
  const loading = useSelector(selectRestaurantDetailsLoading);
  const error = useSelector(selectRestaurantDetailsError);

  useEffect(() => {
    dispatch(fetchRestaurantDetails(id));
  }, [dispatch, id]);

  if (loading) return <ShimmerLoader type="grid" />;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!restaurant) return null;

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <RestaurantHeader restaurant={restaurant} />
        <RestaurantGallery image={restaurant.coverImageUrl} />

        <Tabs />

        <div className="flex gap-8 mt-6">
          <CategorySidebar categories={categories} />
          <MenuContent categories={categories} />
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;

