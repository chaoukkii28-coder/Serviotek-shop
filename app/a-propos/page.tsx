import type { Metadata } from "next";
import { products, getProduct } from "@/lib/products";
import { SELECTION_LANCEMENT } from "@/lib/amazon";
import Vignette from "@/components/accueil/Vignette";

export const metadata: Metadata = {
  title: "À propos",
  description: "Serviotek : treize produits choisis, testés, au juste prix.",
};

const PHOTOS_MOSAIQUE = SELECTION_LANCEMENT.slice(0, 4)
  .map((slug) => getProduct(slug))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

const PAYS_LIVRES = ["France", "Belgique", "Suisse", "Luxembourg"];

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-fond px-[clamp(12px,2.5vw,22px)] py-3.5">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-3.5">
        <div className="rounded bg-white p-[clamp(24px,4vw,48px)]">
          <div className="grid items-center gap-6 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
            <div>
              <p className="mb-3 font-mono text-[11.5px] tracking-[0.1em] text-violet">
                À PROPOS DE SERVIOTEK
              </p>
              <h1
                className="mb-4 font-bold leading-[1.05] tracking-[-0.03em]"
                style={{ fontSize: "clamp(28px, 4vw, 42px)" }}
              >
                Treize produits, pas treize mille.
              </h1>
              <div className="flex flex-col gap-3 text-base leading-[1.6] text-grisTexte">
                <p>
                  Serviotek est une jeune boutique qui vend des gadgets électriques
                  utiles au quotidien : audio, maison connectée, bricolage, détection,
                  bien-être et accessoires de charge. Chaque référence est choisie une
                  par une, pas ajoutée en masse pour remplir un catalogue.
                </p>
                <p>
                  Les prix partent du coût d&apos;achat réel auprès du fournisseur, pas
                  d&apos;un chiffre inventé pour donner l&apos;impression d&apos;une
                  bonne affaire. Livraison sous 5 jours ouvrés maximum, retour possible
                  pendant 14 jours.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {PHOTOS_MOSAIQUE.map((p) => (
                <Vignette key={p.slug} src={p.images[0]} alt={p.name} sizes="200px" />
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
          <div className="rounded bg-white p-6">
            <p className="font-mono text-[22px] font-bold text-encre">{products.length}</p>
            <p className="mt-1 text-[14.5px] leading-[1.55] text-grisTexte">Références au catalogue</p>
          </div>
          <div className="rounded bg-white p-6">
            <p className="font-mono text-[22px] font-bold text-encre">{PAYS_LIVRES.length}</p>
            <p className="mt-1 text-[14.5px] leading-[1.55] text-grisTexte">
              Pays livrés — {PAYS_LIVRES.join(", ")}
            </p>
          </div>
          <div className="rounded bg-white p-6">
            <p className="font-mono text-[22px] font-bold text-encre">14 j</p>
            <p className="mt-1 text-[14.5px] leading-[1.55] text-grisTexte">Pour se rétracter, sans justification</p>
          </div>
          <div className="rounded bg-vert p-6 text-vertTexteSombre">
            <p className="font-mono text-[22px] font-bold">♻</p>
            <p className="mt-1 text-[14.5px] leading-[1.55]">Produits réparables, emballages responsables</p>
          </div>
        </div>
      </div>
    </div>
  );
}
