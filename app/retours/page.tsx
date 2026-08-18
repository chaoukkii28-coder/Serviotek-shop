import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Retours & échanges",
  description:
    "14 jours après réception pour demander un retour ou un échange, formulaire de rétractation à disposition.",
};

export default function Retours() {
  return (
    <div className="max-w-2xl mx-auto px-5 py-16">
      <h1 className="font-display font-bold text-2xl mb-6">Retours</h1>
      <div className="space-y-4 text-sm text-mist leading-relaxed">
        <p>
          Tu disposes de 14 jours après réception pour nous signaler un souhait de
          retour ou d&apos;échange, conformément à la loi.
        </p>
        <p>
          Contacte-nous à contact@serviotek.com avec ton numéro de commande, on te
          guide pour la suite (le produit étant expédié par un fournisseur tiers, les
          modalités précises peuvent varier).
        </p>
        <p>
          Tu peux aussi utiliser directement notre{" "}
          <a href="/retractation" className="underline hover:text-white">
            formulaire de rétractation
          </a>
          .
        </p>
      </div>
    </div>
  );
}
