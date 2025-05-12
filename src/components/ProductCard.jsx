import { useCart } from "../context/CartContext";

export default function ProductCard({ produit }) {
  const { addToCart } = useCart();
  const { nom, prix, image, categorie } = produit;

  return (
    <div className="bg-white border rounded shadow p-4">
      {image && (
        <img
          src={image}
          alt={nom}
          className="w-full h-40 object-cover rounded mb-2"
        />
      )}
      <h3 className="text-lg font-semibold">{nom}</h3>
      <p className="text-sm text-gray-500">{categorie}</p>
      <p className="text-green-700 font-bold">{prix.toFixed(2)} €</p>
      <button
        onClick={() => addToCart({ nom, prix })}
        className="mt-2 bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700"
      >
        🛒 Ajouter
      </button>
    </div>
  );
}
