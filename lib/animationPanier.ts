"use client";

/**
 * Retour visuel façon Amazon : une pastille part du bouton cliqué et
 * survole un arc jusqu'à l'icône panier du header (id="icone-panier"),
 * pour confirmer l'ajout sans avoir à naviguer vers /panier.
 */
export function animerVersPanier(origine: HTMLElement) {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const cible = document.getElementById("icone-panier");
  if (!cible) return;

  // Vibration courte sur les appareils qui la supportent (Android surtout ;
  // ignorée silencieusement ailleurs, ex. iOS Safari).
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(20);
  }

  const depart = origine.getBoundingClientRect();
  const arrivee = cible.getBoundingClientRect();
  const TAILLE = 22;
  const DUREE = 800;

  const pastille = document.createElement("div");
  Object.assign(pastille.style, {
    position: "fixed",
    left: `${depart.left + depart.width / 2 - TAILLE / 2}px`,
    top: `${depart.top + depart.height / 2 - TAILLE / 2}px`,
    width: `${TAILLE}px`,
    height: `${TAILLE}px`,
    borderRadius: "50%",
    background: "oklch(0.48 0.17 295)",
    border: "2px solid #fff",
    zIndex: "9999",
    pointerEvents: "none",
  });
  document.body.appendChild(pastille);

  const dx = arrivee.left + arrivee.width / 2 - (depart.left + depart.width / 2);
  const dy = arrivee.top + arrivee.height / 2 - (depart.top + depart.height / 2);
  // Point intermédiaire relevé : donne une trajectoire en arc, plus lisible
  // qu'une ligne droite et plus proche de l'effet "vol" recherché.
  const sommetY = Math.min(dy * 0.5, -70);

  const anim = pastille.animate(
    [
      { transform: "translate(0px, 0px) scale(1)", opacity: 1, offset: 0 },
      { transform: `translate(${dx * 0.5}px, ${sommetY}px) scale(1.15)`, opacity: 1, offset: 0.55 },
      { transform: `translate(${dx}px, ${dy}px) scale(0.4)`, opacity: 0.25, offset: 1 },
    ],
    { duration: DUREE, easing: "cubic-bezier(0.3, 0, 0.4, 1)", fill: "forwards" }
  );

  anim.onfinish = () => pastille.remove();
  setTimeout(() => pastille.remove(), DUREE + 200);

  cible.style.transition = "transform 220ms ease";
  cible.style.transform = "scale(1.18)";
  setTimeout(() => {
    cible.style.transform = "scale(1)";
  }, DUREE);
}
