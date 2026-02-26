import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { assets } from "../assets/assets";
import { useAuth } from "../hooks/useAuth";
import { fetchUserProfile, fetchAddresses } from "../features/profile/profileThunks";
import { selectProfile, selectAddresses } from "../features/profile/profileSelectors";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth, openAuthModal, logout } = useAuth();
  const { isAuthenticated, user } = auth;

  const profile = useSelector(selectProfile);
  const addresses = useSelector(selectAddresses);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const menuRef = useRef(null);
  const locationRef = useRef(null);

  const displayName =
    user?.name || user?.username || user?.email?.split("@")[0] || "Profile";
  const profileImage = user?.profileImageUrl || assets.profile_icon;

  const addressList = useMemo(() => {
    return addresses?.getAddressesByProfileId ?? [];
  }, [addresses]);

  const selectedAddress = useMemo(() => {
    return addressList.find((address) => address.defaultFlag) || addressList[0] || null;
  }, [addressList]);

  const currentCity = selectedAddress?.city || profile?.city || "Select city";

  const recentAddresses = useMemo(() => {
    return addressList
      .filter((address) => address.id !== selectedAddress?.id)
      .slice(0, 2);
  }, [addressList, selectedAddress]);

  useEffect(() => {
    if (!isAuthenticated || !user?.id) {
      return;
    }

    if (!profile) {
      dispatch(fetchUserProfile(user.id));
    }
  }, [dispatch, isAuthenticated, user?.id, profile]);

  useEffect(() => {
    if (!isAuthenticated || !profile?.userId) {
      return;
    }

    if (!addressList.length) {
      dispatch(fetchAddresses(profile.userId));
    }
  }, [dispatch, isAuthenticated, profile?.userId, addressList.length]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }

      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setIsLocationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddAddressClick = () => {
    setIsLocationOpen(false);
    if (!isAuthenticated) {
      openAuthModal("login");
      return;
    }
    navigate("/profile?tab=address&openAddAddress=true");
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link to="/">
          <img src={assets.logo} alt="Tomato" className="w-24 cursor-pointer" />
        </Link>

        <div className="relative" ref={locationRef}>
          <button
            type="button"
            onClick={() => setIsLocationOpen((prev) => !prev)}
            className="flex items-center gap-1 cursor-pointer"
          >
            <span className="text-sm font-medium">{currentCity}</span>
            <img src={assets.selector_icon} alt="toggle" className="w-3 h-3" />
          </button>

          {isLocationOpen && (
            <div className="absolute left-0 mt-3 w-[320px] bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
              <button
                type="button"
                className="w-full text-left px-5 py-4 hover:bg-gray-50 border-b border-gray-100"
              >
                <p className="text-[#ef4f5f] font-medium">Detect current location</p>
                <p className="text-sm text-gray-400">Using GPS</p>
              </button>

              <button
                type="button"
                onClick={handleAddAddressClick}
                className="w-full text-left px-5 py-4 hover:bg-gray-50 border-b border-gray-100"
              >
                <p className="text-[#ef4f5f] font-medium">+ Add address</p>
              </button>

              <div className="px-5 pt-3 pb-2 border-b border-gray-100">
                <p className="text-xl font-medium text-gray-900 mb-2">Saved Addresses</p>
                {addressList.length ? (
                  addressList.slice(0, 2).map((address, index) => (
                    <button
                      key={address.id || `${address.line1}-${index}`}
                      type="button"
                      className="w-full text-left py-2 hover:bg-gray-50 rounded"
                    >
                      <p className="text-lg text-gray-900">{address.type || "Home"}</p>
                      <p className="text-sm text-gray-500 truncate">
                        {address.line1}, {address.city}, {address.state}
                      </p>
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 py-2">No saved addresses found.</p>
                )}
              </div>

              <div className="px-5 pt-3 pb-4">
                <p className="text-xl font-medium text-gray-900 mb-2">Recent Locations</p>
                {recentAddresses.length ? (
                  recentAddresses.map((address, index) => (
                    <button
                      key={address.id || `${address.line1}-${index}`}
                      type="button"
                      className="w-full text-left py-2 hover:bg-gray-50 rounded"
                    >
                      <p className="text-lg text-gray-900">{address.city}</p>
                      <p className="text-sm text-gray-500 truncate">{address.line1}</p>
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 py-2">No recent locations.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 max-w-xl mx-6">
        <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
          <input
            type="text"
            placeholder="Search for restaurant, cuisine or a dish"
            className="w-full outline-none text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-5 text-sm relative">
        {!isAuthenticated ? (
          <>
            <button
              onClick={() => openAuthModal("login")}
              className="text-gray-600 hover:text-black"
            >
              Log in
            </button>

            <button
              onClick={() => openAuthModal("signup")}
              className="text-gray-600 hover:text-black"
            >
              Sign up
            </button>
          </>
        ) : (
          <div className="relative" ref={menuRef}>
            <div className="flex items-center gap-1">
              <Link
                to="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 text-gray-800"
              >
                <img
                  src={profileImage}
                  alt={displayName}
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                />
                <span className="font-medium">{displayName}</span>
              </Link>
              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="text-xs text-gray-600 px-1"
                type="button"
                aria-label="Toggle profile menu"
              >
                {isMenuOpen ? "^" : "v"}
              </button>
            </div>

            {isMenuOpen && (
              <div className="absolute right-0 mt-3 w-44 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50">
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                >
                  Profile
                </Link>
                <button
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
                  type="button"
                >
                  Reviews
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
                  type="button"
                >
                  Settings
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    logout();
                  }}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
                  type="button"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
