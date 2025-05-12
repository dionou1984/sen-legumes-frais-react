import { useCart } from "../context/CartContext";

export default function Panier() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.prix * item.qte, 0);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">🛒 Mon Panier</h2>

      {cart.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item, i) => (
              <li
                key={i}
                className="border p-4 rounded flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold">{item.nom}</h3>
                  <p>
                    {item.qte} × {item.prix.toFixed(2)} € ={" "}
                    <strong>{(item.qte * item.prix).toFixed(2)} €</strong>
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.nom)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-right">
            <p className="text-lg font-semibold">
              Total : <span className="text-green-700">{total.toFixed(2)} €</span>
            </p>
            <div className="mt-2 flex gap-2 justify-end">
              <button
                onClick={clearCart}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Vider le panier
              </button>
              <a
                href="/checkout"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Finaliser la commande
              </a>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
