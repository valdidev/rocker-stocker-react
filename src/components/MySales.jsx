import { useEffect, useState } from "react";
import { axiosGet } from "../api/axios";
import { NoSales } from "../common/NoSales";

import "./mySales.css";

export const MySales = () => {
  const [sales, setSales] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const userLogged = JSON.parse(localStorage.getItem("RS_USER"));

  const userJwt = userLogged.jwt;

  useEffect(() => {
    try {
      setIsLoading(true);
      let res = axiosGet("sale/mysales", userLogged.id, userJwt).then((data) =>
        setSales(data.data)
      );
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }, []);

  if (sales){
    return <NoSales />;
  } else {
    console.log(sales);
  }

  return (
    <div className="contentDesign">
      <h1 className="text-center">SALES</h1>
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
