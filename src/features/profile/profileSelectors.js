export const selectProfile = (state) => state.profile.data;
console.log("PROFILE STATE 👉", selectProfile);
export const selectProfileStatus = (state) => state.profile.status;
export const selectProfileError = (state) => state.profile.error;

export const selectIsProfileLoading = (state) =>
  state.profile.status === "loading";

export const selectAddresses = (state) => state.profile.addresses;

/* Optional helpers */
export const selectDefaultAddress = (state) =>
  state.profile.addresses.find((a) => a.defaultFlag);
