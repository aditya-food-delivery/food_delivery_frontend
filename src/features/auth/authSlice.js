import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  register,
  loadCurrentUser,
  logout,
  sendOtp,
  verifyOtp,
  requestPasswordResetOtp,
  resetPasswordWithOtp,
} from "./authThunks";

const initialState = {
  user: null,
  isAuthenticated: false,

  status: "idle",
  error: null,

  showAuthModal: false,
  authMode: "login", // "login" | "signup"

  // 🔐 OTP FLOW
  otpLoading: false,
  otpSent: false,
  otpError: null,

  forgotPasswordStatus: "idle",
  forgotPasswordError: null,
  forgotPasswordOtpSent: false,
  passwordResetSuccess: false,
};

const normalizeError = (payload) => {
  if (!payload) {
    return { message: "Something went wrong" };
  }

  // backend format
  if (payload.error) {
    return payload.error;
  }

  // fallback
  return { message: payload };
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthError(state) {
      state.error = null;
    },
    resetOtpState(state) {
      state.otpLoading = false;
      state.otpSent = false;
      state.otpError = null;
    },
    resetForgotPasswordState(state) {
      state.forgotPasswordStatus = "idle";
      state.forgotPasswordError = null;
      state.forgotPasswordOtpSent = false;
      state.passwordResetSuccess = false;
    },
    openAuthModal: (state, action) => {
      state.showAuthModal = true;
      state.authMode = action.payload || "login";
    },
    closeAuthModal: (state) => {
      state.showAuthModal = false;
    },
  },
  extraReducers: (builder) => {
    builder

      // =====================
      // LOAD CURRENT USER
      // =====================
      .addCase(loadCurrentUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadCurrentUser.fulfilled, (state, action) => {
        console.log("hii", action.payload);
        state.user = {
          id: action.payload.id,
          email: action.payload.email,
        };
        state.isAuthenticated = true;
        state.status = "idle";
      })
      .addCase(loadCurrentUser.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = "idle";
      })

      // =====================
      // LOGIN
      // =====================
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.status = "idle";
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "error";
        state.error = normalizeError(action.payload);
      })

      // =====================
      // REGISTER
      // =====================
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "error";
        state.error = normalizeError(action.payload);
      })

      // =====================
      // LOGOUT
      // =====================
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = "idle";
      })

      // =====================
      // SEND OTP
      // =====================
      .addCase(sendOtp.pending, (state) => {
        state.otpLoading = true;
        state.otpError = null;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.otpLoading = false;
        state.otpSent = true;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.otpLoading = false;
        state.otpError = normalizeError(action.payload);
      })

      .addCase(verifyOtp.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        // Keep protected routes blocked until loadCurrentUser resolves.
        state.status = "loading";
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.status = "error";
        state.error = normalizeError(action.payload);
      })

      // =====================
      // FORGOT PASSWORD
      // =====================
      .addCase(requestPasswordResetOtp.pending, (state) => {
        state.forgotPasswordStatus = "loading";
        state.forgotPasswordError = null;
        state.passwordResetSuccess = false;
      })
      .addCase(requestPasswordResetOtp.fulfilled, (state) => {
        state.forgotPasswordStatus = "idle";
        state.forgotPasswordOtpSent = true;
      })
      .addCase(requestPasswordResetOtp.rejected, (state, action) => {
        state.forgotPasswordStatus = "error";
        state.forgotPasswordError = normalizeError(action.payload);
      })
      .addCase(resetPasswordWithOtp.pending, (state) => {
        state.forgotPasswordStatus = "loading";
        state.forgotPasswordError = null;
      })
      .addCase(resetPasswordWithOtp.fulfilled, (state) => {
        state.forgotPasswordStatus = "idle";
        state.passwordResetSuccess = true;
        state.forgotPasswordOtpSent = false;
      })
      .addCase(resetPasswordWithOtp.rejected, (state, action) => {
        state.forgotPasswordStatus = "error";
        state.forgotPasswordError = normalizeError(action.payload);
      });
  },
});
export const {
  resetAuthError,
  resetOtpState,
  resetForgotPasswordState,
  openAuthModal,
  closeAuthModal,
} = authSlice.actions;

export default authSlice.reducer;
