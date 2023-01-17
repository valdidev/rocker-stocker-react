import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext2";

export const PublicRoute = () => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/private/home/cart" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};
