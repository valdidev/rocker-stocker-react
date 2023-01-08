import React from "react";
import { IoStatsChart } from "react-icons/io5";
import "../index.css";

export const NoSales = () => {
  return (
    <div className="contentDesign d-flex justify-content-center align-items-center">
      <div className="d-flex flex-column align-items-center">
        <IoStatsChart size="4em" color="#2f3247" />
        <h5 className="no-sales-yet">No sales yet</h5>
      </div>
    </div>
  );
};
