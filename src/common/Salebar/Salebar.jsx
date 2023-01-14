import { Link } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";
import { MdShoppingCart } from "react-icons/md";


import "../../index.css";
import "./salebar.css";

export const Salebar = () => {
  return (
    <div className="salebarDesign bg-black-rs mb-2">
      <div className="d-flex align-items-center justify-content-center">
        <Link to="/private/home/search">
          <div className="btn btn-warning my-1 mx-2">
            <HiOutlineSearch size="2em" />
          </div>
        </Link>
        <Link to="/private/home/cart">
          <div className="btn btn-warning my-1 mx-2">
          <MdShoppingCart size="2em" />
          </div>
        </Link>
      </div>
    </div>
  );
};
