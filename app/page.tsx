import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-5 pt-14 pb-16">
        <p className="font-mono text-volt text-sm mb-3">// petits objets, vrai usage</p>
        <h1 className="font-display font-bold text-4xl sm:text-5xl max-w-2xl leading-[1.1]">
          Des gadgets électriques utiles, testés, au juste prix.
        </h1>
        <p className="text-mist mt-4 max-w-xl">
          Chaque fiche produit indique clairement autonomie, puissance et
          délais de livraison — pas de mauvaise surprise à la caisse.
        </p>
      </section>

      <section id="catalogue" className="max-w-6xl mx-auto px-5 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2 h-2 rounded-full bg-volt" />
          <h2 className="font-display font-bold text-xl">Catalogue</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
