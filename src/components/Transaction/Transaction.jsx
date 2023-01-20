import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdDoneAll } from "react-icons/md";
import { ButtonSpinner } from "../../common/ButtonSpinner/ButtonSpinner";
import { axiosPost } from "../../api/axios";
import { useShopContext } from "../../contexts/ShopContext";
import { TYPES } from "../../actions/shoppingAction";
import usePagination from "../../hooks/usePagination";
import { Pagination } from "../../common/Pagination/Pagination";
import { AuthContext } from "../../contexts/AuthContext2";
import Swal from "sweetalert2";
import {
  axiosErrorNotification,
  toastNotification,
} from "../../utils/notificationMatcher";
import "./transaction.css";

export const Transaction = () => {
  const { dispatch } = useShopContext();
  const { state } = useLocation();

  const productsPerTable = 5;

  const { currentData, currentPage, maxPage, next, prev } = usePagination(
    state.cart,
    productsPerTable
  );

  const confirmSale = () => {
    Swal.fire({
      title: `Total to pay: ${state?.total} €`,
      text: "Do you confirm the sale?",
      icon: "info",
      showDenyButton: true,
      confirmButtonText: "PAY",
      confirmButtonColor: "#198754",
      denyButtonText: "Cancel",
      denyButtonColor: "#c1121f",
    }).then((result) => {
      if (result.isConfirmed) {
        prepareBody();
      }
    });
  };

  const paginatedProducts = currentData();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const prepareBody = () => {
    let cart = [];

    try {
      setIsLoading(true);

      state?.cart?.map((item) => {
        const { articleId, quantity } = item;
        cart.push({ articleId, quantity });
      });

      let finalBody = [{ total: state.total }, { cart }];
      sendBody(finalBody);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const sendBody = (finalBody) => {
    axiosPost("sale/sell", "", finalBody, user?.jwt)
      .then((data) => toastNotification(data))
      .then(() => {
        dispatch({ type: TYPES.CLEAR_CART });
      })
      .catch((err) => axiosErrorNotification(err))
      .finally(() => navigate("/private/mysales"));
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="d-flex flex-column justify-content-start">
              <div className="transactionHeader d-flex justify-content-center align-items-center">
                <h3 className="text-black fs-1 py-4">Sale details</h3>
              </div>
              <div className="trasactionBody container tableContainer">
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
                    {paginatedProducts?.map((article, index) => (
                      <tr key={index} className="cursor-pointer">
                        <td data-label="Article">{article.name}</td>
                        <td data-label="Price €">{article.price}</td>
                        <td data-label="Units">{article.quantity}</td>
                        <td data-label="Amount €">
                          {article.price * article.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {state.cart?.length > productsPerTable && (
                <Pagination
                  currentPage={currentPage}
                  maxPage={maxPage}
                  next={next}
                  prev={prev}
                />
              )}
              <div className="transactionFooter bg-black-rs d-flex flex-column justify-content-center align-items-center rounded border-dark-rs my-3">
                <div className="text-white bg-black-dark-rs w-100 fs-5 text-center">
                  <span className="fw-bold ">Total: </span>
                  {state.total} €
                </div>
                <div className="transanctionDesign_footer p-4">
                  {!isLoading ? (
                    <div className="btn btn-success">
                      <MdDoneAll size="2em" onClick={confirmSale} />
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
