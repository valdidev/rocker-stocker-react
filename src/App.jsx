import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AllSales } from "./components/AllSales";
import { AllUsers } from "./components/AllUsers";
import { Home } from "./components/Home";
import { Lobby } from "./components/Lobby/Lobby";
import { MyProfile } from "./components/MyProfile";
import { MySales } from "./components/MySales";
import { AuthProvider } from "./contexts/AuthContext";
import { AdminRoute } from "./router/AdminRoute";
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
              <Route path="/private/mysales" element={<MySales />} />
              <Route path="/private/myprofile" element={<MyProfile />} />
              <Route path="/private/admin" element={<AdminRoute />}>
                <Route path="/private/admin/allusers" element={<AllUsers />} />
                <Route path="/private/admin/allsales" element={<AllSales />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
