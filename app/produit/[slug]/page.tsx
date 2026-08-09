import Image from "next/image";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/products";
import AddToCartButton from "@/components/AddToCartButton";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) return notFound();

  return (
    <div className="max-w-6xl mx-auto px-5 py-10 grid sm:grid-cols-2 gap-10">
      <div className="relative aspect-square bg-panel border border-wire rounded-2xl overflow-hidden">
        <Image src={product.image} alt={product.name} fill className="object-cover" />
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
              <div key={s.label} className="flex justify-between px-4 py-3 text-sm">
                <dt className="text-mist">{s.label}</dt>
                <dd className="font-mono">{s.value}</dd>
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
