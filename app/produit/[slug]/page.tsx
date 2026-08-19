import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct, products, type Product } from "@/lib/products";
import { urlAbsolue } from "@/lib/site";
import Etoiles from "@/components/Etoiles";
import { avisDuProduit, resumeDuProduit } from "@/lib/avis-db";
import AddToCartButton from "@/components/AddToCartButton";
import ProductCard from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";

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
    <>
    <div className="max-w-6xl mx-auto px-5 py-10 grid sm:grid-cols-2 gap-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="relative">
        <ProductGallery images={product.images} alt={product.name} />
        {product.badge && (
          <span className="absolute top-4 left-4 bg-volt text-graphite text-xs font-bold px-2 py-1 rounded-full">
            {product.badge}
          </span>
        )}
      </div>

      <div>
        <h1 className="font-display font-bold text-3xl">{product.name}</h1>
        <p className="mt-2 text-lg font-bold text-graphite">{product.tagline}</p>
        {resume && (
          <p className="mt-2 flex items-center gap-2 text-sm font-bold text-graphite">
            <Etoiles note={resume.moyenne} />
            {resume.moyenne.toFixed(1)} / 5
            <span className="font-medium">
              ({resume.total} avis client{resume.total > 1 ? "s" : ""})
            </span>
          </p>
        )}
        <p className="font-mono text-volt text-2xl mt-6">{product.price.toFixed(2)} €</p>

        <p className="mt-6 text-lg font-bold leading-relaxed text-graphite">{product.description}</p>

        <div className="mt-8">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-graphite">
            Fiche technique
          </p>
          <dl className="border border-wire rounded-xl divide-y divide-wire">
            {product.specs.map((s) => (
              <div key={s.label} className="flex justify-between gap-4 px-4 py-3 text-sm">
                <dt className="shrink-0 font-bold text-graphite">{s.label}</dt>
                <dd className="text-right font-bold text-graphite">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <p className="mt-6 text-sm font-semibold text-graphite">
          Livraison sous 5 jours ouvrés maximum. Voir la page{" "}
          <a href="/livraison" className="underline hover:opacity-70">
            Livraison &amp; délais
          </a>.
        </p>

        <div className="mt-6">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>

    {avis.length > 0 && (
      <section className="max-w-6xl mx-auto px-5 pb-14">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2 h-2 rounded-full bg-volt" />
          <h2 className="font-display font-bold text-xl">
            Avis clients ({avis.length})
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {avis.map((a) => (
            <article key={a.id} className="rounded-xl border border-wire bg-panel p-5">
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="font-bold text-graphite">{a.auteur}</span>
                <Etoiles note={a.note} taille="text-sm" />
              </div>
              {a.commentaire && (
                <p className="font-medium leading-relaxed text-graphite">{a.commentaire}</p>
              )}
              <p className="mt-3 text-xs font-medium text-graphite/70">
                Achat vérifié — {new Date(a.publieLe).toLocaleDateString("fr-FR")}
              </p>
            </article>
          ))}
        </div>
      </section>
    )}

    {similaires.length > 0 && (
      <section className="max-w-6xl mx-auto px-5 pb-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2 h-2 rounded-full bg-volt" />
          <h2 className="font-display font-bold text-xl">Dans le même rayon</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {similaires.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    )}
    </>
  );
}
