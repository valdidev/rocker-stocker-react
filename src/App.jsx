import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Lobby } from "./components/Lobby/Lobby";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/private" element={<Home />} />
        <Route path="/private/logout" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
