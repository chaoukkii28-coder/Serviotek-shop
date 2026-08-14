"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { useState } from "react";

export default function PanierPage() {
  const { items, remove, setQty, total, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ slug: i.product.slug, qty: i.qty })),
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Erreur lors du paiement.");
      }
    } catch {
      setError("Impossible de contacter le service de paiement.");
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-5 py-20 text-center">
        <p className="font-mono text-mist mb-4">// panier vide</p>
        <h1 className="font-display font-bold text-2xl mb-6">Ton panier est vide</h1>
        <Link href="/#catalogue" className="underline hover:text-volt">
          Voir le catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      <h1 className="font-display font-bold text-2xl mb-8">Ton panier</h1>

      <div className="space-y-4">
        {items.map(({ product, qty }) => (
          <div
            key={product.slug}
            className="flex gap-4 border border-wire rounded-xl p-4 items-center"
          >
            <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-panel shrink-0">
              <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <p className="font-medium">{product.name}</p>
              <p className="font-mono text-volt text-sm">{product.price.toFixed(2)} €</p>
            </div>
            <input
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(product.slug, parseInt(e.target.value) || 1)}
              className="w-16 bg-panel border border-wire rounded-lg text-center py-1"
            />
            <button
              onClick={() => remove(product.slug)}
              className="text-mist hover:text-white text-sm"
            >
              Retirer
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-wire pt-6 flex items-center justify-between">
        <span className="text-mist">Total</span>
        <span className="font-mono text-2xl text-volt">{total.toFixed(2)} €</span>
      </div>

      {error && <p className="text-red-400 text-sm mt-4">{error}</p>}

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="mt-6 w-full bg-volt text-graphite font-bold py-3 rounded-full disabled:opacity-50"
      >
        {loading ? "Redirection..." : "Passer au paiement"}
      </button>

      <button onClick={clear} className="mt-3 w-full text-mist text-sm hover:text-white">
        Vider le panier
      </button>
    </div>
  );
}
