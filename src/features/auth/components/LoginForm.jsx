import { useState } from "react";
import PropTypes from "prop-types";
import AuthError from "./AuthError";
import { useAuth } from "../../../hooks/useAuth";
import { beginGoogleOAuth } from "../../../api/authApi";

const LoginForm = ({ onSuccess, onUseOtp, onForgotPassword }) => {
  const { loginWithPassword, status, resetError } = useAuth();

  const [data, setData] = useState({ email: "", password: "" });

  const onChangeHandler = (e) => {
    resetError();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await loginWithPassword({
      usernameOrEmail: data.email,
      password: data.password,
    });

    if (res.meta.requestStatus === "fulfilled") {
      onSuccess();
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-4"
      onClick={resetError}
      onFocus={resetError}
    >
      <input
        type="email"
        name="email"
        value={data.email}
        onChange={onChangeHandler}
        placeholder="Email"
        required
        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm"
      />

      <input
        type="password"
        name="password"
        value={data.password}
        onChange={onChangeHandler}
        placeholder="Password"
        required
        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm"
      />

      <button
        type="button"
        onClick={onForgotPassword}
        className="text-right text-sm text-gray-500 hover:text-gray-700"
      >
        Forgot password?
      </button>

      <AuthError />

      <button
        type="submit"
        disabled={status === "loading"}
        className={`w-full py-3 rounded-xl text-white font-medium ${
          status === "loading"
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-black hover:bg-gray-900"
        }`}
      >
        {status === "loading" ? "Please wait..." : "Login"}
      </button>

      <button
        type="button"
        onClick={onUseOtp}
        className="w-full py-3 rounded-xl border border-gray-300 text-sm font-medium hover:bg-gray-50"
      >
        Login with Email OTP
      </button>

      <div className="flex items-center gap-3 my-2">
        <hr className="flex-grow border-gray-300" />
        <span className="text-gray-400 text-sm">or</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <button
        type="button"
        onClick={beginGoogleOAuth}
        className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-xl hover:bg-gray-50"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          className="w-5 h-5"
        />
        <span className="text-gray-700 font-medium">Sign in with Google</span>
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onUseOtp: PropTypes.func.isRequired,
  onForgotPassword: PropTypes.func.isRequired,
};

export default LoginForm;

