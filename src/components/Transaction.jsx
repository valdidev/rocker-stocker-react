import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdDone, MdDoneAll } from "react-icons/md";
import { ButtonSpinner } from "../common/ButtonSpinner";
import "../index.css";
import "./transaction.css";
import { axiosPost } from "../api/axios";
import { useShopContext } from "../contexts/ShopContext";
import { TYPES } from "../actions/shoppingAction";

export const Transaction = () => {
  const { dispatch } = useShopContext();

  const { state } = useLocation();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const prepareBody = () => {
    try {
      setIsLoading(true);
      const cart = [];

      state.map((item) => {
        const { articleId, quantity } = item;
        cart.push({ articleId, quantity });
      });

      let finalBody = [{ total: 47 }, { cart }];

      setIsReady(true);
      sendBody(finalBody);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const sendBody = (finalBody) => {
    axiosPost("sale/sell", "", finalBody)
      .then((data) => console.log(data))
      .then(() => {
        dispatch({ type: TYPES.CLEAR_CART });
      })
      .finally(() => navigate("/private/mysales"));
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
                      <th>Price €</th>
                      <th>Units</th>
                      <th>Amount €</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state?.map((article) => (
                      <tr key={article.id} className="cursor-pointer">
                        <td data-label="Article">{article.name}</td>
                        <td data-label="Price">{article.price}</td>
                        <td data-label="Units">{article.quantity}</td>
                        <td data-label="Amount">
                          {article.price * article.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="transactionFooter bg-danger d-flex justify-content-center align-items-center">
                {!isLoading ? (
                  <div className="btn btn-success">
                    <MdDoneAll size="1.5em" onClick={prepareBody} />
                  </div>
                ) : (
                  <ButtonSpinner />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
