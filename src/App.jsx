import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Lobby } from "./components/Lobby/Lobby";
import { AuthProvider } from "./contexts/AuthContext";
import { NavbarLayout } from "./router/NavbarLayout";
import { PrivateRoute } from "./router/PrivateRoute";
import { PublicRoute } from "./router/PublicRoute";

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicRoute />}>
            <Route index element={<Lobby />} />
          </Route>

          <Route path="/private" element={<PrivateRoute />}>
            <Route element={<NavbarLayout />}>
              <Route index element={<Home />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
