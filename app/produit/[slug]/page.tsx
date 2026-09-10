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

  const moyenneAffichee =
    resume?.moyenne ?? (avis.length > 0 ? avis.reduce((s, a) => s + a.note, 0) / avis.length : 0);

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
                  livraison incluse
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

            {product.conformite && (
              <div className="rounded bg-white p-[22px]">
                <p className="mb-2 text-[16px] font-bold">Sécurité et conformité</p>
                <p className="text-[13.5px] leading-[1.6] text-grisTexte">
                  <span className="font-bold text-encre">Responsable de la mise sur le marché dans l&apos;UE : </span>
                  Service, SASU, Bureau 326, 59 rue de Ponthieu, 75008 Paris — service@serviotek.com
                </p>
                <p className="mt-2 text-[13.5px] leading-[1.6] text-grisTexte">
                  <span className="font-bold text-encre">Fabricant : </span>
                  {product.conformite.fabricant.nom}, {product.conformite.fabricant.adresse}
                </p>
                <p className="mt-3 text-[13.5px] font-bold text-encre">Avertissements et informations de sécurité</p>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-[13.5px] leading-[1.6] text-grisTexte">
                  {product.conformite.avertissements.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {avis.length > 0 && (
          <section className="rounded bg-white p-5 sm:p-[22px]">
            <h2 className="mb-5 text-xl font-bold tracking-[-0.025em]">Avis clients</h2>

            <div className="grid gap-6 sm:grid-cols-[220px_1fr] sm:gap-8">
              {/* Résumé global, façon Amazon : note moyenne + répartition par étoile */}
              <div className="sm:border-r sm:border-bordureSep sm:pr-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-encre">{moyenneAffichee.toFixed(1)}</span>
                  <span className="text-sm text-grisDiscret">sur 5</span>
                </div>
                <Etoiles note={moyenneAffichee} taille="text-lg" />
                <p className="mt-1 font-mono text-[11.5px] text-grisDiscret">
                  {avis.length} avis client{avis.length > 1 ? "s" : ""}
                </p>

                <div className="mt-4 space-y-1.5">
                  {[5, 4, 3, 2, 1].map((etoile) => {
                    const nombre = avis.filter((a) => a.note === etoile).length;
                    const pourcentage = Math.round((nombre / avis.length) * 100);
                    return (
                      <div key={etoile} className="flex items-center gap-2">
                        <span className="w-3 shrink-0 font-mono text-[11px] text-grisDiscret">{etoile}</span>
                        <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-bordureGrille">
                          <span
                            className="block h-full rounded-full bg-amber-500"
                            style={{ width: `${pourcentage}%` }}
                          />
                        </span>
                        <span className="w-8 shrink-0 text-right font-mono text-[11px] text-grisDiscret">
                          {pourcentage}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Avis individuels, regroupés en une seule liste continue (pas en grille éparpillée) */}
              <div className="divide-y divide-bordureSep sm:pl-2">
                {avis.map((a) => (
                  <article key={a.id} className="py-4 first:pt-0">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-bordureGrille text-sm font-bold text-violet">
                        {a.auteur.charAt(0).toUpperCase()}
                      </span>
                      <span className="font-bold text-encre">{a.auteur}</span>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                      <Etoiles note={a.note} taille="text-sm" />
                      <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.05em] text-grisLabel">
                        Achat vérifié
                      </span>
                    </div>

                    <p className="mt-1 font-mono text-[11px] text-grisLabel">
                      {new Date(a.publieLe).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>

                    {a.commentaire && (
                      <p className="mt-2 text-[14.5px] leading-[1.5] text-grisTexte">{a.commentaire}</p>
                    )}

                    {a.photo && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={a.photo}
                        alt={`Photo jointe par ${a.auteur}`}
                        className="mt-2 h-32 w-32 rounded object-cover"
                      />
                    )}
                  </article>
                ))}
              </div>
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
