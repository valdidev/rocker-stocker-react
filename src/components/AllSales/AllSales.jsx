import { useContext, useEffect, useState } from "react";
import { CgDetailsMore } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { axiosGet } from "../../api/axios";
import { NoSales } from "../../common/NoSales/NoSales";
import { Pagination } from "../../common/Pagination/Pagination";
import { Spinner } from "../../common/Spinner/Spinner";
import { AuthContext } from "../../contexts/AuthContext2";
import usePagination from "../../hooks/usePagination";
import "../../index.css";
import "./allSales.css";

export const AllSales = () => {
  const [sales, setSales] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const salesPerTable = 5;

  const { currentData, currentPage, maxPage, next, prev } = usePagination(
    sales,
    salesPerTable
  );

  const paginatedSales = currentData();

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    try {
      setIsLoading(true);
      axiosGet("sale/all", "", user?.jwt).then((data) => {
        setSales(data.data);
        setIsLoading(false);
      });
    } catch (error) {
      setSales(null);
      setIsLoading(false);
    }
  }, []);

  if (!sales && isLoading) return <Spinner />;

  if (!sales) return <NoSales />;

  return (
    <div className="tableContainer">
      <div className="containerTable">
        <table className="table box-shadow-rs container">
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
            {paginatedSales?.map((sale) => {
              return (
                <tr key={sale.id}>
                  <td data-label="Sale #">{sale.id}</td>
                  <td data-label="Date">{sale.date.split("T")[0]}</td>
                  <td data-label="Employee #">{sale.userId}</td>
                  <td data-label="Total €">{sale.total}</td>
                  <td data-label="Details">
                    <div
                      className="btn btn-info"
                      onClick={() =>
                        navigate(`/private/sale/details/${sale.id}`)
                      }
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
      {sales?.length > salesPerTable && (
        <Pagination
          currentPage={currentPage}
          maxPage={maxPage}
          next={next}
          prev={prev}
        />
      )}
    </div>
  );
};
