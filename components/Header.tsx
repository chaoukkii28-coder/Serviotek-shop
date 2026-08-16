"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/components/CartContext";

const CATEGORIES = [
  { label: "Audio & Écouteurs", href: "/produit?categorie=audio", color: "bg-sky-500" },
  { label: "Maison connectée", href: "/produit?categorie=maison", color: "bg-lime-500" },
  { label: "Bricolage & Outils", href: "/produit?categorie=bricolage", color: "bg-amber-500" },
  { label: "Détection & Extérieur", href: "/produit?categorie=detection", color: "bg-rose-500" },
  { label: "Bien-être & Style", href: "/produit?categorie=bien-etre", color: "bg-violet-500" },
  { label: "Chargeurs & Accessoires", href: "/produit?categorie=accessoires", color: "bg-orange-500" },
  { label: "Rentrée scolaire", href: "/produit?categorie=scolaire", color: "bg-red-600" },
];

export default function Header() {
  const [query, setQuery] = useState("");
  const [menuOuvert, setMenuOuvert] = useState(false);

  // Si ton CartContext expose autre chose que "items", adapte cette ligne.
  let nombreArticles = 0;
  try {
    const cart = useCart();
    nombreArticles =
      cart?.items?.reduce((total: number, item: any) => total + (item.quantity ?? 1), 0) ?? 0;
  } catch {
    nombreArticles = 0;
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/produit?recherche=${encodeURIComponent(query.trim())}`;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white">
      {/* Barre principale */}
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-neutral-900">
            SERVIOTEK
          </span>
        </Link>

        {/* Barre de recherche */}
        <form
          onSubmit={handleSearch}
          className="hidden flex-1 items-center sm:flex"
        >
          <div className="flex w-full overflow-hidden rounded-full border border-neutral-300 focus-within:border-lime-500 focus-within:ring-2 focus-within:ring-lime-200">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un gadget, une catégorie..."
              className="w-full bg-white px-4 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Rechercher"
              className="flex items-center justify-center bg-lime-400 px-4 text-neutral-900 transition hover:bg-lime-300"
            >
              <Search size={18} />
            </button>
          </div>
        </form>

        {/* Panier */}
        <Link
          href="/panier"
          className="relative flex shrink-0 items-center gap-2 rounded-full border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-900 transition hover:border-neutral-400"
        >
          <ShoppingCart size={20} />
          <span className="hidden sm:inline">Panier</span>
          {nombreArticles > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-lime-400 px-1 text-xs font-bold text-neutral-900">
              {nombreArticles}
            </span>
          )}
        </Link>

        {/* Bouton menu mobile */}
        <button
          onClick={() => setMenuOuvert(!menuOuvert)}
          className="flex shrink-0 items-center justify-center rounded-md p-2 text-neutral-900 sm:hidden"
          aria-label="Menu"
        >
          {menuOuvert ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Recherche mobile */}
      <form onSubmit={handleSearch} className="px-4 pb-3 sm:hidden">
        <div className="flex overflow-hidden rounded-full border border-neutral-300">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher..."
            className="w-full bg-white px-4 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Rechercher"
            className="flex items-center justify-center bg-lime-400 px-4 text-neutral-900"
          >
            <Search size={18} />
          </button>
        </div>
      </form>

      {/* Catégories - desktop */}
      <nav className="hidden border-t border-neutral-100 bg-neutral-50 sm:block">
        <ul className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-4 py-2 text-sm font-medium text-neutral-700 sm:px-6">
          {CATEGORIES.map((cat) => (
            <li key={cat.href}>
              <Link
                href={cat.href}
                className="flex items-center gap-2 whitespace-nowrap transition hover:text-neutral-900 hover:underline underline-offset-4"
              >
                <span className={`h-2 w-2 shrink-0 rounded-full ${cat.color}`} />
                {cat.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Catégories - menu mobile déroulant */}
      {menuOuvert && (
        <nav className="border-t border-neutral-100 bg-neutral-50 sm:hidden">
          <ul className="flex flex-col divide-y divide-neutral-200 px-4">
            {CATEGORIES.map((cat) => (
              <li key={cat.href}>
                <Link
                  href={cat.href}
                  onClick={() => setMenuOuvert(false)}
                  className="flex items-center gap-2 py-3 text-sm font-medium text-neutral-800"
                >
                  <span className={`h-2 w-2 shrink-0 rounded-full ${cat.color}`} />
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
