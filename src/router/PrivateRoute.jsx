import { Navigate, Outlet } from "react-router-dom";
// import { useAuthContext } from "../contexts/authContext";

export const PrivateRoute = () => {
  // const { isAuthenticated } = useAuthContext();

  // if (!isAuthenticated) {
  //   return <Navigate to="/" />;
  // }

  return (
    <div>
      <Outlet />
    </div>
  );
};
