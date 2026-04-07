import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { assets } from "../assets/assets";
import { useAuth } from "../hooks/useAuth";
import { selectCartItemCount } from "../features/cart/cartSelectors";
import {
  selectAddresses,
  selectProfile,
} from "../features/profile/profileSelectors";
import {
  fetchAddresses,
  fetchUserProfile,
} from "../features/profile/profileThunks";

const formatLocationLine = (address) => {
  if (!address) return "Add your saved address";

  return [address.line1, address.city, address.state]
    .filter(Boolean)
    .join(", ");
};

const getAddressTitle = (address) => {
  if (!address) return "Select location";
  return address.type || address.city || "Saved address";
};

const LocationPinIcon = ({ className = "h-4 w-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className={className}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21s6-5.25 6-11a6 6 0 1 0-12 0c0 5.75 6 11 6 11Z"
    />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const TargetIcon = ({ className = "h-4 w-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
    <path strokeLinecap="round" d="M12 3v3M12 18v3M3 12h3M18 12h3" />
  </svg>
);

const PlusIcon = ({ className = "h-4 w-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className={className}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
  </svg>
);

const HomeIcon = ({ className = "h-4 w-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className={className}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 10.5 12 4l8 6.5V20H4v-9.5Z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20v-5h6v5" />
  </svg>
);

const BriefcaseIcon = ({ className = "h-4 w-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className={className}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 8h16v10H4zM9 8V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"
    />
    <path strokeLinecap="round" d="M4 12h16" />
  </svg>
);

const ClockIcon = ({ className = "h-4 w-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="8" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 2" />
  </svg>
);

const SearchIcon = ({ className = "h-4 w-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className={className}
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m20 20-4.35-4.35" />
  </svg>
);

const QUICK_CITIES = [
  "Delhi",
  "Mumbai",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Bareilly",
];

const RESERVED_TOP_LEVEL_ROUTES = new Set([
  "restaurants",
  "cart",
  "checkout",
  "profile",
  "oauth",
  "orders",
]);

const normalizeCityName = (value) => {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ");
};

const getCityFromPath = (pathname) => {
  const [segment] = pathname.split("/").filter(Boolean);
  if (!segment || RESERVED_TOP_LEVEL_ROUTES.has(segment)) return "";

  try {
    return normalizeCityName(decodeURIComponent(segment));
  } catch {
    return normalizeCityName(segment);
  }
};

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, openAuthModal, logout } = useAuth();
  const cartItemCount = useSelector(selectCartItemCount);
  const profile = useSelector(selectProfile);
  const addresses = useSelector(selectAddresses);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const menuRef = useRef(null);
  const locationRef = useRef(null);

  const { isAuthenticated, user } = auth;
  const addressList = Array.isArray(addresses) ? addresses : [];
  const selectedAddress =
    addressList.find((address) => address.defaultFlag) || addressList[0] || null;
  const savedAddresses = addressList.slice(0, 2);
  const recentAddresses = addressList
    .filter((address) => address.id !== selectedAddress?.id)
    .slice(0, 2);
  const routeCity = getCityFromPath(location.pathname);
  const currentLocation =
    routeCity || selectedAddress?.city || profile?.city || "Delhi";
  const currentLocationLine =
    routeCity && routeCity !== selectedAddress?.city
      ? `Showing restaurants in ${routeCity}`
      : formatLocationLine(selectedAddress) || "Add your saved address";
  const cityOptions = Array.from(
    new Set(
      [
        routeCity,
        selectedAddress?.city,
        profile?.city,
        ...addressList.map((address) => address.city),
        ...QUICK_CITIES,
      ]
        .map(normalizeCityName)
        .filter(Boolean),
    ),
  );
  const displayName =
    user?.name || user?.username || user?.email?.split("@")[0] || "My Account";
  const profileImage = user?.profileImageUrl || assets.profile_icon;

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }

      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setIsLocationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (!isAuthenticated || !user?.id || profile) return;
    dispatch(fetchUserProfile(user.id));
  }, [dispatch, isAuthenticated, profile, user?.id]);

  useEffect(() => {
    if (!isAuthenticated || !profile?.userId || addressList.length > 0) return;
    dispatch(fetchAddresses(profile.userId));
  }, [addressList.length, dispatch, isAuthenticated, profile?.userId]);

  const handleAddAddressClick = () => {
    setIsLocationOpen(false);

    if (!isAuthenticated) {
      openAuthModal("login");
      return;
    }

    navigate("/profile?tab=address&openAddAddress=true");
  };

  const handleDetectLocation = () => {
    setIsLocationOpen(false);
  };

  const handleCitySelect = (city) => {
    const nextCity = normalizeCityName(city);
    if (!nextCity) return;

    setIsLocationOpen(false);
    navigate(`/${encodeURIComponent(nextCity)}`);
  };

  const handleLogout = async () => {
    setIsMenuOpen(false);

    try {
      await logout();
    } finally {
      navigate("/", { replace: true });
    }
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-orange-100/70 bg-[linear-gradient(180deg,rgba(255,252,248,0.94)_0%,rgba(255,247,237,0.88)_100%)] shadow-[0_16px_55px_-35px_rgba(15,23,42,0.35)] backdrop-blur-xl">
      <div className="w-full px-3 py-4 sm:px-5 lg:px-6">
        <div className="rounded-[2rem] bg-white/72 p-3 shadow-[0_25px_80px_-45px_rgba(15,23,42,0.24)] backdrop-blur-xl">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center justify-between gap-4 xl:shrink-0">
              <Link to="/" className="flex min-w-0 shrink-0 items-center gap-3">
                <div className="rounded-[1.3rem] bg-white/85 p-2">
                  <img
                    src={assets.logo}
                    alt="Tomato"
                    className="h-10 w-auto cursor-pointer"
                  />
                </div>
                <div className="hidden sm:block">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-500">
                    Premium delivery
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-500">
                    Elevated meals, faster checkout
                  </p>
                </div>
              </Link>

              <Link
                to="/cart"
                className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/82 text-slate-700 transition hover:bg-white hover:text-[#ef4f5f] xl:hidden"
                aria-label="Open cart"
              >
                <img src={assets.basket_icon} alt="Cart" className="h-5 w-5" />
                {cartItemCount > 0 ? (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ef4f5f] px-1 text-[10px] font-semibold text-white">
                    {cartItemCount}
                  </span>
                ) : null}
              </Link>
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-3 xl:flex-row xl:items-center">
              <div
                ref={locationRef}
                className="relative min-w-0 xl:w-[310px] xl:shrink-0"
              >
                <button
                  type="button"
                  onClick={() => setIsLocationOpen((prev) => !prev)}
                  className="flex min-h-[64px] w-full items-center gap-3 rounded-[1.5rem] bg-white/82 px-4 py-3 text-left transition hover:bg-white"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#ef4f5f]/8 text-[#ef4f5f]">
                    <LocationPinIcon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                      Deliver to
                    </span>
                    <span className="mt-1 block truncate text-base font-semibold text-slate-800">
                      {currentLocation}
                    </span>
                    <span className="block truncate text-sm text-slate-500">
                      {currentLocationLine}
                    </span>
                  </span>
                  <img
                    src={assets.selector_icon}
                    alt="Open locations"
                    className={`h-3 w-3 transition-transform ${isLocationOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isLocationOpen ? (
                  <div className="absolute left-0 top-full mt-3 w-full overflow-hidden rounded-[1.75rem] bg-white/95 shadow-[0_28px_70px_-35px_rgba(15,23,42,0.24)] backdrop-blur-xl xl:min-w-[320px]">
                    <div className="border-b border-orange-50 px-5 py-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-500">
                        Location hub
                      </p>
                      <p className="mt-2 text-sm text-slate-500">
                        Choose a city to browse restaurants, or manage your delivery addresses.
                      </p>
                    </div>

                    <div className="border-b border-orange-50 px-5 py-4">
                      <p className="mb-3 text-[15px] font-medium text-slate-900">
                        Browse by city
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {cityOptions.map((city) => (
                          <button
                            key={city}
                            type="button"
                            onClick={() => handleCitySelect(city)}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                              city.toLowerCase() === currentLocation.toLowerCase()
                                ? "bg-[#ef4f5f] text-white shadow-[0_16px_35px_-18px_rgba(239,79,95,0.9)]"
                                : "border border-orange-200 bg-orange-50/70 text-slate-700 hover:border-orange-300 hover:bg-orange-100"
                            }`}
                          >
                            {city}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleDetectLocation}
                      className="flex w-full items-start gap-3 border-b border-orange-50 px-5 py-4 text-left transition hover:bg-rose-50/40"
                    >
                      <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-50 text-[#ef4f5f]">
                        <TargetIcon />
                      </span>
                      <span>
                        <span className="block text-[15px] font-medium text-[#ef4f5f]">
                          Detect current location
                        </span>
                        <span className="block text-sm text-slate-400">Using GPS</span>
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={handleAddAddressClick}
                      className="flex w-full items-center gap-3 border-b border-orange-50 px-5 py-4 text-left transition hover:bg-rose-50/40"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-50 text-[#ef4f5f]">
                        <PlusIcon />
                      </span>
                      <span className="text-[15px] font-medium text-[#ef4f5f]">
                        Add address
                      </span>
                    </button>

                    <div className="border-b border-orange-50 px-5 py-4">
                      <p className="mb-3 text-[15px] font-medium text-slate-900">
                        Saved Addresses
                      </p>
                      {savedAddresses.length ? (
                        <div className="space-y-4">
                          {savedAddresses.map((address) => (
                            <button
                              key={address.id || `${address.line1}-${address.city}`}
                              type="button"
                              onClick={() => handleCitySelect(address.city)}
                              className="flex w-full items-start gap-3 rounded-2xl px-2 py-2 text-left transition hover:bg-slate-50"
                            >
                              <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
                                {address.type?.toLowerCase() === "work" ? (
                                  <BriefcaseIcon />
                                ) : (
                                  <HomeIcon />
                                )}
                              </span>
                              <span className="min-w-0">
                                <span className="block text-base font-medium leading-6 text-slate-800">
                                  {getAddressTitle(address)}
                                </span>
                                <span className="block truncate text-sm text-slate-500">
                                  {formatLocationLine(address)}
                                </span>
                              </span>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-slate-500">No saved addresses found.</p>
                      )}
                    </div>

                    <div className="px-5 py-4">
                      <p className="mb-3 text-[15px] font-medium text-slate-900">
                        Recent Locations
                      </p>
                      {recentAddresses.length ? (
                        <div className="space-y-4">
                          {recentAddresses.map((address) => (
                            <button
                              key={address.id || `${address.line1}-${address.city}`}
                              type="button"
                              onClick={() => handleCitySelect(address.city)}
                              className="flex w-full items-start gap-3 rounded-2xl px-2 py-2 text-left transition hover:bg-slate-50"
                            >
                              <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
                                <ClockIcon />
                              </span>
                              <span className="min-w-0">
                                <span className="block text-base font-medium leading-6 text-slate-800">
                                  {address.city || getAddressTitle(address)}
                                </span>
                                <span className="block truncate text-sm text-slate-500">
                                  {formatLocationLine(address)}
                                </span>
                              </span>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-slate-500">No recent locations yet.</p>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="flex min-h-[64px] min-w-0 flex-1 items-center gap-3 rounded-[1.5rem] bg-white/82 px-4 py-3 transition focus-within:bg-white">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
                  <SearchIcon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                    Search
                  </p>
                  <input
                    type="text"
                    placeholder="Restaurants, cuisines, dishes"
                    className="mt-1 w-full bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <Link
                to="/cart"
                className="relative hidden h-[64px] w-[64px] shrink-0 items-center justify-center rounded-[1.5rem] bg-white/82 text-slate-700 transition hover:bg-white hover:text-[#ef4f5f] xl:flex"
                aria-label="Open cart"
              >
                <img src={assets.basket_icon} alt="Cart" className="h-5 w-5" />
                {cartItemCount > 0 ? (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ef4f5f] px-1 text-[10px] font-semibold text-white">
                    {cartItemCount}
                  </span>
                ) : null}
              </Link>
            </div>

            <div className="flex shrink-0 flex-wrap items-center justify-end gap-3 xl:flex-nowrap">
              {!isAuthenticated ? (
                <>
                  <button
                    type="button"
                    onClick={() => openAuthModal("login")}
                    className="shrink-0 rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-white"
                  >
                    Log in
                  </button>
                  <button
                    type="button"
                    onClick={() => openAuthModal("signup")}
                    className="shrink-0 rounded-full bg-[linear-gradient(135deg,#ef4f5f_0%,#f97316_100%)] px-5 py-2.5 text-sm font-medium text-white shadow-[0_18px_35px_-18px_rgba(239,79,95,0.9)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_40px_-18px_rgba(239,79,95,0.9)]"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <div ref={menuRef} className="relative shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    className="flex items-center gap-3 rounded-full bg-white/82 px-2 py-2 pr-4 transition hover:bg-white"
                  >
                    <img
                      src={profileImage}
                      alt={displayName}
                      className="h-11 w-11 shrink-0 rounded-full object-cover"
                    />
                    <div className="hidden text-left sm:block">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-500">
                        Welcome back
                      </p>
                      <p className="max-w-[160px] truncate text-sm font-semibold text-slate-800">
                        {displayName}
                      </p>
                    </div>
                    <img
                      src={assets.selector_icon}
                      alt="Open menu"
                      className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isMenuOpen ? (
                    <div className="absolute right-0 top-full mt-3 w-64 rounded-[1.75rem] bg-white/95 p-2 shadow-[0_28px_70px_-35px_rgba(15,23,42,0.24)] backdrop-blur-xl">
                      <div className="rounded-[1.25rem] bg-orange-50/60 px-4 py-4">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {displayName}
                        </p>
                        <p className="mt-1 truncate text-xs text-slate-500">
                          {user?.email || "Signed in user"}
                        </p>
                      </div>

                      <div className="mt-2 space-y-1">
                        <Link
                          to="/profile"
                          onClick={() => setIsMenuOpen(false)}
                          className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                          My Profile
                        </Link>

                        <Link
                          to="/cart"
                          onClick={() => setIsMenuOpen(false)}
                          className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                          Cart ({cartItemCount})
                        </Link>

                        <button
                          type="button"
                          onClick={handleLogout}
                          className="block w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
