"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { QUANTITE_MAX } from "@/lib/products";
import { formaterPrix } from "@/lib/vitrine";
import { useState } from "react";

export default function PanierPage() {
  const { items, remove, setQty, total } = useCart();
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
      <div className="min-h-screen bg-fond px-5 py-20 text-center">
        <h1 className="mb-4 text-2xl font-bold tracking-[-0.03em]">Ton panier est vide</h1>
        <Link href="/#catalogue" className="text-violet underline">
          Voir le catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-fond px-[clamp(12px,2.5vw,22px)] py-10">
      <div className="mx-auto max-w-[1400px]">
        <h1 className="mb-6 text-2xl font-bold tracking-[-0.03em] sm:text-[32px]">Votre panier</h1>

        <div className="grid items-start gap-4 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
          <div className="rounded bg-white p-5 sm:p-[22px]">
            {items.map(({ product, qty }) => (
              <div
                key={product.slug}
                className="grid grid-cols-[76px_1fr_auto] items-center gap-4 border-b border-bordureSep py-[18px] last:border-b-0"
              >
                <div className="relative aspect-square overflow-hidden rounded-[3px] bg-[repeating-linear-gradient(135deg,#e7e5df_0_6px,#f1efe9_6px_12px)]">
                  <Image src={product.images[0]} alt={product.name} fill sizes="76px" className="object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[15px] font-medium text-encre">{product.name}</p>
                  <div className="mt-1.5 flex items-center gap-1.5 font-mono text-[11.5px] text-violet">
                    <button
                      type="button"
                      onClick={() => setQty(product.slug, Math.max(1, qty - 1))}
                      aria-label="Diminuer la quantité"
                      className="px-1 hover:opacity-70"
                    >
                      −
                    </button>
                    <span>Qté {qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty(product.slug, Math.min(QUANTITE_MAX, qty + 1))}
                      aria-label="Augmenter la quantité"
                      className="px-1 hover:opacity-70"
                    >
                      +
                    </button>
                    <span>·</span>
                    <button type="button" onClick={() => remove(product.slug)} className="hover:opacity-70">
                      Retirer
                    </button>
                  </div>
                </div>
                <span className="font-mono text-[17px] font-bold text-encre">
                  {formaterPrix(product.price * qty)}
                </span>
              </div>
            ))}
            <p className="mt-4 font-mono text-[13.5px] text-grisDiscret">
              Livraison France · Belgique · Suisse · Luxembourg — retour sous 14 jours
            </p>
          </div>

          <div className="rounded bg-white p-5 sm:p-[22px]">
            <div className="flex justify-between border-b border-bordureSep pb-3 text-[14.5px] text-grisTexte">
              <span>Sous-total</span>
              <span>{formaterPrix(total)}</span>
            </div>
            <div className="flex justify-between border-b border-bordureSep py-3 text-[14.5px] text-grisTexte">
              <span>Livraison</span>
              <span className="font-bold text-violet">Offerte</span>
            </div>
            <div className="flex justify-between pt-3">
              <span className="text-[15px] font-bold text-encre">Total</span>
              <span className="font-mono text-2xl font-bold text-encre">{formaterPrix(total)}</span>
            </div>

            {error && <p className="mt-3 text-sm font-bold text-red-600">{error}</p>}

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="mt-5 h-12 w-full rounded-[3px] bg-vert font-bold text-vertTexteSombre transition hover:bg-encre hover:text-creme disabled:opacity-50"
            >
              {loading ? "Redirection…" : "Passer commande"}
            </button>
            <p className="mt-3 text-center font-mono text-[11px] text-grisDiscret">
              PAIEMENT SÉCURISÉ · CB, VISA, MASTERCARD
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
