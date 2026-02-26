import { useDispatch, useSelector } from "react-redux";
import {
  login,
  register,
  sendOtp,
  verifyOtp,
  logout,
  loadCurrentUser,
  requestPasswordResetOtp,
  resetPasswordWithOtp,
} from "../features/auth/authThunks";
import { resetAuthError, resetForgotPasswordState } from "../features/auth/authSlice";
import {
  selectAuth,
  selectAuthStatus,
  selectAuthError,
  selectOtpStatus,
  selectOtpError,
  selectAuthUserId,
  selectShowAuthModal,
  selectAuthMode,
  selectForgotPasswordStatus,
  selectForgotPasswordError,
  selectForgotPasswordOtpSent,
  selectPasswordResetSuccess,
} from "../features/auth/authSelectors";

import { openAuthModal, closeAuthModal } from "../features/auth/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();

  return {
    auth: useSelector(selectAuth),
    status: useSelector(selectAuthStatus),
    error: useSelector(selectAuthError),
    otpLoading: useSelector(selectOtpStatus),
    otpError: useSelector(selectOtpError),
    id: useSelector(selectAuthUserId),
    resetError: () => dispatch(resetAuthError()),

    logout: () => dispatch(logout()),

    loginWithPassword: (payload) => dispatch(login(payload)),

    signup: (payload) => dispatch(register(payload)),

    sendOtp: (email) => dispatch(sendOtp(email)),

    showAuthModal: useSelector(selectShowAuthModal),
    authMode: useSelector(selectAuthMode),
    forgotPasswordStatus: useSelector(selectForgotPasswordStatus),
    forgotPasswordError: useSelector(selectForgotPasswordError),
    forgotPasswordOtpSent: useSelector(selectForgotPasswordOtpSent),
    passwordResetSuccess: useSelector(selectPasswordResetSuccess),
    resetForgotPasswordState: () => dispatch(resetForgotPasswordState()),

    verifyOtp: async (payload) => {
      const res = await dispatch(verifyOtp(payload));
      if (verifyOtp.fulfilled.match(res)) {
        await dispatch(loadCurrentUser());
      }
      return res;
    },
    requestPasswordResetOtp: (email) => dispatch(requestPasswordResetOtp(email)),
    resetPasswordWithOtp: (payload) => dispatch(resetPasswordWithOtp(payload)),

    openAuthModal: (mode = "login") => dispatch(openAuthModal(mode)),
    closeAuthModal: () => dispatch(closeAuthModal()),
  };
};
