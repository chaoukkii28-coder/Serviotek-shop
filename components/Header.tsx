"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { CATEGORIES, lienCategorie } from "@/lib/categories";

export default function Header() {
  const [query, setQuery] = useState("");
  const { count } = useCart();

  function chercher(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/produit?recherche=${encodeURIComponent(query.trim())}`;
    }
  }

  return (
    <header className="bg-encre text-creme">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-3.5 px-[clamp(12px,2.5vw,22px)] py-3">
        <Link
          href="/"
          className="shrink-0 rounded-[3px] bg-vert px-[11px] py-[7px] font-mono text-lg font-bold text-encre"
        >
          SERVIOTEK
        </Link>

        <form onSubmit={chercher} className="flex min-w-[240px] flex-1 overflow-hidden rounded-[3px] bg-white">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un produit…"
            className="flex-1 border-0 px-3.5 py-[11px] text-[14.5px] text-encre outline-none placeholder:text-grisDiscret"
          />
          <button
            type="submit"
            aria-label="Rechercher"
            className="bg-vert px-[18px] font-mono text-[13px] font-bold text-encre"
          >
            OK
          </button>
        </form>

        <Link href="/compte" className="shrink-0 text-[13.5px] text-clairMuted hover:text-white">
          Compte
        </Link>
        <Link
          id="icone-panier"
          href="/panier"
          className="shrink-0 rounded-[3px] bg-creme px-3.5 py-[9px] font-mono text-[13px] font-bold text-encre"
        >
          PANIER {count}
        </Link>
      </div>

      <div className="border-t border-sepSombre">
        <nav className="mx-auto flex max-w-[1400px] flex-wrap gap-5 px-[clamp(12px,2.5vw,22px)] py-[9px] text-[13.5px] font-medium">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={lienCategorie(cat.id)}
              style={{ color: cat.couleurSombre }}
              className="hover:opacity-80"
            >
              {cat.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
