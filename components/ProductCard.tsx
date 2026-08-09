import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/produit/${product.slug}`}
      className="group block bg-panel border border-wire rounded-xl overflow-hidden hover:border-volt transition-colors"
    >
      <div className="relative aspect-square bg-black/20">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, 220px"
          className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
        />
        {product.badge && (
          <span className="absolute top-2 left-2 bg-volt text-graphite text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-2.5">
        <h3 className="font-display font-bold leading-tight text-sm line-clamp-2">{product.name}</h3>
        <p className="text-mist text-xs mt-0.5 line-clamp-1">{product.tagline}</p>
        <div className="spec-strip my-2" />
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-volt text-base">{product.price.toFixed(2)} €</span>
          <span className="text-[10px] text-mist font-mono">→ voir fiche</span>
        </div>
      </div>
    </Link>
  );
}
