import Link from "next/link";
import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { NOMS_CATEGORIES } from "@/lib/categories";
import { products, type Categorie } from "@/lib/products";

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

/** Produits par page : au-delà, le mobile charge trop d'images d'un coup. */
const PAR_PAGE = 24;

export const metadata: Metadata = {
  title: "Catalogue",
  description:
    "Gadgets électriques utiles : audio, maison connectée, bricolage, détection, bien-être et accessoires de charge.",
};

export default function ProduitListPage({
  searchParams,
}: {
  searchParams: {
    recherche?: string;
    categorie?: string;
    page?: string;
  };
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
    if (valeur > 1) params.set("page", String(valeur));
    return `/produit?${params.toString()}`;
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="mb-2 text-2xl font-bold text-neutral-900">{titre}</h1>
      <p className="mb-6 text-sm font-bold text-graphite">
        {resultats.length} produit{resultats.length > 1 ? "s" : ""}
      </p>

      {resultats.length === 0 ? (
        <p className="font-bold text-graphite">Aucun produit trouvé.</p>
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
              className="rounded-full border border-neutral-200 px-4 py-2 font-bold text-graphite transition hover:border-neutral-400"
            >
              ← Précédent
            </Link>
          ) : (
            <span className="rounded-full border border-neutral-100 px-4 py-2 text-neutral-300">
              ← Précédent
            </span>
          )}

          <span className="font-bold text-graphite">
            Page {page} sur {nombrePages}
          </span>

          {page < nombrePages ? (
            <Link
              href={lienPage(page + 1)}
              className="rounded-full border border-neutral-200 px-4 py-2 font-bold text-graphite transition hover:border-neutral-400"
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
