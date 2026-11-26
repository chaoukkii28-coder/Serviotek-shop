import Link from "next/link";
import Image from "next/image";

/**
 * Bloc mis en avant sur l'accueil (à la place de l'ancienne "meilleure vente"
 * chargeur). Les livres se vendent sur Amazon : pas de bouton panier, on
 * renvoie vers /livres qui liste les formats et les liens Amazon.
 * Libellé "Nouveau" et non "Meilleure vente" : aucune donnée de ventes ne
 * permet d'affirmer un classement (pratique commerciale trompeuse sinon).
 */
const COUVERTURES = [
  { src: "/images/livre/guide-reconstruction.jpg", alt: "Le Guide de la Reconstruction" },
  { src: "/images/livre/memo-reconstruction.jpg", alt: "Le Mémo de la Reconstruction" },
];

export default function LivreEnAvant() {
  return (
    <Link
      href="/livres"
      className="order-3 flex min-h-[250px] min-w-0 flex-col overflow-hidden rounded p-0"
      style={{ backgroundColor: "#8b3fd4" }}
    >
      <span
        className="text-center font-mono font-bold"
        style={{ fontSize: 12, letterSpacing: "0.08em", padding: "7px 0 6px", color: "#f4f3ec" }}
      >
        NOUVEAU · NOS LIVRES
      </span>

      <div className="flex min-h-[165px] flex-1 items-center justify-center gap-3 bg-encre px-3 py-3">
        {COUVERTURES.map((c) => (
          <div key={c.src} className="relative aspect-[2/3] h-full max-h-[190px] min-h-[140px]">
            <Image src={c.src} alt={c.alt} fill sizes="130px" className="object-contain" />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-2 bg-white" style={{ padding: "6px 9px" }}>
        <div className="min-w-0">
          <p className="truncate text-[12px] font-bold text-encre">Le Guide de la Reconstruction</p>
          <p className="font-mono text-[13px] font-bold text-encre">dès 9,99 €</p>
        </div>
        <span
          className="shrink-0 rounded-full font-bold text-white"
          style={{ backgroundColor: "oklch(0.48 0.17 295)", fontSize: 11, padding: "5px 9px" }}
        >
          Voir le livre →
        </span>
      </div>
    </Link>
  );
}
