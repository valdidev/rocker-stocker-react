import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosGet } from "../../api/axios";
import { Spinner } from "../Spinner/Spinner";
import usePagination from "../../hook/usePagination";
import { Pagination } from "../Pagination/Pagination";
import { AuthContext } from "../../contexts/AuthContext2";
import "../../index.css";
import "./saleDetails.css";

export const SaleDetails = () => {
  const { saleId } = useParams();

  const [saleDetails, setSaleDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const salesPerTable = 10;

  const { currentData, currentPage, maxPage, next, prev } = usePagination(
    saleDetails,
    salesPerTable
  );

  const paginatedSaleDetails = currentData();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    axiosGet("sale/details", saleId, user?.jwt)
      .then((result) => {
        setSaleDetails(result.data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (!saleDetails || isLoading) return <Spinner />;

  return (
    <div className="saleDetailsDesign pb-2">
      <h1 className="text-center text-black">
        Details of sale # {saleId}
      </h1>
      <div className="tableContainer">
        <table className="table container">
          <thead>
            <tr className="bg-info">
              <th>Article #</th>
              <th>Name</th>
              <th>Price €</th>
              <th>Quantity #</th>
            </tr>
          </thead>
          <tbody>
            {paginatedSaleDetails?.map((sale, index) => {
              return (
                <tr key={index} className="cursor-pointer">
                  <td data-label="Article #">{sale.articleId}</td>
                  <td data-label="Name">Cemento</td>
                  <td data-label="Price €">25</td>
                  <td data-label="Quantity">{sale.quantity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {saleDetails?.length > salesPerTable && (
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
