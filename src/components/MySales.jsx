import { useEffect, useState } from "react";
import { axiosGet } from "../api/axios";
import { NoSales } from "../common/NoSales";
import { Spinner } from "../common/Spinner";

import "./mySales.css";

export const MySales = () => {
  const [sales, setSales] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const userLogged = JSON.parse(localStorage.getItem("RS_USER"));

  const userJwt = userLogged.jwt;

  useEffect(() => {
    try {
      setIsLoading(true);
      axiosGet("sale/mysales", userLogged.id, userJwt).then((data) => {
        setSales(data.data);
        setIsLoading(false);
      });
    } catch (error) {
      setSales(null);
      setIsLoading(false);
      console.log(error);
    }
  }, []);

  if (!sales && isLoading) {
    return <Spinner />;
  } else if (!sales && !isLoading) {
    return <NoSales />;
  }

  return (
    <div className="contentDesign">
      <h1 className="text-center">SALES - {userLogged.name.toUpperCase()}</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Sale #</th>
            <th>Date</th>
            <th>Total €</th>
          </tr>
        </thead>
        <tbody>
          {sales?.map((sale) => {
            return (
              <tr key={sale.id}>
                <td data-label="Sale">{sale.id}</td>
                <td data-label="Date">{sale.date}</td>
                <td data-label="Total">{sale.total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
