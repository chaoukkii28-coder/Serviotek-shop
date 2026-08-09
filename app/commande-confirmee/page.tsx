"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/components/CartContext";

export default function ConfirmationPage() {
  const { clear } = useCart();

  useEffect(() => {
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-xl mx-auto px-5 py-24 text-center">
      <p className="font-mono text-volt text-sm mb-3">// paiement confirmé</p>
      <h1 className="font-display font-bold text-3xl mb-4">Merci pour ta commande !</h1>
      <p className="text-mist mb-8">
        Tu vas recevoir un e-mail de confirmation. Compte tenu du fonctionnement en
        dropshipping, la livraison peut prendre 7 à 14 jours ouvrés.
      </p>
      <Link href="/#catalogue" className="underline hover:text-volt">
        Continuer mes achats
      </Link>
    </div>
  );
}
