import { createContext, useContext, useReducer } from "react";
import {
  shoppingInitialState,
  shoppingReducer,
} from "../reducers/shoppingReducer";

const ShopContext = createContext();

const useShopContext = () => {
  return useContext(ShopContext);
};

const ShopProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);

  return (
    <ShopContext.Provider
      value={{ cart: state.cart, dispatch }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export { ShopProvider, useShopContext };
