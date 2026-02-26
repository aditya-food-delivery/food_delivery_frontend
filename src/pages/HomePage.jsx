import { useEffect } from "react";
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
import { useState } from "react";
const HomePage = () => {
  const dispatch = useDispatch();
  const { city } = useParams();

  const [selectedCity, setSelectedCity] = useState("");

  const restaurants = useSelector(selectAllRestaurants);
  const loading = useSelector(selectRestaurantsLoading);
  const error = useSelector(selectRestaurantsError);

  // ✅ Sync city from URL
  useEffect(() => {
    if (city) {
      setSelectedCity(city);
    } else {
      setSelectedCity("Delhi"); // optional default
    }
  }, [city]);

  // ✅ Refetch when selectedCity changes
  useEffect(() => {
    if (!selectedCity) return;

    dispatch(
      fetchRestaurants({
        city: selectedCity,
        page: 0,
        size: 20,
      }),
    );
  }, [dispatch, selectedCity]); // 🔥 FIXED

  return (
    <div className="bg-white min-h-screen">
      <FiltersBar />

      <div className="max-w-6xl mx-auto px-4">
        <InspirationSection />

        {loading ? (
          <ShimmerLoader type="grid" />
        ) : error ? (
          <div className="text-center py-10 text-red-500">{error}</div>
        ) : (
          <RestaurantSection restaurants={restaurants} />
        )}
      </div>
    </div>
  );
};

export default HomePage;


