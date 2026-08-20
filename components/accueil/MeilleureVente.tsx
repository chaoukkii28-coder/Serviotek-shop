"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/CartContext";
import { formaterPrix } from "@/lib/vitrine";
import type { Product } from "@/lib/products";

/** Choix éditorial : le collier chat, prix d'appel, vraies photos. Pas un calcul de ventes réelles. */
export default function MeilleureVente({ produit }: { produit: Product }) {
  const { add } = useCart();

  return (
    <Link
      href={`/produit/${produit.slug}`}
      className="order-3 flex min-h-[250px] min-w-0 flex-col overflow-hidden rounded p-0"
      style={{ backgroundColor: "#8b3fd4" }}
    >
      <span
        className="text-center font-mono font-bold"
        style={{ fontSize: 12, letterSpacing: "0.08em", padding: "7px 0 6px", color: "#f4f3ec" }}
      >
        MEILLEURE VENTE
      </span>

      <div className="relative min-h-[165px] flex-1">
        <Image src={produit.images[0]} alt={produit.name} fill sizes="(max-width: 640px) 90vw, 420px" className="object-cover" />
      </div>

      <div className="flex items-center justify-between gap-2 bg-white" style={{ padding: "6px 9px" }}>
        <div className="min-w-0">
          <p className="truncate text-[12px] font-bold text-encre">{produit.name}</p>
          <p className="font-mono text-[13px] font-bold text-encre">{formaterPrix(produit.price)}</p>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            add(produit);
          }}
          className="shrink-0 rounded-full font-bold text-white transition hover:bg-encre"
          style={{ backgroundColor: "oklch(0.48 0.17 295)", fontSize: 11, padding: "5px 9px" }}
        >
          ⊕ Ajouter
        </button>
      </div>
    </Link>
  );
}
