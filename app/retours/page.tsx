import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Retours & échanges",
  description:
    "14 jours après réception pour demander un retour ou un échange, formulaire de rétractation à disposition.",
};

export default function Retours() {
  return (
    <div className="min-h-screen bg-fond px-[clamp(12px,2.5vw,22px)] py-16">
      <div className="mx-auto max-w-2xl rounded bg-white p-[clamp(24px,4vw,40px)]">
        <h1 className="mb-6 text-2xl font-bold tracking-[-0.03em]">Retours</h1>
        <div className="space-y-4 text-[14.5px] leading-[1.6] text-grisTexte">
          <p>
            Tu disposes de 14 jours après réception pour nous signaler un souhait de
            retour ou d&apos;échange, conformément à la loi.
          </p>
          <p>
            Contacte-nous à service@serviotek.com avec ton numéro de commande, on te
            guide pour la suite (le produit étant expédié par un fournisseur tiers, les
            modalités précises peuvent varier).
          </p>
          <p>
            Tu peux aussi utiliser directement notre{" "}
            <a href="/retractation" className="text-violet underline hover:opacity-70">
              formulaire de rétractation
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
