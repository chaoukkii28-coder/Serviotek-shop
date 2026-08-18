"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/components/CartContext";
import { LIEN_AVIS, NOM_SERVICE_AVIS, avisActif } from "@/lib/avis";

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
        Tu vas recevoir un e-mail de confirmation. La livraison intervient sous
        5 jours ouvrés maximum.
      </p>
      {avisActif && (
        <div className="mb-10 rounded-xl border border-wire bg-panel px-6 py-6 text-left">
          <p className="font-display font-bold mb-2">Un avis, et on te laisse tranquille</p>
          <p className="text-sm text-mist mb-5">
            Serviotek est une jeune boutique : chaque avis compte énormément pour
            nous, et aide les prochains clients à se décider. Trente secondes
            suffisent.
          </p>
          <a
            href={LIEN_AVIS}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-volt px-5 py-2.5 text-sm font-bold text-graphite transition hover:opacity-90"
          >
            Laisser un avis sur {NOM_SERVICE_AVIS}
          </a>
        </div>
      )}

      <Link href="/#catalogue" className="underline hover:text-volt">
        Continuer mes achats
      </Link>
    </div>
  );
}
