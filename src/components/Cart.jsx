import { useState } from "react";
import { TYPES } from "../actions/shoppingAction";
import { Spinner } from "../common/Spinner";
import { useShopContext } from "../contexts/ShopContext";
import { FaTrashAlt, FaWindowClose, FaArrowRight } from "react-icons/fa";
import {
  BsFillArrowUpSquareFill,
  BsFillArrowDownSquareFill,
} from "react-icons/bs";
import { EmptyCart } from "./EmptyCart";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";

export const Cart = () => {
  const { cart, total, dispatch } = useShopContext();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const addToCart = (item) => {
    dispatch({
      type: TYPES.ADD_ONE_TO_CART,
      payload: item,
    });
  };

  const deleteFromCart = (id, all = false) => {
    if (all) {
      dispatch({ type: TYPES.REMOVE_PRODUCT_FROM_CART, payload: id });
    } else {
      dispatch({ type: TYPES.REMOVE_ONE_FROM_CART, payload: id });
    }
  };

  const clearCart = () => {
    dispatch({ type: TYPES.CLEAR_CART });
  };

  const sendTransaction = () => {
    navigate("/private/home/cart/transaction");
  };

  if (isLoading) return <Spinner />;

  if (cart?.length === 0) return <EmptyCart />;

  return (
    <main className="container-fluid contentDesign bg-secondary p-1">
      <div className="row m-1">
        <div className="col-12 col-md-8">
          <table className="table text-white">
            <thead>
              <tr className="bg-primary">
                <th>Article</th>
                <th>Price €</th>
                <th>Units</th>
                <th>Amount €</th>
              </tr>
            </thead>
            <tbody className="text-black">
              {cart?.map((product) => (
                <tr key={product.id} className="bg-secondary">
                  <td data-label="Name" className="align-middle bg-white">
                    {product.name}
                  </td>
                  <td data-label="Price" className="align-middle bg-white">
                    {product.price}
                  </td>
                  <td data-label="Units" className="align-middle bg-white">
                    <div className="d-flex justify-content-evenly">
                      <div className="bg-white">
                        <span
                          onClick={() =>
                            addToCart({ ...product, id: product.articleId })
                          }
                        >
                          <BsFillArrowUpSquareFill
                            color="green"
                            cursor="pointer"
                            size="1.5em"
                          />
                        </span>

                        <span className="p-1 fw-bold">{product.quantity}</span>
                        <span onClick={() => deleteFromCart(product.articleId)}>
                          <BsFillArrowDownSquareFill
                            color="red"
                            cursor="pointer"
                            size="1.5em"
                          />
                        </span>
                      </div>
                      <div
                        className="text-center bg-white"
                        onClick={() => deleteFromCart(product.articleId, true)}
                      >
                        <FaWindowClose
                          size="1.5em"
                          cursor="pointer"
                          color="red"
                        />
                      </div>
                    </div>
                  </td>
                  <td data-label="Amount" className="align-middle bg-white">
                    {product.price * product.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-black-rs">
                <th colSpan={4}>
                  <div className="btn btn-danger" onClick={() => clearCart()}>
                    <FaTrashAlt />
                  </div>
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="col-12 col-md-4 p-2 bg-black-dark-rs text-white d-flex flex-column justify-content-center align-items-center">
          <div className="d-flex flex-column align-items-center justify-content-center">
            <h4>Total: {total} €</h4>
          </div>
          <div className="">
            <div className="btn btn-success mx-1">
              <Link to="/private/home/cart/transaction" state={cart}>
                <FaArrowRight size="2em" color="#fff" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};