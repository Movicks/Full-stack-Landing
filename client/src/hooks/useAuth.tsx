// useAuth.tsx hook
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/rootReducer";
import { logout } from "../features/auth/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth,
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    user,
    loading,
    error,
    handleLogout,
  };
};
