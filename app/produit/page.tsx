import Link from "next/link";
import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { NOMS_CATEGORIES } from "@/lib/categories";
import {
  NOMS_FAMILLES,
  products,
  type Categorie,
  type Famille,
} from "@/lib/products";

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

/** Produits par page : au-delà, le mobile charge trop d'images d'un coup. */
const PAR_PAGE = 24;

export const metadata: Metadata = {
  title: "Catalogue",
  description:
    "Fournitures de rentrée et gadgets utiles : écriture, cahiers, classement, géométrie, arts plastiques, sacs, audio, maison et bricolage.",
};

export default function ProduitListPage({
  searchParams,
}: {
  searchParams: {
    recherche?: string;
    categorie?: string;
    famille?: string;
    page?: string;
  };
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

  const nombrePages = Math.max(1, Math.ceil(resultats.length / PAR_PAGE));
  const pageDemandee = Number.parseInt(searchParams.page ?? "1", 10);
  const page = Number.isNaN(pageDemandee)
    ? 1
    : Math.min(Math.max(pageDemandee, 1), nombrePages);
  const affiches = resultats.slice((page - 1) * PAR_PAGE, page * PAR_PAGE);

  const lienPage = (valeur: number) => {
    const params = new URLSearchParams();
    if (searchParams.categorie) params.set("categorie", searchParams.categorie);
    if (searchParams.recherche) params.set("recherche", searchParams.recherche);
    if (famille) params.set("famille", famille);
    if (valeur > 1) params.set("page", String(valeur));
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
          {affiches.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}

      {nombrePages > 1 && (
        <nav className="mt-10 flex items-center justify-center gap-3 text-sm">
          {page > 1 ? (
            <Link
              href={lienPage(page - 1)}
              className="rounded-full border border-neutral-200 px-4 py-2 font-medium text-neutral-700 transition hover:border-neutral-400"
            >
              ← Précédent
            </Link>
          ) : (
            <span className="rounded-full border border-neutral-100 px-4 py-2 text-neutral-300">
              ← Précédent
            </span>
          )}

          <span className="text-neutral-500">
            Page {page} sur {nombrePages}
          </span>

          {page < nombrePages ? (
            <Link
              href={lienPage(page + 1)}
              className="rounded-full border border-neutral-200 px-4 py-2 font-medium text-neutral-700 transition hover:border-neutral-400"
            >
              Suivant →
            </Link>
          ) : (
            <span className="rounded-full border border-neutral-100 px-4 py-2 text-neutral-300">
              Suivant →
            </span>
          )}
        </nav>
      )}
    </main>
  );
}
