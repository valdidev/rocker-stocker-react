import { useState } from "react";
import { AllSales } from "../AllSales/AllSales";
import { AllUsers } from "../AllUsers/AllUsers";
import "./admin.css";

export const Admin = () => {
  const [flag, setFlag] = useState(true);

  return (
    <div className="adminDesign container-fluid d-flex flex-column align-items-center">
      <div className="my-4">
        <div
          className="btn btn-warning mx-3 my-1 p-3 fs-6"
          onClick={() => setFlag(true)}
        >
          Users
        </div>
        <div
          className="btn btn-warning mx-3 my-1 p-3 fs-6"
          onClick={() => setFlag(false)}
        >
          Sales
        </div>
      </div>
      <div className="adminDesign_tables">
        {flag ? <AllUsers /> : <AllSales />}
      </div>
    </div>
  );
};
