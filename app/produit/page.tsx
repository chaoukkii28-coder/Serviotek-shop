import Link from "next/link";
import { products, type Categorie } from "@/lib/products";

const NOMS_CATEGORIES: Record<Categorie, string> = {
  audio: "Audio & Écouteurs",
  maison: "Maison connectée",
  bricolage: "Bricolage & Outils",
  detection: "Détection & Extérieur",
  "bien-etre": "Bien-être & Style",
  accessoires: "Chargeurs & Accessoires",
};

function normaliser(texte: string) {
  return texte
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function estCategorieValide(valeur: string | undefined): valeur is Categorie {
  return !!valeur && valeur in NOMS_CATEGORIES;
}

export default function ProduitListPage({
  searchParams,
}: {
  searchParams: { recherche?: string; categorie?: string };
}) {
  const recherche = normaliser(searchParams.recherche ?? "");
  const categorie = estCategorieValide(searchParams.categorie) ? searchParams.categorie : undefined;

  let resultats = products;
  if (categorie) {
    resultats = resultats.filter((p) => p.categorie === categorie);
  }
  if (recherche) {
    resultats = resultats.filter((p) =>
      [p.name, p.description, p.tagline, ...p.specs.map((s) => `${s.label} ${s.value}`)]
        .map(normaliser)
        .some((champ) => champ.includes(recherche))
    );
  }

  const titre = recherche
    ? `Résultats pour "${searchParams.recherche}"`
    : categorie
    ? NOMS_CATEGORIES[categorie]
    : "Catalogue";

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold text-neutral-900">{titre}</h1>

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
                src={p.images[0]}
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
