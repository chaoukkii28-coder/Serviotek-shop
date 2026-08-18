import Link from "next/link";
import { products } from "@/lib/products";
import { CATEGORIES, lienCategorie } from "@/lib/categories";
import ProductCard from "@/components/ProductCard";

const MESSAGES = [
  { icon: "🌱", label: "Produits durables" },
  { icon: "🔧", label: "Réparables" },
  { icon: "♻️", label: "Emballages responsables" },
];

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden bg-white">
        <div className="max-w-6xl mx-auto px-5 pt-14">
          <p className="font-mono text-green-800 text-sm mb-3">// petits objets, vrai usage</p>
          <h1 className="font-display font-bold text-4xl sm:text-6xl uppercase tracking-tight leading-[1.05]">
            Tous connectés
          </h1>
          <p className="mt-4 max-w-xl font-bold text-green-800">
            Serviotek sélectionne des gadgets électriques utiles pour la maison,
            l'audio, le bricolage et le quotidien — au juste prix, livraison en France.
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            {MESSAGES.map((m) => (
              <span
                key={m.label}
                className="inline-flex items-center gap-2 rounded-full border border-wire bg-panel px-3 py-1.5 text-xs font-bold text-graphite shadow-sm"
              >
                <span aria-hidden="true">{m.icon}</span>
                {m.label}
              </span>
            ))}
          </div>

        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 pt-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2 h-2 rounded-full bg-volt" />
          <h2 className="font-display font-bold text-xl">Nos rayons</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {CATEGORIES.map((cat) => {
            const total = products.filter((p) => p.categorie === cat.id).length;
            if (total === 0) return null;

            return (
              <Link
                key={cat.id}
                href={lienCategorie(cat.id)}
                className="group flex items-center justify-between gap-3 rounded-xl border border-wire px-4 py-3 transition hover:border-neutral-400"
              >
                <span className="flex items-center gap-2 text-sm font-bold text-graphite">
                  <span className={`h-2 w-2 shrink-0 rounded-full ${cat.couleur}`} />
                  {cat.label}
                </span>
                <span className="font-mono text-xs font-bold text-graphite">{total}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section id="catalogue" className="max-w-6xl mx-auto px-5 pt-12 pb-24">
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-volt" />
            <h2 className="font-display font-bold text-xl">Catalogue</h2>
          </div>
          <span className="font-mono text-xs font-bold text-graphite">{products.length} produits</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
