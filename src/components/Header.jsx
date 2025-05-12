import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

import './../index.css';

export default function Header() {
  const { cart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.qte, 0);

  return (
    <header className="bg-green-700 text-white py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
        <h1 className="text-xl font-bold">
          <Link to="/">🥬 Sen Légumes Frais</Link>
        </h1>
        <nav className="flex gap-4 text-sm">
          <Link to="/">Accueil</Link>
          <Link to="/boutique">Boutique</Link>
          <Link to="/panier">Panier ({total})</Link>
          <Link to="/checkout">Commander</Link>
          <Link to="/admin">Admin</Link>
        </nav>
      </div>
    </header>
  );
}
