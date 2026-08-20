import Link from "next/link";
import type { Metadata } from "next";
import { CATEGORIES, NOMS_CATEGORIES, lienCategorie } from "@/lib/categories";
import { products, type Categorie } from "@/lib/products";
import CarteCatalogue from "@/components/CarteCatalogue";

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

const TRANCHES_PRIX = [
  { id: "moins-20", label: "Moins de 20 €", test: (p: number) => p < 20 },
  { id: "20-50", label: "20 € – 50 €", test: (p: number) => p >= 20 && p <= 50 },
  { id: "plus-50", label: "Plus de 50 €", test: (p: number) => p > 50 },
] as const;

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
    prix?: string;
    page?: string;
  };
}) {
  const recherche = normaliser(searchParams.recherche ?? "");
  const categorie = estCategorieValide(searchParams.categorie) ? searchParams.categorie : undefined;
  const tranche = TRANCHES_PRIX.find((t) => t.id === searchParams.prix);

  let resultats = products;
  if (categorie) {
    resultats = resultats.filter((p) => p.categorie === categorie);
  }
  if (tranche) {
    resultats = resultats.filter((p) => tranche.test(p.price));
  }
  if (recherche) {
    resultats = resultats.filter((p) =>
      [p.name, p.description, p.tagline, ...p.specs.map((s) => `${s.label} ${s.value}`)]
        .map(normaliser)
        .some((champ) => champ.includes(recherche))
    );
  }
  resultats = [...resultats].sort((a, b) => a.price - b.price);

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
    if (searchParams.prix) params.set("prix", searchParams.prix);
    if (valeur > 1) params.set("page", String(valeur));
    return `/produit?${params.toString()}`;
  };

  const lienPrix = (id: string) => {
    const params = new URLSearchParams();
    if (searchParams.categorie) params.set("categorie", searchParams.categorie);
    if (searchParams.prix !== id) params.set("prix", id);
    return `/produit?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-fond px-[clamp(12px,2.5vw,22px)] py-3.5">
      <div className="mx-auto max-w-[1400px]">
        <nav className="mb-3.5 font-mono text-[11.5px] text-grisDiscret">
          <Link href="/" className="hover:text-violet">ACCUEIL</Link>
          {" / "}
          <span className="text-encre">{titre.toUpperCase()}</span>
        </nav>

        <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(218px,1fr))]">
          <aside className="flex max-w-[260px] flex-col gap-6 rounded bg-white p-5">
            <div>
              <p className="mb-2 font-mono text-[10.5px] tracking-[0.1em] text-grisLabel">RAYONS</p>
              <ul className="flex flex-col gap-1.5">
                <li>
                  <Link
                    href="/produit"
                    className={`text-sm ${!categorie ? "font-bold text-violet" : "text-encre hover:text-violet"}`}
                  >
                    Tout le catalogue
                  </Link>
                </li>
                {CATEGORIES.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={lienCategorie(c.id)}
                      className={`text-sm ${
                        categorie === c.id ? "font-bold text-violet" : "text-encre hover:text-violet"
                      }`}
                    >
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-2 font-mono text-[10.5px] tracking-[0.1em] text-grisLabel">PRIX</p>
              <ul className="flex flex-col gap-1.5">
                {TRANCHES_PRIX.map((t) => (
                  <li key={t.id}>
                    <Link
                      href={lienPrix(t.id)}
                      className={`text-sm ${
                        tranche?.id === t.id ? "font-bold text-violet" : "text-encre hover:text-violet"
                      }`}
                    >
                      {t.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-2 font-mono text-[10.5px] tracking-[0.1em] text-grisLabel">ENGAGEMENTS</p>
              <ul className="flex flex-col gap-1.5 text-sm text-grisTexte">
                <li>Livraison sous 5 jours ouvrés</li>
                <li>Retour sous 14 jours</li>
                <li>Paiement sécurisé</li>
              </ul>
            </div>
          </aside>

          <div className="flex flex-col gap-4 [grid-column:span_3]">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded bg-white p-5">
              <h1 className="text-2xl font-bold tracking-[-0.03em]">{titre}</h1>
              <span className="font-mono text-[12.5px] text-grisDiscret">
                TRIER PAR : PRIX CROISSANT · {resultats.length} produit{resultats.length > 1 ? "s" : ""}
              </span>
            </div>

            {affiches.length === 0 ? (
              <p className="rounded bg-white p-5 text-grisTexte">Aucun produit trouvé.</p>
            ) : (
              <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fill,minmax(150px,1fr))]">
                {affiches.map((p) => (
                  <CarteCatalogue key={p.slug} produit={p} />
                ))}
              </div>
            )}

            {nombrePages > 1 && (
              <nav className="flex items-center justify-center gap-3 rounded bg-white p-4 text-sm">
                {page > 1 ? (
                  <Link href={lienPage(page - 1)} className="font-bold text-violet hover:opacity-70">
                    ← Précédent
                  </Link>
                ) : (
                  <span className="text-grisLabel">← Précédent</span>
                )}
                <span className="font-mono text-[12.5px] text-grisDiscret">
                  Page {page} sur {nombrePages}
                </span>
                {page < nombrePages ? (
                  <Link href={lienPage(page + 1)} className="font-bold text-violet hover:opacity-70">
                    Suivant →
                  </Link>
                ) : (
                  <span className="text-grisLabel">Suivant →</span>
                )}
              </nav>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
