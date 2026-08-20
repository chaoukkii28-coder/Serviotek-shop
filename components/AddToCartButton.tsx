"use client";

import { useState } from "react";
import { useCart } from "./CartContext";
import { Product, QUANTITE_MAX } from "@/lib/products";
import { animerVersPanier } from "@/lib/animationPanier";

export default function AddToCartButton({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    add(product, qty);
    animerVersPanier(e.currentTarget);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="flex gap-2.5">
      <div className="flex h-[46px] shrink-0 items-center overflow-hidden rounded-[3px] bg-creme">
        <button
          type="button"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          aria-label="Diminuer la quantité"
          className="h-full w-10 text-lg text-encre hover:bg-black/5"
        >
          −
        </button>
        <span className="w-8 text-center font-mono text-base text-encre">{qty}</span>
        <button
          type="button"
          onClick={() => setQty((q) => Math.min(QUANTITE_MAX, q + 1))}
          aria-label="Augmenter la quantité"
          className="h-full w-10 text-lg text-encre hover:bg-black/5"
        >
          +
        </button>
      </div>
      <button
        type="button"
        onClick={handleClick}
        className="h-[46px] flex-1 rounded-[3px] bg-vert font-bold text-vertTexteSombre transition hover:bg-encre hover:text-creme"
      >
        {added ? "Ajouté ✓" : "Ajouter au panier"}
      </button>
    </div>
  );
}
