import Link from "next/link";
import type { Product } from "@/lib/products";
import { NOMS_CATEGORIES, COULEUR_CLAIRE_CATEGORIE } from "@/lib/categories";
import { formaterPrix } from "@/lib/vitrine";
import Vignette from "@/components/accueil/Vignette";

export default function GrilleProduits({
  id,
  titre,
  lienTout,
  produits,
  minWidth,
  afficherCategorie = false,
}: {
  id?: string;
  titre: string;
  lienTout?: string;
  produits: Product[];
  minWidth: number;
  afficherCategorie?: boolean;
}) {
  return (
    <section id={id} className="rounded bg-white p-5 sm:p-[22px]">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="m-0 text-xl font-bold tracking-[-0.025em]">{titre}</h2>
        {lienTout && (
          <Link href={lienTout} className="font-mono text-[12.5px] text-violet">
            TOUT VOIR →
          </Link>
        )}
      </div>
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}px, 1fr))` }}
      >
        {produits.map((p) => (
          <Link key={p.slug} href={`/produit/${p.slug}`} className="flex min-w-0 flex-col gap-[7px]">
            <Vignette src={p.images[0]} alt={p.name} sizes={`${minWidth}px`} />
            {afficherCategorie && (
              <span
                className="font-mono text-[9.5px] font-bold tracking-[0.05em]"
                style={{ color: COULEUR_CLAIRE_CATEGORIE[p.categorie] }}
              >
                {NOMS_CATEGORIES[p.categorie].toUpperCase()}
              </span>
            )}
            <span className="text-[13px] leading-[1.3] text-encre">{p.name}</span>
            <span
              className={`mt-auto font-mono font-bold ${
                afficherCategorie ? "text-sm text-encre" : "text-[15px] text-violet"
              }`}
            >
              {formaterPrix(p.price)}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
