const FALLBACK_RESTAURANT_IMAGE =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80";

const toNumberOrNull = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const buildPriceRange = (costForTwo) => {
  if (!costForTwo) return "\u20B9\u20B9";
  if (costForTwo <= 300) return "\u20B9";
  if (costForTwo <= 700) return "\u20B9\u20B9";
  if (costForTwo <= 1200) return "\u20B9\u20B9\u20B9";
  return "\u20B9\u20B9\u20B9\u20B9";
};

const resolveRestaurantImage = (restaurant) =>
  restaurant.coverImageUrl ||
  restaurant.imageUrl ||
  restaurant.menuItems?.find((item) => item.imageUrl)?.imageUrl ||
  FALLBACK_RESTAURANT_IMAGE;

const normalizeMenuItem = (item) => {
  const defaultVariant =
    item.variants?.find((variant) => variant.isDefault) || item.variants?.[0];

  return {
    ...item,
    price: toNumberOrNull(defaultVariant?.price) || 0,
    defaultVariantId: defaultVariant?.id || null,
    defaultVariantName: defaultVariant?.name || null,
    active: item.active !== false,
    vegFlag: item.vegFlag || "NON_VEG",
    imageUrl: item.imageUrl || FALLBACK_RESTAURANT_IMAGE,
  };
};

const normalizeCategory = (category) => ({
  ...category,
  items: (category.items || []).map(normalizeMenuItem),
});

export const normalizeRestaurantSummary = (restaurant) => ({
  ...restaurant,
  rating: toNumberOrNull(restaurant.rating),
  deliveryTime: toNumberOrNull(restaurant.deliveryTime),
  costForTwo: toNumberOrNull(restaurant.costForTwo),
  priceRange: restaurant.priceRange || buildPriceRange(restaurant.costForTwo),
  pureVeg: Boolean(restaurant.pureVeg),
  isOpen: Boolean(restaurant.isOpen),
  cuisines: restaurant.cuisines || [],
  coverImageUrl: resolveRestaurantImage(restaurant),
});

export const normalizeRestaurantDetails = (restaurant) => {
  const normalizedRestaurant = normalizeRestaurantSummary(restaurant);
  const categories = [...(restaurant.categories || [])]
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
    .map(normalizeCategory);

  return {
    restaurant: {
      ...normalizedRestaurant,
      address:
        restaurant.address ||
        [restaurant.locality, restaurant.city].filter(Boolean).join(", ") ||
        "Address unavailable",
    },
    categories,
  };
};
