import { useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../../../hooks/useAuth";

const ForgotPasswordForm = ({ onBackToLogin }) => {
  const {
    requestPasswordResetOtp,
    resetPasswordWithOtp,
    forgotPasswordStatus,
    forgotPasswordError,
    forgotPasswordOtpSent,
    passwordResetSuccess,
    resetForgotPasswordState,
  } = useAuth();

  const [form, setForm] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    await requestPasswordResetOtp(form.email);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    await resetPasswordWithOtp(form);
  };

  if (passwordResetSuccess) {
    return (
      <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-center">
        <p className="text-emerald-700 font-medium">Password updated successfully.</p>
        <button
          type="button"
          onClick={() => {
            resetForgotPasswordState();
            onBackToLogin();
          }}
          className="mt-4 px-4 py-2 rounded-lg bg-black text-white text-sm"
        >
          Back to Login
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={forgotPasswordOtpSent ? handleResetPassword : handleSendOtp}
      className="space-y-3"
    >
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Enter email"
        required
        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm"
      />

      {forgotPasswordOtpSent && (
        <>
          <input
            type="text"
            name="otp"
            value={form.otp}
            onChange={handleChange}
            placeholder="Enter OTP"
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm"
          />
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            placeholder="Enter new password"
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm"
          />
        </>
      )}

      {forgotPasswordError?.message && (
        <p className="text-sm text-red-600">{forgotPasswordError.message}</p>
      )}

      <button
        type="submit"
        disabled={forgotPasswordStatus === "loading"}
        className="w-full py-3 rounded-xl bg-black text-white text-sm font-medium disabled:opacity-60"
      >
        {forgotPasswordStatus === "loading"
          ? "Please wait..."
          : forgotPasswordOtpSent
            ? "Reset Password"
            : "Send OTP"}
      </button>

      <button
        type="button"
        onClick={() => {
          resetForgotPasswordState();
          onBackToLogin();
        }}
        className="w-full text-sm text-gray-600 underline"
      >
        Back to login
      </button>
    </form>
  );
};

ForgotPasswordForm.propTypes = {
  onBackToLogin: PropTypes.func.isRequired,
};

export default ForgotPasswordForm;
