import { GATEWAY_BASE_URL } from "../../api/serviceUrls";

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

const toAbsoluteImageUrl = (value) => {
  if (typeof value !== "string") return null;

  const trimmedValue = value.trim();
  if (!trimmedValue) return null;

  if (/^https?:\/\//i.test(trimmedValue)) {
    return trimmedValue;
  }

  if (trimmedValue.startsWith("//")) {
    return `https:${trimmedValue}`;
  }

  if (trimmedValue.startsWith("/")) {
    return `${GATEWAY_BASE_URL}${trimmedValue}`;
  }

  return trimmedValue;
};

const pickFirstImage = (...values) =>
  values.map(toAbsoluteImageUrl).find(Boolean) || null;

export const resolveRestaurantImage = (restaurant) =>
  pickFirstImage(
    restaurant.coverImageUrl,
    restaurant.cover_image_url,
    restaurant.cover_image,
    restaurant.coverPhotoUrl,
    restaurant.coverPhoto,
    restaurant.bannerImageUrl,
    restaurant.banner_url,
    restaurant.banner,
    restaurant.thumbnailUrl,
    restaurant.thumbnail,
    restaurant.logoUrl,
    restaurant.logo,
    restaurant.imageUrl,
    restaurant.image_url,
    restaurant.image,
    restaurant.photoUrl,
    restaurant.photo,
    restaurant.restaurantImageUrl,
    restaurant.restaurant_image_url,
    restaurant.restaurantImage,
    restaurant.media?.coverImageUrl,
    restaurant.media?.imageUrl,
    restaurant.media?.url,
    restaurant.images?.[0]?.url,
    restaurant.images?.[0],
    restaurant.menuItems?.find((item) => item.imageUrl || item.image)?.imageUrl ||
      restaurant.menuItems?.find((item) => item.imageUrl || item.image)?.image,
  );

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
    imageUrl:
      pickFirstImage(
        item.imageUrl,
        item.image_url,
        item.image,
        item.photoUrl,
        item.photo,
      ) || FALLBACK_RESTAURANT_IMAGE,
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
  coverImageUrl: resolveRestaurantImage(restaurant) || null,
});

export const normalizeRestaurantDetails = (restaurant) => {
  const normalizedRestaurant = normalizeRestaurantSummary(restaurant);
  const categories = [...(restaurant.categories || [])]
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
    .map(normalizeCategory);

  return {
    restaurant: {
      ...normalizedRestaurant,
      coverImageUrl:
        normalizedRestaurant.coverImageUrl || FALLBACK_RESTAURANT_IMAGE,
      address:
        restaurant.address ||
        [restaurant.locality, restaurant.city].filter(Boolean).join(", ") ||
        "Address unavailable",
    },
    categories,
  };
};
