import { createContext, useReducer } from "react";
import { shoppingInitialState, shoppingReducer } from "../reducers/shoppingReducer";

const ShopContext = createContext();

const ShopProvider = ({ children }) => {
    
    const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);


  return <ShopContext.Provider value={{}}>{children}</ShopContext.Provider>;
};

export { ShopProvider };
