import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchRestaurants } from "../features/restaurant/restaurantThunks";
import {
  selectAllRestaurants,
  selectRestaurantsLoading,
  selectRestaurantsError,
} from "../features/restaurant/restaurantSelectors";

import FiltersBar from "../features/home/components/FiltersBar";
import HomeHero from "../features/home/components/HomeHero";
import InspirationSection from "../features/home/components/InspirationSection";
import RestaurantSection from "../features/home/components/RestaurantSection";
import ShimmerLoader from "../components/common/ShimmerLoader";

const HomePage = () => {
  const dispatch = useDispatch();
  const { city } = useParams();
  const [selectedCity, setSelectedCity] = useState("");

  const restaurants = useSelector(selectAllRestaurants);
  const loading = useSelector(selectRestaurantsLoading);
  const error = useSelector(selectRestaurantsError);

  useEffect(() => {
    setSelectedCity(city || "Delhi");
  }, [city]);

  useEffect(() => {
    if (!selectedCity) return;
    dispatch(fetchRestaurants({ city: selectedCity }));
  }, [dispatch, selectedCity]);

  const stats = useMemo(() => {
    const pureVegCount = restaurants.filter((restaurant) => restaurant.pureVeg).length;
    const openCount = restaurants.filter((restaurant) => restaurant.isOpen).length;
    const ratings = restaurants
      .map((restaurant) => restaurant.rating)
      .filter((rating) => typeof rating === "number");
    const cuisineCounts = restaurants.reduce((acc, restaurant) => {
      restaurant.cuisines.forEach((cuisine) => {
        acc[cuisine] = (acc[cuisine] || 0) + 1;
      });
      return acc;
    }, {});

    const topCuisines = Object.entries(cuisineCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([cuisine]) => cuisine);

    const avgRating = ratings.length
      ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
      : null;

    const fastestDelivery = restaurants.reduce((fastest, restaurant) => {
      if (!restaurant.deliveryTime) return fastest;
      if (!fastest) return restaurant.deliveryTime;
      return Math.min(fastest, restaurant.deliveryTime);
    }, null);

    const highlights = [...restaurants]
      .sort((a, b) => {
        const ratingDiff = (b.rating ?? 0) - (a.rating ?? 0);
        if (ratingDiff !== 0) return ratingDiff;

        return (
          (a.deliveryTime ?? Number.MAX_SAFE_INTEGER) -
          (b.deliveryTime ?? Number.MAX_SAFE_INTEGER)
        );
      })
      .slice(0, 3);

    return {
      pureVegCount,
      openCount,
      topCuisines,
      avgRating,
      fastestDelivery,
      highlights,
    };
  }, [restaurants]);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff8f1_0%,#fffefb_28%,#fff3e6_100%)] text-slate-900">
      <FiltersBar
        city={selectedCity}
        restaurantCount={restaurants.length}
        pureVegCount={stats.pureVegCount}
        openCount={stats.openCount}
        topCuisines={stats.topCuisines}
      />

      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="pt-6">
          <HomeHero
            city={selectedCity}
            restaurantCount={restaurants.length}
            openCount={stats.openCount}
            avgRating={stats.avgRating}
            fastestDelivery={stats.fastestDelivery}
            topCuisines={stats.topCuisines}
            highlights={stats.highlights}
          />
        </div>

        <InspirationSection topCuisines={stats.topCuisines} />

        {loading ? (
          <ShimmerLoader type="grid" />
        ) : error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-6 py-10 text-center text-red-600">
            {error}
          </div>
        ) : (
          <RestaurantSection city={selectedCity} restaurants={restaurants} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
