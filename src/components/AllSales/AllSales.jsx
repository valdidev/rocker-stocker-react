import { useEffect, useState } from "react";
import { CgDetailsMore } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { axiosGet } from "../../api/axios";
import { Spinner } from "../../common/Spinner/Spinner";
import "../../index.css";
import "./allSales.css";

export const AllSales = () => {
  const [sales, setSales] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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
    }
  }, []);

  if (!sales && isLoading) {
    return <Spinner />;
  }

  return (
    <table className="table box-shadow-rs">
      <thead>
        <tr className="bg-black-rs">
          <th>Sale #</th>
          <th>Date</th>
          <th>Employee #</th>
          <th>Total €</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {sales?.map((sale) => {
          return (
            <tr key={sale.id}>
              <td data-label="Sale #">{sale.id}</td>
              <td data-label="Date">{sale.date.split("T")[0]}</td>
              <td data-label="Employee #">{sale.userId}</td>
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
  );
};