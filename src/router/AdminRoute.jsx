import { Navigate, Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";

export const AdminRoute = () => {
  const { user } = useContext(AuthContext);

  if (user.rolId !== 1) {
    return <Navigate to="/private" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};
