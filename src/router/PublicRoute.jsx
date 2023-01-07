import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";

export const PublicRoute = () => {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to="/private" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};
