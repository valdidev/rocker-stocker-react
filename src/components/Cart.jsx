import { TYPES } from "../actions/shoppingAction";
import { useShopContext } from "../contexts/ShopContext";
import "../index.css";

import "./cart.css";

export const Cart = () => {
  const { cart, total, dispatch } = useShopContext();

  const addToCart = (id) => {
    console.log("add", id);
    dispatch({
      type: TYPES.ADD_ONE_TO_CART,
      payload: id,
    });
  };

  const deleteFromCart = (id, all = false) => {
    if (all) {
      dispatch({ type: TYPES.REMOVE_ALL_FROM_CART, payload: id });
    } else {
      dispatch({ type: TYPES.REMOVE_ONE_FROM_CART, payload: id });
    }
  };

  const clearCart = () => {
    dispatch({ type: TYPES.CLEAR_CART });
  };

  return (
    <div className="contentDesign">
      <h1>CART</h1>
      <h2>Products</h2>
      <ul>
        {cart?.map((item, index) => (
          <li key={index}>
            ARTICLE ID: {item.articleId}. X {item.quantity}
            <button
              className="mx-2 my-1 btn btn-success"
              onClick={() => addToCart(item.articleId)}
            >
              +
            </button>
            <button
              className="mx-2 my-1 btn btn-warning"
              onClick={() => deleteFromCart(item.articleId)}
            >
              -
            </button>
            <button
              className="mx-2 my-1 btn btn-danger"
              onClick={() => deleteFromCart(item.articleId, true)}
            >
              x
            </button>
          </li>
        ))}
      </ul>
      <h5>TOTAL: {total}</h5>
      <button
        className="btn mx-2 btn-success"
        onClick={() => console.log("selling...")}
      >
        SELL
      </button>
      <button className="btn mx-2 btn-danger" onClick={clearCart}>
        EMPTY
      </button>
    </div>
  );
};
