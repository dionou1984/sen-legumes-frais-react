export default function Home() {
  return (
    <section className="text-center py-12">
      <h2 className="text-4xl font-bold mb-4">Bienvenue sur Sen Légumes Frais</h2>
      <p className="text-lg mb-6">
        Vos légumes bio, frais et locaux livrés à domicile 🥕🍅🥦
      </p>
      <a
        href="/boutique"
        className="inline-block px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Découvrir la boutique
      </a>
    </section>
  );
}
