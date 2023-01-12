import { useState } from "react";
import { TYPES } from "../actions/shoppingAction";
import { Spinner } from "../common/Spinner";
import { useShopContext } from "../contexts/ShopContext";
import { FaTrashAlt, FaWindowClose } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import {
  BsFillArrowUpSquareFill,
  BsFillArrowDownSquareFill,
} from "react-icons/bs";

import "../index.css";
import "./cart.css";
import { EmptyCart } from "./EmptyCart";

export const Cart = () => {
  const { cart, total, products, dispatch } = useShopContext();
  const [isLoading, setIsLoading] = useState(false);

  const addToCart = (id) => {
    console.log("add", id);
    dispatch({
      type: TYPES.ADD_ONE_TO_CART,
      payload: id,
    });
    console.log(cart);
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

  if (isLoading) return <Spinner />;

  if (products?.length === 0) return <EmptyCart />;

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
                        <span onClick={() => console.log("add one")}>
                          <BsFillArrowUpSquareFill
                            color="green"
                            cursor="pointer"
                            size="1.5em"
                          />
                        </span>

                        <span className="p-1 fw-bold">{product.quantity}</span>
                        <span onClick={() => console.log("remove one")}>
                          <BsFillArrowDownSquareFill
                            color="red"
                            cursor="pointer"
                            size="1.5em"
                          />
                        </span>
                      </div>
                      <div
                        className="text-center bg-white"
                        onClick={() => console.log("remove product")}
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
                  <div
                    className="btn btn-danger"
                    onClick={() => console.log("clear")}
                  >
                    <FaTrashAlt />
                  </div>
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="col-12 col-md-4 p-2 bg-black-dark-rs text-white d-flex flex-column justify-content-center align-items-center">
          <div className="d-flex flex-column align-items-center justify-content-center">
            <h4>Total 23 €</h4>
          </div>
          <div className="">
            <div
              className="btn btn-success mx-1"
              onClick={() => console.log("selling...", products)}
            >
              <MdDone size="2em" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
