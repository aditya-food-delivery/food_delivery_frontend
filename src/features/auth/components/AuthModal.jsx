import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import OtpLogin from "./OtpLogin";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { assets } from "../../../assets/assets";
import PropTypes from "prop-types";

const SCREEN = {
  LOGIN: "login",
  SIGNUP: "signup",
  OTP: "otp",
  FORGOT: "forgot",
};

const AuthModal = ({ mode, setShowLogin }) => {
  const navigate = useNavigate();
  const [screen, setScreen] = useState(mode === "signup" ? SCREEN.SIGNUP : SCREEN.LOGIN);

  const handleAuthSuccess = () => {
    setShowLogin(null);
    navigate("/");
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  const titleMap = {
    [SCREEN.LOGIN]: "Welcome Back",
    [SCREEN.SIGNUP]: "Create your account",
    [SCREEN.OTP]: "Login with Email OTP",
    [SCREEN.FORGOT]: "Reset password",
  };

  return (
    <div className="fixed inset-0 bg-black/45 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-rose-500 via-red-500 to-orange-500 p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-semibold">{titleMap[screen]}</h2>
              <p className="text-sm text-white/90 mt-1">
                Sign in fast with password, Google, or OTP.
              </p>
            </div>
            <img
              src={assets.cross_icon}
              className="w-4 h-4 cursor-pointer invert"
              onClick={() => setShowLogin(null)}
            />
          </div>
        </div>

        <div className="p-6">
          {screen === SCREEN.LOGIN && (
            <LoginForm
              onSuccess={handleAuthSuccess}
              onUseOtp={() => setScreen(SCREEN.OTP)}
              onForgotPassword={() => setScreen(SCREEN.FORGOT)}
            />
          )}

          {screen === SCREEN.SIGNUP && (
            <SignupForm onSwitchToLogin={() => setScreen(SCREEN.LOGIN)} />
          )}

          {screen === SCREEN.OTP && (
            <OtpLogin onSuccess={handleAuthSuccess} onBack={() => setScreen(SCREEN.LOGIN)} />
          )}

          {screen === SCREEN.FORGOT && (
            <ForgotPasswordForm onBackToLogin={() => setScreen(SCREEN.LOGIN)} />
          )}

          <div className="mt-4">
            <p className="text-center text-sm text-gray-600">
              {screen === SCREEN.SIGNUP ? (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="font-semibold text-red-500"
                    onClick={() => setScreen(SCREEN.LOGIN)}
                  >
                    Login
                  </button>
                </>
              ) : (
                <>
                  New user?{" "}
                  <button
                    type="button"
                    className="font-semibold text-red-500"
                    onClick={() => setScreen(SCREEN.SIGNUP)}
                  >
                    Sign up
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

AuthModal.propTypes = {
  mode: PropTypes.oneOf(["login", "signup"]).isRequired,
  setShowLogin: PropTypes.func.isRequired,
};

export default AuthModal;
