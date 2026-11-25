import Image from "next/image";

// Livre des Éditions Serviotek, vendu sur Amazon (pas dans le panier du site).
const FORMATS = [
  { label: "Kindle", prix: "9,99 €", url: "https://www.amazon.fr/dp/B0HNTSNJW1" },
  { label: "Broché", prix: "23,60 €", url: "https://www.amazon.fr/dp/B0HSWQH7CM" },
  { label: "Relié", prix: "33,08 €", url: "https://www.amazon.fr/dp/B0HSVWPYCR" },
];

export default function BandeauLivre() {
  return (
    <section className="flex flex-wrap items-center gap-[clamp(16px,3vw,32px)] rounded bg-encre p-[clamp(16px,3vw,28px)] text-creme">
      <a
        href={FORMATS[1].url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block aspect-[2/3] w-[clamp(110px,18vw,170px)] shrink-0 overflow-hidden rounded-[3px]"
      >
        <Image
          src="/images/livre/guide-reconstruction.jpg"
          alt="Couverture du livre Le Guide de la Reconstruction"
          fill
          sizes="170px"
          className="object-cover"
        />
      </a>
      <div className="flex min-w-[240px] flex-1 flex-col gap-3">
        <p className="font-mono text-[11.5px] tracking-[0.1em] text-clairMuted">
          NOUVEAU · ÉDITIONS SERVIOTEK
        </p>
        <p
          className="text-balance font-bold leading-[1.05] tracking-[-0.035em]"
          style={{ fontSize: "clamp(24px, 3vw, 34px)" }}
        >
          Le Guide de la Reconstruction
        </p>
        <p className="max-w-[60ch] text-[14.5px] leading-normal text-clairMuted">
          Coupure de courant, inondation, eau coupée, alerte : les gestes essentiels pour
          protéger votre famille et repartir de zéro. Une idée de cadeau utile pour Noël.
        </p>
        <div className="flex flex-wrap gap-2.5">
          {FORMATS.map((f) => (
            <a
              key={f.label}
              href={f.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded bg-vert px-4 py-2.5 text-[14px] font-bold text-white hover:opacity-90"
            >
              {f.label} · <span className="font-mono">{f.prix}</span>
            </a>
          ))}
        </div>
        <p className="text-[14px] text-clairMuted">
          Version poche :{" "}
          <a
            href="https://www.amazon.fr/dp/B0HSVYCW2M"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-white underline hover:opacity-90"
          >
            Le Mémo de la Reconstruction · <span className="font-mono">10,33 €</span>
          </a>{" "}
          — l'essentiel pour les 72 premières heures.
        </p>
        <p className="font-mono text-[11px] text-clairMuted">
          Vendu et expédié par Amazon ·{" "}
          <a
            href="https://www.amazon.fr/Chaouki/e/B0HSW64JTL"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            Page auteur
          </a>
        </p>
      </div>
    </section>
  );
}
