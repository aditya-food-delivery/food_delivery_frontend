import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FullPageSpinner from "../utils/FullPageSpinner";
import { loadCurrentUser } from "../features/auth/authThunks";
import { closeAuthModal } from "../features/auth/authSlice";

const GoogleAuthCallbackPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const completeGoogleLogin = async () => {
      const result = await dispatch(loadCurrentUser());

      if (!isMounted) {
        return;
      }

      dispatch(closeAuthModal());

      if (loadCurrentUser.fulfilled.match(result)) {
        navigate("/", { replace: true });
        return;
      }

      navigate("/", { replace: true, state: { authError: "google-login-failed" } });
    };

    completeGoogleLogin();

    return () => {
      isMounted = false;
    };
  }, [dispatch, navigate]);

  return <FullPageSpinner />;
};

export default GoogleAuthCallbackPage;
