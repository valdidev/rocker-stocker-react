import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

export const PublicRoute = () => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/private" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};
