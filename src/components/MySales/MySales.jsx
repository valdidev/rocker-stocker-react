import { useEffect, useState } from "react";
import { NoSales } from "../../common/NoSales/NoSales";
import { axiosGet } from "../../api/axios";
import { Spinner } from "../../common/Spinner/Spinner";
import { CgDetailsMore } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import usePagination from "../../hook/usePagination";
import { Pagination } from "../../common/Pagination/Pagination";

import "./mySales.css";

export const MySales = () => {
  const [sales, setSales] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const itemsPerPage = 5;

  const { currentData, currentPage, maxPage, next, prev } = usePagination(
    sales,
    itemsPerPage
  );

  const paginatedSales = currentData();

  console.log("full sales", sales);
  console.log("paginated", paginatedSales);

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

  if (isLoading) {
    return <Spinner />;
  } else if (!sales && !isLoading) {
    return <NoSales />;
  }

  return (
    <div className="mySalesDesign">
      <h1 className="text-center text-white st-back-rs">{userLogged.email}</h1>
      <table className="table container box-shadow-rs">
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
      <Pagination
        currentPage={currentPage}
        maxPage={maxPage}
        next={next}
        prev={prev}
      />
    </div>
  );
};
