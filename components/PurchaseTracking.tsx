"use client";

import { useEffect } from "react";
import { CLE_CONSENTEMENT } from "@/components/consentement";

/**
 * Signale l'achat aux pixels Meta et TikTok (s'ils sont chargés et si le
 * client a accepté les cookies de mesure), pour que les campagnes
 * publicitaires puissent voir quelles ventes elles génèrent.
 *
 * Protégé contre le double comptage : un même id de commande ne déclenche
 * l'événement qu'une seule fois, même si la page de confirmation est
 * rafraîchie.
 */
export default function PurchaseTracking({
  idCommande,
  valeur,
  devise,
}: {
  idCommande: string;
  valeur: number;
  devise: string;
}) {
  useEffect(() => {
    if (localStorage.getItem(CLE_CONSENTEMENT) !== "accepte") return;

    const cleDejaEnvoye = `serviotek_achat_suivi_${idCommande}`;
    if (sessionStorage.getItem(cleDejaEnvoye)) return;
    sessionStorage.setItem(cleDejaEnvoye, "1");

    const w = window as typeof window & {
      fbq?: (...args: unknown[]) => void;
      ttq?: { track?: (...args: unknown[]) => void };
    };

    w.fbq?.("track", "Purchase", { value: valeur, currency: devise });
    w.ttq?.track?.("CompletePayment", { value: valeur, currency: devise });
  }, [idCommande, valeur, devise]);

  return null;
}
