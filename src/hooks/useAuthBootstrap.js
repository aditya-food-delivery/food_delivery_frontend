import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadCurrentUser } from "../features/auth/authThunks";

/**
 * Loads user on app startup (refresh-safe auth)
 */
export const useAuthBootstrap = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCurrentUser());
  }, [dispatch]);
};
