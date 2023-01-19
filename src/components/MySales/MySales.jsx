import { useContext, useEffect, useState } from "react";
import { NoSales } from "../../common/NoSales/NoSales";
import { axiosGet } from "../../api/axios";
import { Spinner } from "../../common/Spinner/Spinner";
import { CgDetailsMore } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import usePagination from "../../hooks/usePagination";
import { Pagination } from "../../common/Pagination/Pagination";
import { AuthContext } from "../../contexts/AuthContext2";
import "./mySales.css";

export const MySales = () => {
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
      axiosGet("sale/mysales", user?.id, user?.jwt).then((data) => {
        setSales(data?.data);
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
      <h1 className="text-center text-black mySalesDesign_email py-3">
        {user?.email}
      </h1>
      <div className="tableContainer">
        <div className="tableContainer_spacing">
          <table className="table container box-shadow-rs ">
            <thead>
              <tr className="bg-black-rs">
                <th>Sale #</th>
                <th>Date</th>
                <th>Total €</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {paginatedSales?.map((sale) => {
                return (
                  <tr key={sale.id} className="cursor-pointer">
                    <td data-label="Sale #">{sale.id}</td>
                    <td data-label="Date">{sale.date.split("T")[0]}</td>
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
    </div>
  );
};
