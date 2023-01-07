import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

export const PrivateRoute = () => {

  const { auth } = useContext(AuthContext);

  if (!auth) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};
