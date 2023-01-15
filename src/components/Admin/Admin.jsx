import { useState } from "react";
import { AllSales } from "../AllSales/AllSales";
import { AllUsers } from "../AllUsers/AllUsers";

import "./admin.css";
import "../../index.css";


export const Admin = () => {
  const [flag, setFlag] = useState(true);

  return (
    <div className="adminDesign container-fluid d-flex flex-column align-items-center">
      <div className="my-2">
        <div
          className="btn btn-warning mx-1 my-1"
          onClick={() => setFlag(true)}
        >
          Users
        </div>
        <div
          className="btn btn-warning mx-1 my-1"
          onClick={() => setFlag(false)}
        >
          Sales
        </div>
      </div>
      <div>{flag ? <AllUsers /> : <AllSales />}</div>
    </div>
  );
};
