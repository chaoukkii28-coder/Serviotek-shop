"use client";

import { useState } from "react";
import { useCart } from "./CartContext";
import { Product } from "@/lib/products";

export default function AddToCartButton({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    add(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button
      onClick={handleClick}
      className="w-full sm:w-auto bg-volt text-graphite font-bold px-6 py-3 rounded-full hover:brightness-95 transition"
    >
      {added ? "Ajouté ✓" : "Ajouter au panier"}
    </button>
  );
}
