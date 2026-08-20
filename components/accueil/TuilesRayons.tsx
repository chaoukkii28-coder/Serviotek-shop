import Link from "next/link";
import { CATEGORIES, lienCategorie } from "@/lib/categories";
import { imagesRayon } from "@/lib/vitrine";
import Vignette from "@/components/accueil/Vignette";

export default function TuilesRayons() {
  return (
    <section className="grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(132px,1fr))]">
      {CATEGORIES.map((cat) => {
        const images = imagesRayon(cat.id, 4);
        if (images.length === 0) return null;

        return (
          <Link
            key={cat.id}
            href={lienCategorie(cat.id)}
            className="flex min-w-0 flex-col gap-3.5 rounded bg-white p-[18px]"
          >
            <span
              className="text-[16.5px] font-bold tracking-[-0.02em]"
              style={{ color: cat.couleurClair }}
            >
              {cat.label}
            </span>
            <span className="grid grid-cols-2 gap-2 [grid-template-columns:repeat(2,minmax(0,84px))]">
              {images.map((img, i) => (
                <Vignette key={i} src={img} alt={cat.label} sizes="84px" />
              ))}
            </span>
            <span className="text-[13px] text-violet">Voir le rayon →</span>
          </Link>
        );
      })}
    </section>
  );
}
