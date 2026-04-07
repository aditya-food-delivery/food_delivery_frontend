import { request } from "./request";
import { SERVICE_URLS } from "./serviceUrls";

/**
 * AUTH SERVICE (8080)
 * All auth-related calls live here
 */

export const loginUser = (data) => {
  return request({
    service: SERVICE_URLS.AUTH,
    url: "/api/auth/jwt/login",
    method: "POST",
    data,
  });
};

export const registerUser = (data) => {
  return request({
    service: SERVICE_URLS.AUTH,
    url: "/api/auth/jwt/register",
    method: "POST",
    data,
  });
};

export const fetchCurrentUser = () => {
  return request({
    service: SERVICE_URLS.AUTH,
    url: "/api/auth/jwt/me",
    
    method: "GET",
  });
};

export const refreshAccessToken = () => {
  return request({
    service: SERVICE_URLS.AUTH,
    url: "/api/auth/jwt/refresh",
    method: "POST",
  });
};

export const logout = () => {
  return request({
    service: SERVICE_URLS.AUTH,
    url: "/api/auth/jwt/logout",
    method: "POST",
  });
};

export const sendOtp = (email) => {
  return request({
    service: SERVICE_URLS.AUTH,
    url: "/auth/otp/request",
    method: "POST",
    data: { email },
  });
};

export const verifyOtp = (email, otp) => {
  return request({
    service: SERVICE_URLS.AUTH,
    url: "/auth/otp/login",
    method: "POST",
    data: { email, otp },
  });
};

export const requestPasswordResetOtp = (email) => {
  return request({
    service: SERVICE_URLS.AUTH,
    url: "/account/forgot-password",
    method: "POST",
    data: { email },
  });
};

export const resetPasswordWithOtp = ({ otp, newPassword }) => {
  return request({
    service: SERVICE_URLS.AUTH,
    url: "/account/reset-password",
    method: "POST",
    data: { otp, newPassword },
  });
};

export const getAuthServiceUrl = () => {
  return SERVICE_URLS.AUTH;
};

export const getGoogleOAuthLoginUrl = () => {
  return `${getAuthServiceUrl()}/api/auth/oauth/login/google`;
};

export const beginGoogleOAuth = () => {
  window.location.assign(getGoogleOAuthLoginUrl());
};
