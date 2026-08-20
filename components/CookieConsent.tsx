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
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-sepSombre bg-encre/95 px-4 py-5 text-creme backdrop-blur-sm sm:px-8"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13.5px] leading-relaxed text-clairMuted">
          Nous utilisons des cookies strictement nécessaires au fonctionnement
          du site (panier, connexion) ainsi que, si vous l&apos;acceptez, des
          cookies de mesure d&apos;audience. Vous pouvez accepter ou refuser
          les cookies non essentiels. Pour en savoir plus, consultez notre{" "}
          <Link href="/confidentialite" className="text-vertClair underline hover:text-white">
            politique de confidentialité
          </Link>
          .
        </p>

        <div className="flex shrink-0 gap-3">
          <button
            onClick={() => enregistrerChoix("refuse")}
            className="rounded-[3px] border border-sepSombre px-4 py-2 text-sm font-medium text-clairMuted transition hover:border-clairMuted"
          >
            Refuser
          </button>
          <button
            onClick={() => enregistrerChoix("accepte")}
            className="rounded-[3px] bg-vert px-4 py-2 text-sm font-bold text-vertTexteSombre transition hover:bg-white"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
