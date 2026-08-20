"use client";

/**
 * Petit retour visuel façon Amazon : une pastille part du bouton cliqué
 * jusqu'à l'icône panier du header (id="icone-panier"), pour confirmer
 * l'ajout sans avoir à naviguer vers /panier.
 */
export function animerVersPanier(origine: HTMLElement) {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const cible = document.getElementById("icone-panier");
  if (!cible) return;

  // Vibration courte sur les appareils qui la supportent (Android surtout ;
  // ignorée silencieusement ailleurs, ex. iOS Safari).
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(15);
  }

  const depart = origine.getBoundingClientRect();
  const arrivee = cible.getBoundingClientRect();

  const pastille = document.createElement("div");
  Object.assign(pastille.style, {
    position: "fixed",
    left: `${depart.left + depart.width / 2 - 6}px`,
    top: `${depart.top + depart.height / 2 - 6}px`,
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: "oklch(0.48 0.17 295)",
    zIndex: "9999",
    pointerEvents: "none",
    transition: "transform 550ms cubic-bezier(0.2,0.8,0.2,1), opacity 550ms ease",
  });
  document.body.appendChild(pastille);

  const dx = arrivee.left + arrivee.width / 2 - (depart.left + depart.width / 2);
  const dy = arrivee.top + arrivee.height / 2 - (depart.top + depart.height / 2);

  requestAnimationFrame(() => {
    pastille.style.transform = `translate(${dx}px, ${dy}px) scale(0.25)`;
    pastille.style.opacity = "0.2";
  });

  setTimeout(() => pastille.remove(), 600);

  cible.style.transition = "transform 180ms ease";
  cible.style.transform = "scale(1.12)";
  setTimeout(() => {
    cible.style.transform = "scale(1)";
  }, 220);
}
