import { useState } from "react";
import "../index.css";
import { AllSales } from "./AllSales";
import { AllUsers } from "./AllUsers";

export const Admin = () => {
  const [flag, setFlag] = useState(true);

  return (
    <div className="contentDesign container-fluid d-flex flex-column align-items-center">
    <h1>Manager zone</h1>
      <div>
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
