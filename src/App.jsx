import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Order from "./pages/Order";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="app">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/commande" element={<Order />} />
            <Route path="/administration" element={<AdminLogin />} />
            <Route path="/administration/tableau" element={<Admin />} />
          </Routes>

          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
