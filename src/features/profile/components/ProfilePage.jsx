import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  fetchUserProfile,
  updateUserProfile,
  fetchAddresses,
  addAddress,
} from "../profileThunks";
import {
  selectProfile,
  selectIsProfileLoading,
  selectAddresses,
} from "../profileSelectors";
import { useAuth } from "../../../hooks/useAuth";
import ProfileHeader from "./ProfileHeader";
import ProfileSidebar from "./ProfileSidebar";
import ProfileContent from "./ProfileContent";

import EditProfileModal from "./EditProfileModal";
import AddAddressModal from "./AddAddressModal";
const ProfilePage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { auth } = useAuth();
  // console.log("Hii i am auth from profile page", auth);
  const userId = auth?.user?.id;
  const profile = useSelector(selectProfile);

  console.log("Hii i am auth from profile page", profile);
  const isLoading = useSelector(selectIsProfileLoading);
  const addresses = useSelector(selectAddresses);
  const isAddressSaving = useSelector((state) => state.profile.loading);

  const [activeTab, setActiveTab] = useState("basic");
  const [isEditing, setIsEditing] = useState(false);
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);

  useEffect(() => {
    if (userId && !profile) dispatch(fetchUserProfile(userId));
  }, [dispatch, userId, profile]);

  useEffect(() => {
    if (profile?.userId) dispatch(fetchAddresses(profile.userId));
  }, [dispatch, profile]);

  useEffect(() => {
    const tab = searchParams.get("tab");
    const openAddAddress = searchParams.get("openAddAddress");

    if (tab === "address") {
      setActiveTab("address");
    }

    if (openAddAddress === "true") {
      setActiveTab("address");
      setIsAddAddressOpen(true);
    }
  }, [searchParams]);

  const handleSave = (data) => {
    dispatch(updateUserProfile({ profileId: userId, input: data }));
    setIsEditing(false);
  };

  const openAddAddressModal = () => {
    setActiveTab("address");
    setIsAddAddressOpen(true);
  };

  const closeAddAddressModal = () => {
    setIsAddAddressOpen(false);
    if (searchParams.get("openAddAddress")) {
      const next = new URLSearchParams(searchParams);
      next.delete("openAddAddress");
      setSearchParams(next, { replace: true });
    }
  };

  const handleAddAddress = async (data) => {
    const response = await dispatch(
      addAddress({ profileId: profile?.userId, input: data }),
    );

    if (response.meta.requestStatus === "fulfilled") {
      closeAddAddressModal();
      dispatch(fetchAddresses(profile.userId));
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <ProfileHeader profile={profile} />

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6 lg:flex-row flex-col">
        <ProfileSidebar active={activeTab} onChange={setActiveTab} />

        <ProfileContent
          active={activeTab}
          profile={profile}
          addresses={addresses}
          onEdit={() => setIsEditing(true)}
          onAddAddress={openAddAddressModal}
        />
      </div>

      {isEditing && (
        <EditProfileModal
          profile={profile}
          onSave={handleSave}
          onClose={() => setIsEditing(false)}
        />
      )}

      {isAddAddressOpen && (
        <AddAddressModal
          onSave={handleAddAddress}
          onClose={closeAddAddressModal}
          isSaving={!!isAddressSaving}
        />
      )}
    </div>
  );
};

export default ProfilePage;


