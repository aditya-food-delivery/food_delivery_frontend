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
  if (error) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 text-center text-red-500">
        {error}
      </div>
    );
  }
  if (!restaurant) return null;

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffaf5_0%,#fff_25%,#fff7ed_100%)] pb-16 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RestaurantHeader restaurant={restaurant} />
        <RestaurantGallery image={restaurant.coverImageUrl} />
        <Tabs />

        <div className="mt-8 grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
          <CategorySidebar categories={categories} />
          <MenuContent categories={categories} />
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;
