export const selectProfile = (state) => state.profile.data;
console.log("PROFILE STATE 👉", selectProfile);
export const selectProfileStatus = (state) => state.profile.status;
export const selectProfileError = (state) => state.profile.error;

export const selectIsProfileLoading = (state) =>
  state.profile.status === "loading";

export const selectAddresses = (state) =>
  state.profile.addresses?.getAddressesByProfileId || [];

/* Optional helpers */
export const selectDefaultAddress = (state) =>
  selectAddresses(state).find((a) => a.defaultFlag);
