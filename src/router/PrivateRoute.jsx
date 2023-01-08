import { Navigate, Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";

export const PrivateRoute = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};
