import type { Metadata } from "next";
import Image from "next/image";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Livres de survie et de préparation — Éditions Serviotek",
  description:
    "Le Guide de la Reconstruction et Le Mémo de la Reconstruction : coupure de courant, inondation, eau coupée, alerte. Les gestes essentiels pour protéger votre famille. Une idée de cadeau utile pour Noël.",
  alternates: { canonical: `${SITE_URL}/livres` },
};

const AUTEUR_URL = "https://www.amazon.fr/Chaouki/e/B0HSW64JTL";

type Format = { label: string; prix: string; url: string };
type Livre = {
  titre: string;
  sousTitre: string;
  image: string;
  texte: string[];
  formats: Format[];
};

const LIVRES: Livre[] = [
  {
    titre: "Le Guide de la Reconstruction",
    sousTitre: "Tout savoir pour survivre et repartir de zéro",
    image: "/images/livre/guide-reconstruction.jpg",
    texte: [
      "Le livre complet pour savoir quoi faire quand tout s'arrête : coupure de courant, inondation, eau coupée, alerte, évacuation.",
      "Eau, nourriture, abri, premiers secours, énergie, outils : des gestes clairs, pensés pour être vraiment utilisés, pas seulement lus.",
    ],
    formats: [
      { label: "Kindle", prix: "9,99 €", url: "https://www.amazon.fr/dp/B0HNTSNJW1" },
      { label: "Broché", prix: "23,60 €", url: "https://www.amazon.fr/dp/B0HSWQH7CM" },
      { label: "Relié", prix: "33,08 €", url: "https://www.amazon.fr/dp/B0HSVWPYCR" },
    ],
  },
  {
    titre: "Le Mémo de la Reconstruction",
    sousTitre: "L'essentiel pour les 72 premières heures",
    image: "/images/livre/memo-reconstruction.jpg",
    texte: [
      "La version poche, à garder dans un sac d'évacuation, une boîte à gants ou un tiroir de cuisine.",
      "Les 72 premières heures d'une crise sont décisives : ce mémo rassemble l'essentiel, à lire en quelques minutes.",
    ],
    formats: [{ label: "Broché", prix: "10,33 €", url: "https://www.amazon.fr/dp/B0HSVYCW2M" }],
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": LIVRES.map((l) => ({
    "@type": "Book",
    name: l.titre,
    alternativeHeadline: l.sousTitre,
    inLanguage: "fr",
    image: `${SITE_URL}${l.image}`,
    author: { "@type": "Person", name: "Chaouki", url: AUTEUR_URL },
    publisher: { "@type": "Organization", name: "Éditions Serviotek" },
    offers: l.formats.map((f) => ({
      "@type": "Offer",
      price: f.prix.replace(/[^\d,]/g, "").replace(",", "."),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: f.url,
      seller: { "@type": "Organization", name: "Amazon" },
    })),
  })),
};

export default function LivresPage() {
  return (
    <div className="min-h-screen bg-fond px-[clamp(12px,2.5vw,22px)] py-3.5">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto flex max-w-[1400px] flex-col gap-3.5">
        <div className="rounded bg-white p-[clamp(24px,4vw,48px)]">
          <p className="mb-3 font-mono text-[11.5px] tracking-[0.1em] text-violet">
            ÉDITIONS SERVIOTEK
          </p>
          <h1
            className="mb-4 font-bold leading-[1.05] tracking-[-0.03em]"
            style={{ fontSize: "clamp(28px, 4vw, 42px)" }}
          >
            Livres de survie et de préparation
          </h1>
          <p className="max-w-[70ch] text-base leading-[1.6] text-grisTexte">
            Chaque famille devrait savoir quoi faire quand tout s&apos;arrête. Nos livres sont
            vendus et expédiés par Amazon. Une idée de cadeau utile pour Noël.
          </p>
        </div>

        {LIVRES.map((l) => (
          <section
            key={l.titre}
            className="flex flex-wrap items-center gap-[clamp(16px,3vw,32px)] rounded bg-encre p-[clamp(16px,3vw,28px)] text-creme"
          >
            <a
              href={l.formats[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block aspect-[2/3] w-[clamp(120px,20vw,200px)] shrink-0 overflow-hidden rounded-[3px]"
            >
              <Image
                src={l.image}
                alt={`Couverture du livre ${l.titre}`}
                fill
                sizes="200px"
                className="object-cover"
              />
            </a>
            <div className="flex min-w-[240px] flex-1 flex-col gap-3">
              <h2
                className="text-balance font-bold leading-[1.05] tracking-[-0.035em]"
                style={{ fontSize: "clamp(24px, 3vw, 34px)" }}
              >
                {l.titre}
              </h2>
              <p className="font-mono text-[12px] tracking-[0.06em] text-clairMuted">
                {l.sousTitre.toUpperCase()}
              </p>
              {l.texte.map((t) => (
                <p key={t} className="max-w-[60ch] text-[14.5px] leading-normal text-clairMuted">
                  {t}
                </p>
              ))}
              <div className="flex flex-wrap gap-2.5">
                {l.formats.map((f) => (
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
            </div>
          </section>
        ))}

        <p className="px-1 font-mono text-[11px] text-grisTexte">
          Vendus et expédiés par Amazon ·{" "}
          <a href={AUTEUR_URL} target="_blank" rel="noopener noreferrer" className="underline">
            Page auteur
          </a>
        </p>
      </div>
    </div>
  );
}
