import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import Events from "./pages/Events";
import Profit from "./pages/Profit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/profit" element={<Profit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
