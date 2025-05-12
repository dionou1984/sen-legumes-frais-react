import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Boutique() {
  const [produits, setProduits] = useState([]);
  const [filtre, setFiltre] = useState("");
  const [search, setSearch] = useState("");

  const API_URL =
    "https://sen-legumes-cms.up.railway.app/api/produits?populate=image,categorie";
  const IMG_BASE = "https://sen-legumes-cms.up.railway.app";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const items = data.data.map((p) => ({
          nom: p.attributes.nom,
          prix: p.attributes.prix,
          image: p.attributes.image?.data
            ? IMG_BASE + p.attributes.image.data.attributes.url
            : null,
          categorie: p.attributes.categorie?.data?.attributes?.nom || "Autres",
        }));
        setProduits(items);
      });
  }, []);

  const categories = [...new Set(produits.map((p) => p.categorie))];
  const filtres = produits.filter((p) => {
    const matchCat = filtre === "" || p.categorie === filtre;
    const matchSearch = p.nom.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🛍️ Boutique</h2>
      <div className="flex gap-4 flex-wrap mb-6">
        <input
          type="text"
          placeholder="🔍 Rechercher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded"
        />
        <select
          value={filtre}
          onChange={(e) => setFiltre(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">📂 Toutes les catégories</option>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtres.map((p, i) => (
          <ProductCard key={i} produit={p} />
        ))}
      </div>
    </div>
  );
}
