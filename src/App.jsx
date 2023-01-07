import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Lobby } from "./components/Lobby/Lobby";
import { AuthContextProvider } from "./contexts/authContext";

export const App = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={}>
            <Route path="/lobby" element={<Lobby />} />
          </Route>

          <Route path="/private">
            <Route path="/private" element={<Home />} />
            <Route path="/private/logout" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
};
