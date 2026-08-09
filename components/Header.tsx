"use client";

import Link from "next/link";
import { useCart } from "./CartContext";

export default function Header() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-20 bg-graphite/95 backdrop-blur border-b border-wire">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-volt" aria-hidden />
          <span className="font-display font-bold text-lg tracking-tight">
            SERVIOTEK
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/#catalogue" className="text-sm text-mist hover:text-white transition-colors">
            Catalogue
          </Link>
          <Link
            href="/panier"
            className="relative text-sm font-medium border border-wire rounded-full px-4 py-2 hover:border-volt transition-colors"
          >
            Panier
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-volt text-graphite text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
