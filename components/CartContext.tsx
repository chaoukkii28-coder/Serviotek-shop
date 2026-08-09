"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Product } from "@/lib/products";

type CartItem = { product: Product; qty: number };
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

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  function add(product: Product) {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.slug === product.slug);
      if (existing) {
        return prev.map((i) =>
          i.product.slug === product.slug ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { product, qty: 1 }];
    });
  }

  function remove(slug: string) {
    setItems((prev) => prev.filter((i) => i.product.slug !== slug));
  }

  function setQty(slug: string, qty: number) {
    setItems((prev) =>
      prev.map((i) => (i.product.slug === slug ? { ...i, qty: Math.max(1, qty) } : i))
    );
  }

  function clear() {
    setItems([]);
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
