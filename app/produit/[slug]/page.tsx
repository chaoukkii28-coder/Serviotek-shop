import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct, products, type Product } from "@/lib/products";
import { urlAbsolue } from "@/lib/site";
import { NOMS_CATEGORIES, lienCategorie } from "@/lib/categories";
import { formaterPrix } from "@/lib/vitrine";
import Etoiles from "@/components/Etoiles";
import { avisDuProduit, resumeDuProduit } from "@/lib/avis-db";
import AddToCartButton from "@/components/AddToCartButton";
import ProductGallery from "@/components/ProductGallery";
import GrilleProduits from "@/components/accueil/GrilleProduits";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProduct(params.slug);
  if (!product) return {};

  const title = `${product.name} — ${product.price.toFixed(2)} €`;

  return {
    title,
    description: product.tagline,
    openGraph: {
      title,
      description: product.tagline,
      images: [{ url: product.images[0] }],
    },
  };
}

/** Suggestions : même rayon d'abord, complété par le reste du catalogue. */
function produitsSimilaires(product: Product) {
  const candidats = products.filter((p) => p.slug !== product.slug);
  const memeRayon = candidats.filter((p) => p.categorie === product.categorie);
  const autres = candidats.filter((p) => p.categorie !== product.categorie);

  return [...memeRayon, ...autres].slice(0, 5);
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) return notFound();

  const similaires = produitsSimilaires(product);
  const [avis, resume] = await Promise.all([
    avisDuProduit(product.slug),
    resumeDuProduit(product.slug),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: product.price.toFixed(2),
      availability: "https://schema.org/InStock",
      url: urlAbsolue(`/produit/${product.slug}`),
    },
    // Déclarée seulement si des avis réels sont affichés sur la page :
    // annoncer une note sans avis derrière viole les règles de Google.
    ...(resume
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: resume.moyenne,
            reviewCount: resume.total,
          },
        }
      : {}),
  };

  return (
    <div className="bg-fond">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto flex max-w-[1400px] flex-col gap-3.5 px-[clamp(12px,2.5vw,22px)] py-3.5">
        <nav className="font-mono text-[11.5px] text-grisDiscret">
          <Link href="/" className="hover:text-violet">ACCUEIL</Link>
          {" / "}
          <Link href={lienCategorie(product.categorie)} className="hover:text-violet">
            {NOMS_CATEGORIES[product.categorie].toUpperCase()}
          </Link>
          {" / "}
          <span className="text-encre">{product.name.toUpperCase()}</span>
        </nav>

        <div className="grid items-start gap-4 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
          <div className="min-w-0 rounded bg-white p-4">
            <ProductGallery images={product.images} alt={product.name} />
          </div>

          <div className="flex min-w-0 flex-col gap-4">
            <div className="rounded bg-white p-[22px]">
              <p className="mb-2 font-mono text-[11.5px] tracking-[0.1em] text-violet">
                {NOMS_CATEGORIES[product.categorie].toUpperCase()}
              </p>
              <h1 className="text-2xl font-bold tracking-[-0.03em] sm:text-[32px]">{product.name}</h1>
              <p className="mt-2 text-[15px] text-grisTexte">{product.tagline}</p>

              {resume && (
                <p className="mt-3 flex items-center gap-2 text-sm text-grisTexte">
                  <Etoiles note={resume.moyenne} />
                  {resume.moyenne.toFixed(1)} / 5
                  <span>({resume.total} avis client{resume.total > 1 ? "s" : ""})</span>
                </p>
              )}

              <p className="mt-4 font-mono text-[30px] font-bold text-encre">
                {formaterPrix(product.price)}
                <span className="ml-2 align-middle font-mono text-[11.5px] font-normal text-grisDiscret">
                  TTC · livraison incluse
                </span>
              </p>

              <p className="mt-4 text-[14.5px] leading-[1.6] text-grisTexte">{product.description}</p>

              <div className="mt-5">
                <AddToCartButton product={product} />
              </div>

              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11.5px] text-grisDiscret">
                <span>LIVRAISON FR · BE · CH · LU</span>
                <span>RETOUR 14 JOURS</span>
                <span>PAIEMENT SÉCURISÉ</span>
              </div>
              <p className="mt-2 text-[13px] text-grisTexte">
                Livraison sous 5 jours ouvrés maximum. Voir{" "}
                <Link href="/livraison" className="underline hover:text-violet">
                  Livraison &amp; délais
                </Link>
                .
              </p>
            </div>

            <div className="rounded bg-bordureGrille p-px">
              <p className="bg-white px-4 py-3 text-[16px] font-bold">Fiche technique</p>
              <div className="grid gap-px [grid-template-columns:repeat(auto-fit,minmax(210px,1fr))]">
                {product.specs.map((s) => (
                  <div key={s.label} className="bg-white px-4 py-3">
                    <p className="font-mono text-[10.5px] tracking-[0.05em] text-grisLabel">
                      {s.label.toUpperCase()}
                    </p>
                    <p className="mt-1 text-[13.5px] text-encre">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {avis.length > 0 && (
          <section className="rounded bg-white p-5 sm:p-[22px]">
            <h2 className="mb-4 text-xl font-bold tracking-[-0.025em]">
              Avis clients ({avis.length})
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {avis.map((a) => (
                <article key={a.id} className="rounded border border-bordureSep p-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="font-bold text-encre">{a.auteur}</span>
                    <Etoiles note={a.note} taille="text-sm" />
                  </div>
                  {a.commentaire && (
                    <p className="text-[14.5px] leading-[1.5] text-grisTexte">{a.commentaire}</p>
                  )}
                  <p className="mt-2 font-mono text-[11px] text-grisLabel">
                    Achat vérifié — {new Date(a.publieLe).toLocaleDateString("fr-FR")}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        {similaires.length > 0 && (
          <GrilleProduits titre="Dans le même rayon" produits={similaires} minWidth={140} />
        )}
      </div>
    </div>
  );
}
