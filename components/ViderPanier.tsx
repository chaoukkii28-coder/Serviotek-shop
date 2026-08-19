"use client";

import { useEffect } from "react";
import { useCart } from "@/components/CartContext";

/**
 * Vide le panier au retour de Stripe. Isolé dans son propre composant client
 * pour que la page de confirmation reste un composant serveur et puisse
 * interroger Stripe.
 */
export default function ViderPanier() {
  const { clear } = useCart();

  useEffect(() => {
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
