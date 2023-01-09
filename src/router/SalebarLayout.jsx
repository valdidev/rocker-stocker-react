import { Outlet } from "react-router-dom";
import { Salebar } from "../common/Salebar/Salebar";

export const SalebarLayout = () => {
  return (
    <div>
      <Salebar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};
