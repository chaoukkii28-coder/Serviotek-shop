import Link from "next/link";
import { products } from "@/lib/products";

function normaliser(texte: string) {
  return texte
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export default function ProduitListPage({
  searchParams,
}: {
  searchParams: { recherche?: string; categorie?: string };
}) {
  const recherche = normaliser(searchParams.recherche ?? "");

  const resultats = recherche
    ? products.filter((p) =>
        [p.name, p.description, p.tagline, ...p.specs.map((s) => `${s.label} ${s.value}`)]
          .map(normaliser)
          .some((champ) => champ.includes(recherche))
      )
    : products;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold text-neutral-900">
        {recherche ? `Résultats pour "${searchParams.recherche}"` : "Catalogue"}
      </h1>

      {resultats.length === 0 ? (
        <p className="text-neutral-600">Aucun produit trouvé.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {resultats.map((p) => (
            <Link
              key={p.slug}
              href={`/produit/${p.slug}`}
              className="block rounded-lg border border-neutral-200 p-3 transition hover:shadow-md"
            >
              <img
                src={p.image}
                alt={p.name}
                className="mb-2 aspect-square w-full rounded-md object-cover"
              />
              <h2 className="text-sm font-semibold text-neutral-900">{p.name}</h2>
              <p className="text-xs text-neutral-500">{p.tagline}</p>
              <p className="mt-1 font-bold text-lime-600">{p.price.toFixed(2)} €</p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
