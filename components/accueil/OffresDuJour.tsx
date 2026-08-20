"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { produitsEnPromo, prixRemise, formaterPrix } from "@/lib/vitrine";
import Vignette from "@/components/accueil/Vignette";

const PAR_PAGE = 6;
const ROTATION_MS = 4200;

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

function formaterCompteARebours(msRestantes: number) {
  const s = Math.max(0, Math.floor(msRestantes / 1000));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${pad(h)}:${pad(m)}:${pad(sec)}`;
}

export default function OffresDuJour() {
  const offres = produitsEnPromo();
  const pages = Math.max(1, Math.ceil(offres.length / PAR_PAGE));
  const echeance = offres[0]?.promo.until;

  const [page, setPage] = useState(0);
  // null tant que le composant n'est pas monté : évite un écart entre le
  // rendu serveur et le premier rendu client (Date.now() diffère forcément
  // des deux côtés), qui provoquait une erreur d'hydratation.
  const [maintenant, setMaintenant] = useState<number | null>(null);
  const rotation = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setMaintenant(Date.now());
    rotation.current = setInterval(() => {
      setPage((p) => (p + 1) % pages);
    }, ROTATION_MS);
    const tic = setInterval(() => setMaintenant(Date.now()), 1000);
    return () => {
      if (rotation.current) clearInterval(rotation.current);
      clearInterval(tic);
    };
  }, [pages]);

  function aller(direction: 1 | -1) {
    if (rotation.current) clearInterval(rotation.current);
    setPage((p) => (p + direction + pages) % pages);
  }

  if (offres.length === 0) return null;

  const msRestantes =
    echeance && maintenant !== null ? new Date(echeance).getTime() - maintenant : null;

  return (
    <section className="overflow-hidden rounded bg-encre px-[clamp(10px,1.6vw,16px)] pb-3.5 pt-3 text-creme">
      <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2.5">
        <h2 className="m-0 text-[15px] font-bold tracking-[-0.02em]">
          Offres du jour
          {msRestantes !== null && (
            <span className="ml-1.5 font-mono text-[11px] font-normal text-vertClair">
              se termine dans {formaterCompteARebours(msRestantes)}
            </span>
          )}
        </h2>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[10.5px] text-[#8b8e90]">
            {page + 1} / {pages}
          </span>
          <button
            type="button"
            onClick={() => aller(-1)}
            aria-label="Offre précédente"
            className="h-6 w-6 rounded-[3px] bg-boutonNav text-[13px] text-creme hover:bg-vert hover:text-encre"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => aller(1)}
            aria-label="Offre suivante"
            className="h-6 w-6 rounded-[3px] bg-boutonNav text-[13px] text-creme hover:bg-vert hover:text-encre"
          >
            ›
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-[550ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {Array.from({ length: pages }, (_, i) => (
            <div
              key={i}
              className="grid min-w-0 shrink-0 grow-0 basis-full grid-cols-6 gap-[7px]"
            >
              {offres.slice(i * PAR_PAGE, (i + 1) * PAR_PAGE).map((d) => (
                <Link
                  key={d.slug}
                  href={`/produit/${d.slug}`}
                  className="flex min-w-0 flex-col gap-[5px] rounded-[3px] bg-carteSombre p-1.5 hover:bg-carteSombreHover"
                >
                  <div className="relative max-w-[52px]">
                    <Vignette src={d.images[0]} alt={d.name} sizes="52px" sombre />
                    <span className="absolute left-0.5 top-0.5 rounded-[2px] bg-violet px-1 py-px font-mono text-[7px] font-bold text-white">
                      -{d.promo.pct}%
                    </span>
                  </div>
                  <span className="text-[10px] leading-[1.25] text-[#cfd2d0]">{d.name}</span>
                  <span className="mt-auto flex flex-wrap items-baseline gap-1">
                    <span className="font-mono text-[10.5px] font-bold text-vertClair">
                      {formaterPrix(prixRemise(d.price, d.promo.pct))}
                    </span>
                    <span className="font-mono text-[8.5px] text-[#7d8083] line-through">
                      {formaterPrix(d.price)}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
