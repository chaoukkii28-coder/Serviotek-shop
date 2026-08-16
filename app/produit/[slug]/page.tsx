import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct, products } from "@/lib/products";
import AddToCartButton from "@/components/AddToCartButton";
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

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) return notFound();

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
      url: `https://serviotek-shop.vercel.app/produit/${product.slug}`,
    },
  };

  return (
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
        <p className="text-mist mt-2">{product.tagline}</p>
        <p className="font-mono text-volt text-2xl mt-6">{product.price.toFixed(2)} €</p>

        <p className="mt-6 leading-relaxed">{product.description}</p>

        <div className="mt-8">
          <p className="font-mono text-xs uppercase tracking-wider text-mist mb-3">
            Fiche technique
          </p>
          <dl className="border border-wire rounded-xl divide-y divide-wire">
            {product.specs.map((s) => (
              <div key={s.label} className="flex justify-between gap-4 px-4 py-3 text-sm">
                <dt className="text-mist shrink-0">{s.label}</dt>
                <dd className="font-mono text-right">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <p className="text-xs text-mist mt-6">
          Livraison estimée sous 7 à 14 jours ouvrés. Voir la page{" "}
          <a href="/livraison" className="underline hover:text-white">
            Livraison &amp; délais
          </a>.
        </p>

        <div className="mt-6">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
