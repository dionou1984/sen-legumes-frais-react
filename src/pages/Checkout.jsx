import { useCart } from "../context/CartContext";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import axios from "axios";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [form, setForm] = useState({
    nom: "",
    email: "",
    telephone: "",
    message: ""
  });
  const [status, setStatus] = useState("");

  const total = cart.reduce((sum, item) => sum + item.prix * item.qte, 0);
  const details = cart.map(p => `${p.qte}x ${p.nom} (${(p.qte * p.prix).toFixed(2)} €)`).join("\n");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullMessage = `
🧾 Nouvelle commande de ${form.nom} (${form.email}) :
${details}

Total : ${total.toFixed(2)} €
Message client : ${form.message}
    `;

    try {
      // Envoi via EmailJS
      await emailjs.send("service_7dqemrc", "template_xfa8yyl", {
        from_name: form.nom,
        reply_to: form.email,
        message: fullMessage
      }, "deGPQSg0Eyc0lz0HR");

      // Envoi via backend WhatsApp
      await axios.post("https://sen-legumes-cms.up.railway.app/api/send-message", {
        name: form.nom,
        email: form.email,
        message: fullMessage
      });

      setStatus("✅ Commande envoyée avec succès !");
      clearCart();
      setForm({ nom: "", email: "", telephone: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("❌ Erreur d'envoi.");
    }
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">📦 Finaliser ma commande</h2>
      <ul className="mb-4">
        {cart.map((p, i) => (
          <li key={i}>{p.qte}x {p.nom} - {(p.prix * p.qte).toFixed(2)} €</li>
        ))}
      </ul>
      <p className="mb-4 font-semibold">Total : {total.toFixed(2)} €</p>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          placeholder="Votre nom"
          value={form.nom}
          onChange={e => setForm({ ...form, nom: e.target.value })}
          className="p-2 border w-full rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="p-2 border w-full rounded"
          required
        />
        <input
          type="tel"
          placeholder="Téléphone WhatsApp"
          value={form.telephone}
          onChange={e => setForm({ ...form, telephone: e.target.value })}
          className="p-2 border w-full rounded"
          required
        />
        <textarea
          placeholder="Message / instructions"
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          className="p-2 border w-full rounded"
          required
        ></textarea>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          🧾 Passer la commande
        </button>
        {status && <p className="mt-2">{status}</p>}
      </form>
    </section>
  );
}
