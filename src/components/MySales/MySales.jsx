import { useEffect, useState } from "react";
import { NoSales } from "../../common/NoSales";
import { axiosGet } from "../../api/axios";
import { Spinner } from "../../common/Spinner";
import { CgDetailsMore } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

import "./mySales.css";

export const MySales = () => {
  const [sales, setSales] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const userLogged = JSON.parse(localStorage.getItem("RS_USER"));

  useEffect(() => {
    try {
      setIsLoading(true);
      axiosGet("sale/mysales", userLogged.id).then((data) => {
        setSales(data.data);
        setIsLoading(false);
      });
    } catch (error) {
      setSales(null);
      setIsLoading(false);
    }
  }, []);

  if (!sales && isLoading) {
    return <Spinner />;
  } else if (!sales && !isLoading) {
    return <NoSales />;
  }

  return (
    <div className="contentDesign container">
      <h1 className="text-center">{userLogged.email}</h1>
      <table className="table">
        <thead>
          <tr className="bg-black-rs">
            <th>Sale #</th>
            <th>Date</th>
            <th>Total €</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {sales?.map((sale) => {
            return (
              <tr key={sale.id} className="cursor-pointer">
                <td data-label="Sale #">{sale.id}</td>
                <td data-label="Date">{sale.date.split("T")[0]}</td>
                <td data-label="Total €">{sale.total}</td>
                <td data-label="Details">
                  <div
                    className="btn btn-info"
                    onClick={() => navigate(`/private/sale/details/${sale.id}`)}
                  >
                    <CgDetailsMore />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
