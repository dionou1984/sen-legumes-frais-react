import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Boutique from "./pages/Boutique";
import Checkout from "./pages/Checkout";
import Panier from "./pages/Panier";
import Admin from "./pages/Admin";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main className="p-4 max-w-6xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/boutique" element={<Boutique />} />
          <Route path="/panier" element={<Panier />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </div>
  );
}
