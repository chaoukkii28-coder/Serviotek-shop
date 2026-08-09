"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Choix = "accepte" | "refuse";

const CLE_STOCKAGE = "serviotek_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const choixExistant = localStorage.getItem(CLE_STOCKAGE);
    if (!choixExistant) {
      setVisible(true);
    }
  }, []);

  const enregistrerChoix = (choix: Choix) => {
    localStorage.setItem(CLE_STOCKAGE, choix);
    localStorage.setItem(CLE_STOCKAGE + "_date", new Date().toISOString());
    setVisible(false);

    // Si tu ajoutes plus tard Google Analytics, Meta Pixel, etc.,
    // c'est ici qu'il faut activer/désactiver leur chargement
    // en fonction de "choix".
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Consentement aux cookies"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-teal-800/40 bg-neutral-900/95 backdrop-blur-sm text-neutral-100 px-4 py-5 sm:px-8"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-neutral-300">
          Nous utilisons des cookies strictement nécessaires au fonctionnement
          du site (panier, connexion) ainsi que, si vous l&apos;acceptez, des
          cookies de mesure d&apos;audience. Vous pouvez accepter ou refuser
          les cookies non essentiels. Pour en savoir plus, consultez notre{" "}
          <Link
            href="/confidentialite"
            className="underline decoration-teal-500 underline-offset-2 hover:text-teal-400"
          >
            politique de confidentialité
          </Link>
          .
        </p>

        <div className="flex shrink-0 gap-3">
          <button
            onClick={() => enregistrerChoix("refuse")}
            className="rounded-md border border-neutral-600 px-4 py-2 text-sm font-medium text-neutral-200 transition hover:border-neutral-400"
          >
            Refuser
          </button>
          <button
            onClick={() => enregistrerChoix("accepte")}
            className="rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-neutral-900 transition hover:bg-amber-400"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
