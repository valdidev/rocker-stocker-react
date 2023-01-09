import { createContext } from "react";

const ShopContext = createContext();

const ShopProvider = ({ children }) => {
  return <ShopContext.Provider value={{}}>{children}</ShopContext.Provider>;
};

export { ShopProvider };
