import { MdRemoveShoppingCart } from "react-icons/md";

import "../../index.css";

export const EmptyCart = () => {
  return (
    <div className="container-fluid bg-black-rs d-flex flex-column justify-content-center align-items-center">
      <MdRemoveShoppingCart size="4em" />
      <p className="fw-bold">Empty</p>
    </div>
  );
};
