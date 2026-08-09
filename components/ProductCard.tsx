import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/produit/${product.slug}`}
      className="group block bg-panel border border-wire rounded-2xl overflow-hidden hover:border-volt transition-colors"
    >
      <div className="relative aspect-square bg-black/20">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, 300px"
          className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-volt text-graphite text-xs font-bold px-2 py-1 rounded-full">
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-display font-bold leading-tight">{product.name}</h3>
        <p className="text-mist text-sm mt-1">{product.tagline}</p>
        <div className="spec-strip my-3" />
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-volt text-lg">{product.price.toFixed(2)} €</span>
          <span className="text-xs text-mist font-mono">→ voir fiche</span>
        </div>
      </div>
    </Link>
  );
}
