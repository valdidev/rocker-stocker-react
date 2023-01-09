import { Link } from "react-router-dom";
import "../../index.css";

export const Salebar = () => {
  return (
    <div className="navbarDesign">
      <Link to="/private/home/cart">
        <div>CART</div>
      </Link>
      <Link to="/private/home/search">
        <div>SEARCH</div>
      </Link>
    </div>
  );
};
