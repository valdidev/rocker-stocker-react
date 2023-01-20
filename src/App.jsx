import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SaleDetails } from "./common/SaleDetails/SaleDetails";
import { Admin } from "./components/Admin/Admin";
import { AllSales } from "./components/AllSales/AllSales";
import { AllUsers } from "./components/AllUsers/AllUsers";
import { Cart } from "./components/Cart/Cart";
import { EditProfile } from "./components/EditProfile/EditProfile";
import { Home } from "./components/Home/Home";
import { Lobby } from "./components/Lobby/Lobby";
import { MyProfile } from "./components/MyProfile/MyProfile";
import { MySales } from "./components/MySales/MySales";
import { Search } from "./components/Search/Search";
import { Transaction } from "./components/Transaction/Transaction";
import { ShopProvider } from "./contexts/ShopContext";
import { AdminRoute } from "./router/AdminRoute";
import { NavbarLayout } from "./router/NavbarLayout";
import { PrivateRoute } from "./router/PrivateRoute";
import { PublicRoute } from "./router/PublicRoute";
import { SalebarLayout } from "./router/SalebarLayout";
import { AuthProvider } from "./contexts/AuthContext2";
import "./index.css";
import { Toaster } from "react-hot-toast";

export const App = () => {
  return (
    <AuthProvider>
      <ShopProvider>
        <BrowserRouter>
          <div className="appDesign">
            <Toaster
              position="bottom-center"
              containerStyle={{
                bottom: 80,
              }}
              toastOptions={{
                className: "",
                style: {
                  border: "1px solid #713200",
                  padding: "16px",
                  color: "#713200",
                },
              }}
              
            />
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
                      <Route
                        path="/private/home/cart/transaction"
                        element={<Transaction />}
                      />
                      <Route path="/private/home/search" element={<Search />} />
                    </Route>
                  </Route>

                  <Route path="/private/mysales" element={<MySales />} />
                  <Route path="/private/myprofile" element={<MyProfile />} />
                  <Route
                    path="/private/myprofile/edit"
                    element={<EditProfile />}
                  />

                  <Route
                    path="/private/sale/details/:saleId"
                    element={<SaleDetails />}
                  />

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
          </div>
        </BrowserRouter>
      </ShopProvider>
    </AuthProvider>
  );
};
