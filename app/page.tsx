import { products } from "@/lib/products";
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
          <p className="font-mono text-volt text-sm mb-3">// petits objets, vrai usage</p>
          <h1 className="font-display font-bold text-4xl sm:text-6xl uppercase tracking-tight leading-[1.05]">
            Tous connectés
          </h1>

          <div className="flex flex-wrap gap-2 mt-6">
            {MESSAGES.map((m) => (
              <span
                key={m.label}
                className="inline-flex items-center gap-2 rounded-full border border-wire bg-panel px-3 py-1.5 text-xs font-medium text-mist shadow-sm"
              >
                <span aria-hidden="true">{m.icon}</span>
                {m.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="catalogue" className="max-w-6xl mx-auto px-5 pt-10 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2 h-2 rounded-full bg-volt" />
          <h2 className="font-display font-bold text-xl">Catalogue</h2>
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
