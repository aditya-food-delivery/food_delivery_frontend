import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const currentLocation = selectedAddress?.city || profile?.city || "Bareilly";
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

  const handleLogout = () => {
    setIsMenuOpen(false);
    logout();
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="shrink-0">
            <img
              src={assets.logo}
              alt="Tomato"
              className="h-10 w-auto cursor-pointer"
            />
          </Link>
        </div>

        <div className="flex flex-1 items-center gap-3 lg:max-w-3xl">
          <div
            ref={locationRef}
            className="relative hidden min-w-[230px] sm:block"
          >
            <button
              type="button"
              onClick={() => setIsLocationOpen((prev) => !prev)}
              className="flex h-14 w-full items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 text-left shadow-sm transition hover:border-gray-300"
            >
              <span className="text-[#ef4f5f]">
                <LocationPinIcon />
              </span>
              <span className="min-w-0 flex-1 truncate text-base font-medium text-gray-700">
                {currentLocation}
              </span>
              <img
                src={assets.selector_icon}
                alt="Open locations"
                className={`h-3 w-3 transition-transform ${isLocationOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isLocationOpen ? (
              <div className="absolute left-0 top-full mt-3 w-[340px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
                <button
                  type="button"
                  onClick={handleDetectLocation}
                  className="flex w-full items-start gap-3 border-b border-gray-100 px-5 py-4 text-left transition hover:bg-rose-50/40"
                >
                  <span className="mt-1 text-[#ef4f5f]">
                    <TargetIcon />
                  </span>
                  <span>
                    <span className="block text-[15px] font-medium text-[#ef4f5f]">
                      Detect current location
                    </span>
                    <span className="block text-sm text-gray-400">
                      Using GPS
                    </span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleAddAddressClick}
                  className="flex w-full items-center gap-3 border-b border-gray-100 px-5 py-4 text-left transition hover:bg-rose-50/40"
                >
                  <span className="text-[#ef4f5f]">
                    <PlusIcon />
                  </span>
                  <span className="text-[15px] font-medium text-[#ef4f5f]">
                    Add address
                  </span>
                </button>

                <div className="border-b border-gray-100 px-5 py-4">
                  <p className="mb-3 text-[15px] font-medium text-gray-900">
                    Saved Addresses
                  </p>
                  {savedAddresses.length ? (
                    <div className="space-y-4">
                      {savedAddresses.map((address) => (
                        <button
                          key={address.id || `${address.line1}-${address.city}`}
                          type="button"
                          className="flex w-full items-start gap-3 text-left"
                        >
                          <span className="mt-1 text-gray-500">
                            {address.type?.toLowerCase() === "work" ? (
                              <BriefcaseIcon />
                            ) : (
                              <HomeIcon />
                            )}
                          </span>
                          <span className="min-w-0">
                            <span className="block text-lg font-medium leading-6 text-gray-800">
                              {getAddressTitle(address)}
                            </span>
                            <span className="block truncate text-sm text-gray-500">
                              {formatLocationLine(address)}
                            </span>
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No saved addresses found.</p>
                  )}
                </div>

                <div className="px-5 py-4">
                  <p className="mb-3 text-[15px] font-medium text-gray-900">
                    Recent Locations
                  </p>
                  {recentAddresses.length ? (
                    <div className="space-y-4">
                      {recentAddresses.map((address) => (
                        <button
                          key={address.id || `${address.line1}-${address.city}`}
                          type="button"
                          className="flex w-full items-start gap-3 text-left"
                        >
                          <span className="mt-1 text-gray-500">
                            <ClockIcon />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-lg font-medium leading-6 text-gray-800">
                              {address.city || getAddressTitle(address)}
                            </span>
                            <span className="block truncate text-sm text-gray-500">
                              {formatLocationLine(address)}
                            </span>
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No recent locations yet.
                    </p>
                  )}
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex h-14 flex-1 items-center rounded-xl border border-gray-200 bg-white px-4 shadow-sm transition focus-within:border-[#ef4f5f]">
            <img
              src={assets.search_icon}
              alt="Search"
              className="mr-3 h-4 w-4 opacity-60"
            />
            <input
              type="text"
              placeholder="Search for restaurants, cuisines, or dishes"
              className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
            />
          </div>

          <Link
            to="/cart"
            className="relative flex h-12 min-w-12 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-700 transition hover:border-[#ef4f5f] hover:text-[#ef4f5f]"
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

        <div className="flex items-center justify-end gap-3">
          {!isAuthenticated ? (
            <>
              <button
                type="button"
                onClick={() => openAuthModal("login")}
                className="rounded-full px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Log in
              </button>
              <button
                type="button"
                onClick={() => openAuthModal("signup")}
                className="rounded-full bg-[#ef4f5f] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#d93d4e]"
              >
                Sign up
              </button>
            </>
          ) : (
            <div ref={menuRef} className="relative">
              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="flex items-center gap-3 rounded-full border border-gray-200 bg-white px-2 py-2 pr-4 transition hover:border-gray-300 hover:bg-gray-50"
              >
                <img
                  src={profileImage}
                  alt={displayName}
                  className="h-10 w-10 rounded-full border border-gray-200 object-cover"
                />
                <div className="hidden text-left sm:block">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Welcome
                  </p>
                  <p className="max-w-[140px] truncate text-sm font-semibold text-gray-800">
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
                <div className="absolute right-0 top-full mt-3 w-56 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl">
                  <div className="border-b border-gray-100 px-3 py-3">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {displayName}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {user?.email || "Signed in user"}
                    </p>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="mt-2 block rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    My Profile
                  </Link>

                  <Link
                    to="/cart"
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    Cart ({cartItemCount})
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="block w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
