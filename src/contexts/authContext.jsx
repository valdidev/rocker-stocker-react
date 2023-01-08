import { createContext, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // useEffect
  useMemo(() => {
    const userLogged = localStorage.getItem("RS_USER");
    if (userLogged) {
      const user = JSON.parse(userLogged);
      setUser(user);
    }
  }, []);

  const handlerAuth = (user) => {
    if (user) {
      setUser(user);
      localStorage.setItem("RS_USER", JSON.stringify(user));
    } else {
      setUser(null);
      localStorage.removeItem("RS_USER");
    }
  };

  const data = { handlerAuth, user };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
export default AuthContext;
