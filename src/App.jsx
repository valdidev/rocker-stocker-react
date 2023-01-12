import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SaleDetails } from "./common/SaleDetails";
import { Admin } from "./components/Admin";
import { AllSales } from "./components/AllSales";
import { AllUsers } from "./components/AllUsers";
import { Cart } from "./components/Cart";
import { Home } from "./components/Home";
import { Lobby } from "./components/Lobby/Lobby";
import { MyProfile } from "./components/MyProfile";
import { MySales } from "./components/MySales";
import { Search } from "./components/Search";
import { AuthProvider } from "./contexts/AuthContext";
import { ShopProvider } from "./contexts/ShopContext";
import { AdminRoute } from "./router/AdminRoute";
import { NavbarLayout } from "./router/NavbarLayout";
import { PrivateRoute } from "./router/PrivateRoute";
import { PublicRoute } from "./router/PublicRoute";
import { SalebarLayout } from "./router/SalebarLayout";

export const App = () => {
  return (
    <AuthProvider>
      <ShopProvider>
        <BrowserRouter>
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route path="/" element={<PublicRoute />}>
              <Route index element={<Lobby />} />
            </Route>

            {/* PRIVATE ROUTES */}

            <Route path="/private" element={<PrivateRoute />}>
              <Route element={<NavbarLayout />}>
                <Route path="/private/home" element={<Home />}>
                  <Route element={<SalebarLayout />}>
                    <Route path="/private/home/cart" element={<Cart />} />
                    <Route path="/private/home/search" element={<Search />} />
                  </Route>
                </Route>

                <Route path="/private/mysales" element={<MySales />} />
                <Route path="/private/myprofile" element={<MyProfile />} />

                <Route path="/private/sale/details/:saleId" element={<SaleDetails />} />

                {/* Private route + admin role */}
                <Route path="/private/admin" element={<AdminRoute />}>
                  <Route index element={<Admin />} />
                  <Route
                    path="/private/admin/allusers"
                    element={<AllUsers />}
                  />
                  <Route
                    path="/private/admin/allsales"
                    element={<AllSales />}
                  />
                </Route>
              </Route>
            </Route>
            
          </Routes>
        </BrowserRouter>
      </ShopProvider>
    </AuthProvider>
  );
};
