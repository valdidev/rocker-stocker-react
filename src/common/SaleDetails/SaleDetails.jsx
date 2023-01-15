import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosGet } from "../../api/axios";
import { Spinner } from "../Spinner/Spinner";
import "../../index.css";


export const SaleDetails = () => {
  const { saleId } = useParams();

  const [saleDetails, setSaleDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axiosGet("sale/details", saleId)
      .then((result) => {
        setSaleDetails(result.data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (!saleDetails || isLoading) return <Spinner />;

  return (
    <div>
      <h1 className="text-center">Details of sale # {saleId}</h1>
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
          {saleDetails?.map((sale) => {
            return (
              <tr key={sale.id} className="cursor-pointer">
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
  );
};
