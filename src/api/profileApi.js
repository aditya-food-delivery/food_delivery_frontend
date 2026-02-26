import { request } from "./request";
import { SERVICE_URLS } from "./serviceUrls";

export const getProfileByUserIdQuery = (userId) => ({
  query: `
    query GetProfileByUserId($userId: String!) {
      getProfileByUserId(userId: $userId) {
        userId
        firstName
        lastName
        username
        email
        bio
        avatarUrl
        phone
        dateOfBirth
        gender
        language
        timezone
        createdAt
        updatedAt
      }
    }
  `,
  variables: { userId },
});

export const fetchUserProfileApi = (userId) =>
  request({
    service: SERVICE_URLS.PROFILE,
    url: "/graphql",
    method: "POST",
    data: getProfileByUserIdQuery(userId),
  });

export const createProfileMutation = (input) => ({
  query: `
    mutation CreateProfile($input: CreateUserProfileInput!) {
      createProfile(input: $input) {
        userId
        firstName
        lastName
        email
        createdAt
      }
    }
  `,
  variables: { input },
});

export const createProfileApi = (input) =>
  request({
    service: SERVICE_URLS.PROFILE,
    url: "/graphql",
    method: "POST",
    data: createProfileMutation(input),
  });

export const updateProfileMutation = (userId, input) => ({
  query: `
    mutation UpdateProfile(
      $userId: String!
      $input: UpdateUserProfileInput!
    ) {
      updateProfile(userId: $userId, input: $input) {
        userId
        firstName
        lastName
        username
        email
        bio
        avatarUrl
        phone
        dateOfBirth
        gender
        language
        timezone
        updatedAt
      }
    }
  `,
  variables: { userId, input },
});

export const updateUserProfileApi = (userId, input) =>
  request({
    service: SERVICE_URLS.PROFILE,
    url: "/graphql",
    method: "POST",
    data: updateProfileMutation(userId, input),
  });

export const deleteProfileMutation = (userId) => ({
  query: `
    mutation DeleteProfile($userId: String!) {
      deleteProfile(userId: $userId)
    }
  `,
  variables: { userId },
});

export const deleteProfileApi = (userId) =>
  request({
    service: SERVICE_URLS.PROFILE,
    url: "/graphql",
    method: "POST",
    data: deleteProfileMutation(userId),
  });

export const getAddressesByProfileIdQuery = (profileId) => ({
  query: `
    query GetAddresses($profileId: String!) {
      getAddressesByProfileId(profileId: $profileId) {
        id
        type
        line1
        line2
        city
        state
        country
        zipCode
        defaultFlag
      }
    }
  `,
  variables: { profileId },
});

export const fetchAddressesApi = (profileId) =>
  request({
    service: SERVICE_URLS.PROFILE,
    url: "/graphql",
    method: "POST",
    data: getAddressesByProfileIdQuery(profileId),
  });

export const addAddressMutation = (profileId, input) => ({
  query: `
    mutation AddAddress($profileId: ID!, $input: AddressInput!) {
      addAddress(profileId: $profileId, input: $input) {
        id
        type
        city
        country
      }
    }
  `,
  variables: { profileId, input },
});

export const addAddressApi = (profileId, input) =>
  request({
    service: SERVICE_URLS.PROFILE,
    url: "/graphql",
    method: "POST",
    data: addAddressMutation(profileId, input),
  });

export const deleteAddressMutation = (id) => ({
  query: `
    mutation DeleteAddress($id: ID!) {
      deleteAddress(id)
    }
  `,
  variables: { id },
});

export const deleteAddressApi = (id) =>
  request({
    service: SERVICE_URLS.PROFILE,
    url: "/graphql",
    method: "POST",
    data: deleteAddressMutation(id),
  });
export const getVerificationQuery = (profileId) => ({
  query: `
    query GetVerification($profileId: ID!) {
      getVerificationByProfileId(profileId: $profileId) {
        id
        isEmailVerified
        isPhoneVerified
        isIdentityVerified
        kycStatus
      }
    }
  `,
  variables: { profileId },
});

export const fetchVerificationApi = (profileId) =>
  request({
    service: SERVICE_URLS.PROFILE,
    url: "/graphql",
    method: "POST",
    data: getVerificationQuery(profileId),
  });

export const updateVerificationMutation = (profileId, input) => ({
  query: `
    mutation UpdateVerification(
      $profileId: ID!
      $input: VerificationInput!
    ) {
      updateVerification(profileId: $profileId, input: $input) {
        id
        kycStatus
        isEmailVerified
        isPhoneVerified
        isIdentityVerified
      }
    }
  `,
  variables: { profileId, input },
});

export const updateVerificationApi = (profileId, input) =>
  request({
    service: SERVICE_URLS.PROFILE,
    url: "/graphql",
    method: "POST",
    data: updateVerificationMutation(profileId, input),
  });

export const getIntegrationsQuery = (profileId) => ({
  query: `
    query GetIntegrations($profileId: ID!) {
      getIntegrationPreferences(profileId: $profileId) {
        id
        providerName
        externalUserId
        isConnected
      }
    }
  `,
  variables: { profileId },
});

export const fetchIntegrationsApi = (profileId) =>
  request({
    service: SERVICE_URLS.PROFILE,
    url: "/graphql",
    method: "POST",
    data: getIntegrationsQuery(profileId),
  });

export const addIntegrationMutation = (profileId, input) => ({
  query: `
    mutation AddIntegration(
      $profileId: ID!
      $input: IntegrationPreferenceInput!
    ) {
      addIntegrationPreference(profileId: $profileId, input: $input) {
        id
        providerName
        isConnected
      }
    }
  `,
  variables: { profileId, input },
});

export const addIntegrationApi = (profileId, input) =>
  request({
    service: SERVICE_URLS.PROFILE,
    url: "/graphql",
    method: "POST",
    data: addIntegrationMutation(profileId, input),
  });

export const deleteIntegrationMutation = (id) => ({
  query: `
    mutation DeleteIntegration($id: ID!) {
      deleteIntegrationPreference(id)
    }
  `,
  variables: { id },
});

export const deleteIntegrationApi = (id) =>
  request({
    service: SERVICE_URLS.PROFILE,
    url: "/graphql",
    method: "POST",
    data: deleteIntegrationMutation(id),
  });
