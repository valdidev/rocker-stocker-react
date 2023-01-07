import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Lobby } from "./components/Lobby/Lobby";
import { AuthContextProvider } from "./contexts/AuthContext";
import { PrivateRoute } from "./router/PrivateRoute";
import { PublicRoute } from "./router/PublicRoute";

export const App = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicRoute />}>
            <Route index element={<Lobby />} />
          </Route>

          <Route path="/private" element={<PrivateRoute />}>
            <Route path="/private" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
};
