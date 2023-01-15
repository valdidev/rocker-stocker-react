import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdDoneAll } from "react-icons/md";
import { ButtonSpinner } from "../../common/ButtonSpinner/ButtonSpinner"
import { axiosPost } from "../../api/axios";
import { useShopContext } from "../../contexts/ShopContext";
import { TYPES } from "../../actions/shoppingAction";
import "../../index.css";

export const Transaction = () => {
  const { dispatch } = useShopContext();
  const { state } = useLocation();

  console.log(state);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const prepareBody = () => {
    let cart = [];

    try {
      setIsLoading(true);

      state?.cart?.map((item) => {
        const { articleId, quantity } = item;
        cart.push({ articleId, quantity });
      });

      let finalBody = [{ total: state.total }, { cart }];
      console.log(finalBody);
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
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="d-flex flex-column justify-content-start">
              <div className="transactionHeader d-flex justify-content-center align-items-center">
                <h3 className="text-white st-back-rs">Sale details</h3>
              </div>
              <div className="trasactionBody container">
                <table className="table">
                  <thead>
                    <tr className="bg-success">
                      <th>Article</th>
                      <th>Price €</th>
                      <th>Units</th>
                      <th>Amount €</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state?.cart?.map((article) => (
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
              <div className="transactionFooter bg-black-rs d-flex flex-column justify-content-center align-items-center rounded border-dark-rs">
                <div className="text-white bg-black-dark-rs w-100 text-center">
                  <span>Total: </span>
                  {state.total} €
                </div>
                <div className="p-1">
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
    </div>
  );
};
