import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../authThunks";
import { resetAuthError } from "../authSlice";
import AuthError from "./AuthError";
import PropTypes from "prop-types";
import { validatePassword } from "../../../utils/passwordValidator";
import { beginGoogleOAuth } from "../../../api/authApi";
const SignupForm = ({ onSwitchToLogin }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);

  const [passwordErrors, setPasswordErrors] = useState([]);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "", // backend requirement placeholder
  });

  const [agreed, setAgreed] = useState(false);

  const onChangeHandler = (e) => {
    dispatch(resetAuthError());
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handlePasswordChange = (e) => {
    const value = e.target.value;

    // 1️⃣ update form data
    setData((prev) => ({
      ...prev,
      password: value,
    }));

    // 2️⃣ validate password
    const errors = validatePassword(value);
    setPasswordErrors(errors);
  };

  const handleSignup = async (e) => {
    const errors = validatePassword(data.password);
    if (errors.length > 0) {
      setPasswordErrors(errors);
      return; // ❌ stop here
    }
    e.preventDefault();

    if (!agreed) return;

    const result = await dispatch(
      register({
        username: data.name,
        email: data.email,
        password: data.password,
        role: "USER",
      }),
    );

    if (register.fulfilled.match(result)) {
      onSwitchToLogin();
    }
  };

  return (
    <form
      onSubmit={handleSignup}
      className="flex flex-col gap-4"
      onClick={() => dispatch(resetAuthError())}
      onFocus={() => dispatch(resetAuthError())}
    >
      {/* Full Name */}
      <input
        type="text"
        name="name"
        value={data.name}
        onChange={onChangeHandler}
        placeholder="Full Name"
        required
        className="w-full border border-gray-300 rounded-xl px-4 py-3
                   text-gray-800 placeholder-gray-400
                   focus:outline-none focus:border-red-400"
      />

      {/* Email */}
      <input
        type="email"
        name="email"
        value={data.email}
        onChange={onChangeHandler}
        placeholder="Email"
        required
        className="w-full border border-gray-300 rounded-xl px-4 py-3
                   text-gray-800 placeholder-gray-400
                   focus:outline-none focus:border-red-400"
      />
      <input
        type="password"
        name="password"
        value={data.password}
        onChange={handlePasswordChange}
        placeholder="Password"
        required
        className="w-full border border-gray-300 rounded-xl px-4 py-3
             text-gray-800 placeholder-gray-400
             focus:outline-none focus:border-red-400"
      />

      <ul>
        {passwordErrors.map((err, idx) => (
          <li key={idx} style={{ color: "red" }}>
            {err}
          </li>
        ))}
      </ul>

      {/* Terms */}
      <label className="flex items-start gap-3 text-sm text-gray-600">
        <input
          type="checkbox"
          checked={agreed}
          onChange={() => setAgreed(!agreed)}
          className="mt-1 accent-red-500"
        />
        <span>
          I agree to Tomato&apos;s{" "}
          <span className="text-red-500 cursor-pointer">Terms of Service</span>,{" "}
          <span className="text-red-500 cursor-pointer">Privacy Policy</span>{" "}
          and{" "}
          <span className="text-red-500 cursor-pointer">Content Policies</span>
        </span>
      </label>

      {/* Backend error */}
      <AuthError />

      {/* Create Account */}
      <button
        type="submit"
        disabled={!agreed || status === "loading"}
        className={`w-full py-3 rounded-xl text-white font-medium transition
          ${
            !agreed || status === "loading"
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-black hover:bg-gray-900"
          }`}
      >
        {status === "loading" ? "Please wait..." : "Create account"}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 my-2">
        <hr className="flex-grow border-gray-300" />
        <span className="text-gray-400 text-sm">or</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      {/* Google */}
      <button
        type="button"
        onClick={beginGoogleOAuth}
        className="w-full flex items-center justify-center gap-3 py-3
                   border border-gray-300 rounded-xl
                   hover:bg-gray-50 transition"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="google"
          className="w-5 h-5"
        />
        <span className="text-gray-700 font-medium">Sign in with Google</span>
      </button>

      {/* Footer */}
    </form>
  );
};

SignupForm.propTypes = {
  onSwitchToLogin: PropTypes.func.isRequired,
};

export default SignupForm;

