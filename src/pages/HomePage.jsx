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

    return {
      pureVegCount,
      openCount,
      topCuisines,
    };
  }, [restaurants]);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffaf5_0%,#fff_30%,#fff7ed_100%)] text-slate-900">
      <FiltersBar
        city={selectedCity}
        restaurantCount={restaurants.length}
        pureVegCount={stats.pureVegCount}
        openCount={stats.openCount}
        topCuisines={stats.topCuisines}
      />

      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <InspirationSection />

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
