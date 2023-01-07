import { Outlet } from "react-router-dom";
import { Navbar } from "../common/Navbar";

export const NavbarLayout = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};
