import Link from "next/link";
import {
  NOMS_FAMILLES,
  products,
  type Categorie,
  type Famille,
} from "@/lib/products";

const NOMS_CATEGORIES: Record<Categorie, string> = {
  audio: "Audio & Écouteurs",
  maison: "Maison connectée",
  bricolage: "Bricolage & Outils",
  detection: "Détection & Extérieur",
  "bien-etre": "Bien-être & Style",
  accessoires: "Chargeurs & Accessoires",
  scolaire: "Rentrée scolaire",
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

function estFamilleValide(valeur: string | undefined): valeur is Famille {
  return !!valeur && valeur in NOMS_FAMILLES;
}

export default function ProduitListPage({
  searchParams,
}: {
  searchParams: { recherche?: string; categorie?: string; famille?: string };
}) {
  const recherche = normaliser(searchParams.recherche ?? "");
  const categorie = estCategorieValide(searchParams.categorie) ? searchParams.categorie : undefined;
  const famille = estFamilleValide(searchParams.famille) ? searchParams.famille : undefined;

  let resultats = products;
  if (categorie) {
    resultats = resultats.filter((p) => p.categorie === categorie);
  }

  // Les sous-familles ne sont proposées que si la catégorie affichée en a assez
  // pour que le filtre serve à quelque chose.
  const famillesDisponibles = (Object.keys(NOMS_FAMILLES) as Famille[])
    .map((f) => ({ famille: f, total: resultats.filter((p) => p.famille === f).length }))
    .filter((f) => f.total > 0);

  if (famille) {
    resultats = resultats.filter((p) => p.famille === famille);
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
    : famille
    ? NOMS_FAMILLES[famille]
    : categorie
    ? NOMS_CATEGORIES[categorie]
    : "Catalogue";

  const lienFamille = (valeur?: Famille) => {
    const params = new URLSearchParams();
    if (searchParams.categorie) params.set("categorie", searchParams.categorie);
    if (searchParams.recherche) params.set("recherche", searchParams.recherche);
    if (valeur) params.set("famille", valeur);
    return `/produit?${params.toString()}`;
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="mb-2 text-2xl font-bold text-neutral-900">{titre}</h1>
      <p className="mb-6 text-sm text-neutral-500">
        {resultats.length} produit{resultats.length > 1 ? "s" : ""}
      </p>

      {famillesDisponibles.length > 1 && (
        <nav className="mb-8 flex flex-wrap gap-2">
          <Link
            href={lienFamille()}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              famille
                ? "border-neutral-200 text-neutral-600 hover:border-neutral-400"
                : "border-neutral-900 bg-neutral-900 text-white"
            }`}
          >
            Tout
          </Link>
          {famillesDisponibles.map((f) => (
            <Link
              key={f.famille}
              href={lienFamille(f.famille)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                famille === f.famille
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : "border-neutral-200 text-neutral-600 hover:border-neutral-400"
              }`}
            >
              {NOMS_FAMILLES[f.famille]}
              <span className="ml-1.5 text-neutral-400">{f.total}</span>
            </Link>
          ))}
        </nav>
      )}

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
