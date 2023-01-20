import { MdRemoveShoppingCart } from "react-icons/md";
import "./emptyCart.css";

export const EmptyCart = () => {
  return (
    <div className="emptyCartDesign container-fluid d-flex flex-column justify-content-center align-items-center">
      <MdRemoveShoppingCart size="4em" />
      <p className="fw-bold">Empty</p>
    </div>
  );
};
