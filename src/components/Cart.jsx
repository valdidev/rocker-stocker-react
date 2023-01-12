import { useEffect, useState } from "react";
import { TYPES } from "../actions/shoppingAction";
import { axiosGet } from "../api/axios";
import { Spinner } from "../common/Spinner";
import { useShopContext } from "../contexts/ShopContext";
import {
  FaTrashAlt,
  FaArrowCircleUp,
  FaArrowCircleDown,
  FaWindowClose,
} from "react-icons/fa";

import {
  BsFillArrowUpSquareFill,
  BsFillArrowDownSquareFill,
} from "react-icons/bs";

import { MdDone } from "react-icons/md";

import "../index.css";
import "./cart.css";

const userLogged = JSON.parse(localStorage.getItem("RS_USER"));
const userJwt = userLogged.jwt;

export const Cart = () => {
  const { cart, total, dispatch } = useShopContext();
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

  const products = [];

  const getCurrentProducts = () => {
    cart?.map((item) => {
      axiosGet("article/id", item.articleId, userJwt).then((data) => {
        products.push(data.data);
      });
    });
  };

  useEffect(() => {
    setIsLoading(true);
    getCurrentProducts();
    setIsLoading(false);
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <main className="container-fluid">
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
            <tbody>
              <tr className="bg-secondary">
                <td data-label="Name" className="align-middle">
                  Cemento
                </td>
                <td data-label="Price" className="align-middle">
                  3
                </td>
                <td data-label="Units" className="align-middle">
                  <tr className="d-flex justify-content-center">
                    <td className="bg-white">
                      <span onClick={() => console.log("add one")}>
                        <BsFillArrowUpSquareFill
                          color="green"
                          cursor="pointer"
                          size="1.5em"
                        />
                      </span>

                      <span className="p-1 text-black fw-bold">25</span>
                      <span onClick={() => console.log("remove one")}>
                        <BsFillArrowDownSquareFill
                          color="red"
                          cursor="pointer"
                          size="1.5em"
                        />
                      </span>
                    </td>
                    <td
                      className="text-center bg-white"
                      onClick={() => console.log("remove product")}
                    >
                      <FaWindowClose
                        size="1.5em"
                        cursor="pointer"
                        color="red"
                      />
                    </td>
                  </tr>
                </td>
                <td>
                  250
                </td>
              </tr>
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
              onClick={() => console.log("selling...")}
            >
              <MdDone size="2em" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
