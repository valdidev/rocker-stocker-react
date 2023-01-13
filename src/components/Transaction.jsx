import { useState } from "react";
import { useLocation } from "react-router-dom";
import { axiosGet } from "../api/axios";
import { Spinner } from "../common/Spinner";

import "../index.css";
import "./transaction.css";

export const Transaction = () => {
  const { state } = useLocation();
  const [notInStock, setNotInStock] = useState([]);
  const [isClosedCart, setIsClosedCart] = useState(false);

  let unclosedCart = state.unclosedCart;

  console.log(unclosedCart);

  const getProductsAndCheckStock = () => {
    unclosedCart.map((article) => {
      axiosGet("article/id", article.articleId).then((result) => {
        if (result.data.units === false) {
          setNotInStock(article.name);
        }
      });
    });
    console.log(notInStock);
  };

  return (
    <div className="contentDesign">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className=" contentDesign d-flex flex-column justify-content-start bg-info">
              <div className="transactionHeader d-flex justify-content-center align-items-center bg-secondary">
                <h3>Sale details</h3>
              </div>
              <div className="trasactionBody bg-success container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Article</th>
                      <th>Price</th>
                      <th>Units</th>
                      <th>Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unclosedCart?.map((article) => {
                      return (
                        <tr key={article.id} className="cursor-pointer">
                          <td data-label="Article">{article.name}</td>
                          <td data-label="Price">{article.price}</td>
                          <td data-label="Units">{article.quantity}</td>
                          <td data-label="Stock">OK</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="transactionFooter bg-danger d-flex justify-content-center align-items-center">
                <div className="btn btn-success">PAY</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
