import { useEffect, useState } from "react";
import { axiosGet } from "../api/axios";
import { Spinner } from "../common/Spinner";
import "../index.css";

export const AllSales = () => {
  const [sales, setSales] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const userLogged = JSON.parse(localStorage.getItem("RS_USER"));

  const userJwt = userLogged.jwt;

  useEffect(() => {
    try {
      setIsLoading(true);
      axiosGet("sale/all", "", userJwt).then((data) => {
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
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Sale #</th>
          <th>Date</th>
          <th>Employee #</th>
          <th>Total €</th>
        </tr>
      </thead>
      <tbody>
        {sales?.map((sale) => {
          return (
            <tr key={sale.id}>
              <td data-label="saleId">{sale.id}</td>
              <td data-label="date">{sale.date.split("T")[0]}</td>
              <td data-label="employeeId">{sale.userId}</td>
              <td data-label="total">{sale.total}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
