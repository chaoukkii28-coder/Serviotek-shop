"use client";

import Link from "next/link";
import type { Product } from "@/lib/products";
import { useCart } from "@/components/CartContext";
import { formaterPrix } from "@/lib/vitrine";
import { animerVersPanier } from "@/lib/animationPanier";
import Vignette from "@/components/accueil/Vignette";

/** Carte produit de la page catalogue/rayon, avec ajout réel au panier. */
export default function CarteCatalogue({ produit }: { produit: Product }) {
  const { add } = useCart();

  return (
    <Link
      href={`/produit/${produit.slug}`}
      className="flex min-w-0 flex-col gap-2 rounded bg-white p-3.5"
    >
      <Vignette src={produit.images[0]} alt={produit.name} sizes="150px" />
      <p className="text-[14.5px] font-medium leading-[1.3] text-encre">{produit.name}</p>
      <p className="flex-1 text-[12.5px] text-grisDiscret">{produit.tagline}</p>
      <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
        <span className="font-mono text-[16px] font-bold text-encre">
          {formaterPrix(produit.price)}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            add(produit);
            animerVersPanier(e.currentTarget);
          }}
          className="whitespace-nowrap font-mono text-[11px] text-violet hover:text-encre"
        >
          AJOUTER +
        </button>
      </div>
    </Link>
  );
}
