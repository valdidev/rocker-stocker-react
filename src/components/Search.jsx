import { useEffect, useState } from "react";
import { AiFillFormatPainter, AiFillThunderbolt } from "react-icons/ai";
import { TfiHummer } from "react-icons/tfi";
import { FaCartPlus } from "react-icons/fa";
import { TYPES } from "../actions/shoppingAction";
import { axiosGet } from "../api/axios";
import { Spinner } from "../common/Spinner";
import { useShopContext } from "../contexts/ShopContext";

import "../index.css";

export const Search = () => {
  const [found, setFound] = useState(null);
  const [category, setCategory] = useState("construction");
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = useShopContext();

  const addToCart = (item) => {
    dispatch({
      type: TYPES.ADD_ONE_TO_CART,
      payload: item,
    });
  };

  // TODO: refactor -> jwt in axios file
  const userLogged = JSON.parse(localStorage.getItem("RS_USER"));
  const userJwt = userLogged.jwt;

  useEffect(() => {
    try {
      setIsLoading(true);
      axiosGet("article/category", category, userJwt).then((data) => {
        setFound(data.data);
        setIsLoading(false);
      });
    } catch (error) {
      setFound(null);
      setIsLoading(false);
    }
  }, [category]);

  return (
    <div className="contentDesign">
      <div className="d-flex flex-column align-items-center">
        <div className="d-flex p-2">
          <div
            className="btn btn-success mx-1"
            onClick={() => setCategory("construction")}
          >
            <TfiHummer size="2em" />
          </div>
          <div
            className="btn btn-success mx-1"
            onClick={() => setCategory("electricity")}
          >
            <AiFillThunderbolt size="2em" />
          </div>
          <div
            className="btn btn-success mx-1"
            onClick={() => setCategory("painting")}
          >
            <AiFillFormatPainter size="2em" />
          </div>
        </div>
        <div className="d-flex"></div>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Brand</th>
              <th>Price €</th>
              <th>Units</th>
              <th>ADD</th>
            </tr>
          </thead>
          <tbody>
            {found?.map((item) => {
              return (
                <tr key={item.id}>
                  <td data-label="name">{item.name}</td>
                  <td data-label="brand">{item.brand}</td>
                  <td data-label="price">{item.price}</td>
                  <td data-label="units">{item.units}</td>
                  <td data-label="units">
                    {
                      <div
                        className="btn btn-success"
                        onClick={() => addToCart(item)}
                      >
                        <FaCartPlus />
                      </div>
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
