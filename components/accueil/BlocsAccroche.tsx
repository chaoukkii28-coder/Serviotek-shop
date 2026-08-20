import Link from "next/link";
import Image from "next/image";
import { getProduct, products, type Categorie } from "@/lib/products";
import { lienCategorie, COULEUR_CLAIRE_CATEGORIE } from "@/lib/categories";
import { produitsMoinsDe, formaterPrix } from "@/lib/vitrine";
import Vignette from "@/components/accueil/Vignette";

const HERO_TUILES: { label: string; categorie: Categorie; produit: ReturnType<typeof getProduct> }[] = [
  { label: "Audio & Écouteurs", categorie: "audio", produit: products.find((p) => p.categorie === "audio") },
  { label: "Maison connectée", categorie: "maison", produit: products.find((p) => p.categorie === "maison") },
  { label: "Bricolage & Outils", categorie: "bricolage", produit: products.find((p) => p.categorie === "bricolage") },
];

/** Choix éditorial : produit à vraies photos, prix d'appel. Pas un calcul de ventes réelles. */
const MEILLEURE_VENTE = getProduct("ecouteurs-anc-reduction-bruit");

export default function BlocsAccroche() {
  const petitsPrix = produitsMoinsDe(20, 4);

  return (
    <section className="grid items-stretch gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))]">
      <Link
        href="/#catalogue"
        className="flex min-h-[250px] min-w-0 flex-col justify-between gap-[18px] rounded bg-white p-[22px]"
      >
        <div>
          <p
            className="mb-2.5 font-mono text-[11.5px] tracking-[0.1em]"
            style={{ color: "oklch(0.72 0.16 78)" }}
          >
            SÉLECTION DE LA SEMAINE
          </p>
          <p
            className="mb-2 text-balance font-bold leading-[1.05] tracking-[-0.035em]"
            style={{ fontSize: "clamp(26px, 3.4vw, 38px)", color: "oklch(0.48 0.17 295)" }}
          >
            Tout pour le quotidien
          </p>
          <p className="max-w-[46ch] text-[14.5px] leading-normal text-grisTexte">
            Des gadgets électriques utiles, testés, au juste prix.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {HERO_TUILES.map((t) =>
            t.produit ? (
              <div key={t.label} className="flex flex-col gap-2">
                <Vignette src={t.produit.images[0]} alt={t.label} sizes="96px" className="max-w-[96px]" />
                <span
                  className="text-[12.5px] font-bold leading-[1.3]"
                  style={{ color: COULEUR_CLAIRE_CATEGORIE[t.categorie] }}
                >
                  {t.label}
                </span>
              </div>
            ) : null
          )}
        </div>
      </Link>

      {MEILLEURE_VENTE && (
        <Link
          href={`/produit/${MEILLEURE_VENTE.slug}`}
          className="order-3 flex min-h-[250px] min-w-0 flex-col justify-between gap-6 rounded bg-vert p-[22px] text-vertTexteSombre"
        >
          <span className="font-mono text-[11.5px] font-bold tracking-[0.1em] text-violet">MEILLEURE VENTE</span>
          <div className="relative aspect-video overflow-hidden rounded-[3px] bg-white/35">
            <Image
              src={MEILLEURE_VENTE.images[0]}
              alt={MEILLEURE_VENTE.name}
              fill
              sizes="(max-width: 640px) 90vw, 420px"
              className="object-cover"
            />
          </div>
          <span>
            <span className="block text-xl font-bold leading-[1.15] tracking-[-0.025em]">
              {MEILLEURE_VENTE.name}
            </span>
            <span className="mt-1.5 block font-mono text-[19px] font-bold">
              {formaterPrix(MEILLEURE_VENTE.price)}
            </span>
          </span>
        </Link>
      )}

      <Link
        href="/#catalogue"
        className="order-2 flex min-h-[250px] min-w-0 flex-col justify-between gap-5 rounded bg-white p-[22px]"
      >
        <p className="font-mono text-[11.5px] tracking-[0.1em]" style={{ color: "#b02a22" }}>
          PETITS PRIX
        </p>
        <div className="grid grid-cols-2 gap-2 [grid-template-columns:repeat(2,minmax(0,88px))]">
          {petitsPrix.map((p) => (
            <Vignette key={p.slug} src={p.images[0]} alt={p.name} sizes="88px" />
          ))}
        </div>
        <p className="text-[17px] font-bold tracking-[-0.02em]">
          Moins de 20 €
          <span className="mt-1 block text-[13px] font-normal text-grisTexte">
            Voir les bonnes affaires →
          </span>
        </p>
      </Link>
    </section>
  );
}
