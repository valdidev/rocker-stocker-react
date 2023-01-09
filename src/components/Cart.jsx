import { useShopContext } from "../contexts/ShopContext";
import "../index.css";

export const Cart = () => {

  const { cart, testeo } = useShopContext();

  return (
    <div className="contentDesign">
      <h2>Cart</h2>
      <h3>{testeo}</h3>
    </div>
  );
};
