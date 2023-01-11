import { useShopContext } from "../contexts/ShopContext";
import "../index.css";

import "./cart.css";

export const Cart = () => {
  const { cart, total } = useShopContext();

  return (
    <div className="contentDesign">
      <h1>CART</h1>
      <h2>Products</h2>
      <ul>
        {cart?.map((item, index) => (
          <li key={index}>
            ARTICLE ID: {item.articleId}. X {item.quantity}
            <button className="mx-2 my-1 btn btn-success" onClick={() => console.log('++++')}>+</button>
            <button className="mx-2 my-1 btn btn-warning" onClick={() => console.log('----!')}>-</button>
            <button className="mx-2 my-1 btn btn-danger" onClick={() => console.log('delete')}>x</button>
          </li>
        ))}
      </ul>
      <h5>TOTAL: {total}</h5>
      <button className="btn mx-2 btn-success" onClick={() => console.log('selling...')}>SELL</button>
      <button className="btn mx-2 btn-danger" onClick={() => console.log('emptying...')}>EMPTY</button>
    </div>
  );
};
