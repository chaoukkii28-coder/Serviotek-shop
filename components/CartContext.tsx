"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { QUANTITE_MAX, getProduct, type Product } from "@/lib/products";

type CartItem = { product: Product; qty: number };

/**
 * Seuls le slug et la quantité sont conservés. Stocker la fiche produit
 * entière figeait le prix au moment de l'ajout : après un changement de
 * tarif, le panier affichait l'ancien prix alors que Stripe encaissait le
 * nouveau.
 */
type LigneStockee = { slug: string; qty: number };

type CartContextType = {
  items: CartItem[];
  add: (product: Product) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  total: number;
  count: number;
};

const CartContext = createContext<CartContextType | null>(null);
const STORAGE_KEY = "serviotek_cart";

function borner(qty: number) {
  if (!Number.isFinite(qty)) return 1;
  return Math.min(Math.max(Math.trunc(qty), 1), QUANTITE_MAX);
}

/** Accepte l'ancien format ({ product, qty }) comme le nouveau ({ slug, qty }). */
function lireStockage(brut: string): LigneStockee[] {
  const donnees = JSON.parse(brut);
  if (!Array.isArray(donnees)) return [];

  return donnees
    .map((ligne): LigneStockee | null => {
      const slug = ligne?.slug ?? ligne?.product?.slug;
      if (typeof slug !== "string") return null;
      return { slug, qty: borner(Number(ligne?.qty)) };
    })
    .filter((ligne): ligne is LigneStockee => ligne !== null);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lignes, setLignes] = useState<LigneStockee[]>([]);
  const [hydrated, setHydrated] = useState(false);
  // React exécute les effets des enfants avant ceux du parent : la page de
  // confirmation vide le panier avant que la relecture du stockage ait eu
  // lieu, et celle-ci le ressuscitait aussitôt.
  const videManuellement = useRef(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw && !videManuellement.current) setLignes(lireStockage(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lignes));
  }, [lignes, hydrated]);

  // Une référence retirée du catalogue disparaît du panier au lieu d'y rester
  // fantôme et de faire échouer le paiement.
  const items = useMemo(
    () =>
      lignes
        .map((ligne) => {
          const product = getProduct(ligne.slug);
          return product ? { product, qty: ligne.qty } : null;
        })
        .filter((item): item is CartItem => item !== null),
    [lignes]
  );

  function add(product: Product) {
    setLignes((prev) => {
      const existante = prev.find((l) => l.slug === product.slug);
      if (existante) {
        return prev.map((l) =>
          l.slug === product.slug ? { ...l, qty: borner(l.qty + 1) } : l
        );
      }
      return [...prev, { slug: product.slug, qty: 1 }];
    });
  }

  function remove(slug: string) {
    setLignes((prev) => prev.filter((l) => l.slug !== slug));
  }

  function setQty(slug: string, qty: number) {
    setLignes((prev) =>
      prev.map((l) => (l.slug === slug ? { ...l, qty: borner(qty) } : l))
    );
  }

  function clear() {
    videManuellement.current = true;
    setLignes([]);
    // Effacé tout de suite, sans attendre l'effet d'écriture : sinon une
    // relecture du stockage peut encore trouver l'ancien panier.
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }

  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.product.price * i.qty, 0),
    [items]
  );
  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);

  return (
    <CartContext.Provider value={{ items, add, remove, setQty, clear, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit être utilisé dans un CartProvider");
  return ctx;
}
