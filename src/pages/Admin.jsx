import { useState, useEffect } from "react";

export default function Admin() {
  const [jwt, setJwt] = useState("");
  const [login, setLogin] = useState({ email: "", password: "" });
  const [produits, setProduits] = useState([]);
  const [form, setForm] = useState({ id: "", nom: "", prix: "" });

  const API = "https://sen-legumes-cms.up.railway.app/api/produits";

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("https://sen-legumes-cms.up.railway.app/api/auth/local", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        identifier: login.email,
        password: login.password
      }),
    });
    const data = await res.json();
    if (data.jwt) {
      setJwt(data.jwt);
      chargerProduits(data.jwt);
    } else {
      alert("❌ Connexion échouée");
    }
  };

  const chargerProduits = async (token) => {
    const res = await fetch(API, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    const produits = data.data.map((p) => ({
      id: p.id,
      nom: p.attributes.nom,
      prix: p.attributes.prix,
    }));
    setProduits(produits);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = form.id ? "PUT" : "POST";
    const endpoint = form.id ? `${API}/${form.id}` : API;

    await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ data: { nom: form.nom, prix: parseFloat(form.prix) } }),
    });

    setForm({ id: "", nom: "", prix: "" });
    chargerProduits(jwt);
  };

  const handleDelete = async (id) => {
    if (!confirm("Supprimer ce produit ?")) return;
    await fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${jwt}` },
    });
    chargerProduits(jwt);
  };

  const editProduit = (p) => {
    setForm({ id: p.id, nom: p.nom, prix: p.prix });
  };

  if (!jwt) {
    return (
      <section>
        <h2 className="text-xl font-bold mb-4">🔐 Connexion Admin</h2>
        <form onSubmit={handleLogin} className="space-y-3 max-w-md">
          <input
            type="email"
            placeholder="Email"
            value={login.email}
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
            className="p-2 border rounded w-full"
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
            className="p-2 border rounded w-full"
            required
          />
          <button className="bg-green-600 text-white px-4 py-2 rounded">Se connecter</button>
        </form>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">🧑‍🌾 Gestion des produits</h2>

      <form onSubmit={handleSubmit} className="space-y-3 max-w-md mb-6">
        <input
          placeholder="Nom"
          value={form.nom}
          onChange={(e) => setForm({ ...form, nom: e.target.value })}
          className="p-2 border rounded w-full"
          required
        />
        <input
          type="number"
          placeholder="Prix"
          value={form.prix}
          onChange={(e) => setForm({ ...form, prix: e.target.value })}
          className="p-2 border rounded w-full"
          step="0.01"
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {form.id ? "💾 Modifier" : "➕ Ajouter"}
        </button>
      </form>

      <ul className="space-y-3">
        {produits.map((p) => (
          <li key={p.id} className="border p-3 rounded flex justify-between">
            <div>
              <strong>{p.nom}</strong> – {p.prix.toFixed(2)} €
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => editProduit(p)}
                className="bg-yellow-400 px-3 py-1 rounded"
              >
                ✏️
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
