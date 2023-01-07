import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);

  const handlerAuth = (user) => {
    if (user) {
      setUser(user);
      setAuth(true);
      console.log('user exists', user)
    } else {
      setUser(null);
      setAuth(true);
      console.log('user no exits', user)
    }
  };

  const data = {auth, handlerAuth};

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
export default AuthContext;