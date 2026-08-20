import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Livraison & délais",
  description:
    "Livraison sous 5 jours ouvrés maximum en France, Belgique, Suisse et Luxembourg, avec numéro de suivi.",
};

export default function Livraison() {
  return (
    <div className="min-h-screen bg-fond px-[clamp(12px,2.5vw,22px)] py-16">
      <div className="mx-auto max-w-2xl rounded bg-white p-[clamp(24px,4vw,40px)]">
        <h1 className="mb-6 text-2xl font-bold tracking-[-0.03em]">Livraison &amp; délais</h1>
        <div className="space-y-4 text-[14.5px] leading-[1.6] text-grisTexte">
          <p>
            Nos produits sont expédiés directement par nos fournisseurs partenaires.
            Le délai de livraison est de <strong className="font-bold text-encre">5 jours ouvrés maximum</strong>,
            selon le produit et la destination.
          </p>
          <p>
            Un e-mail de confirmation avec numéro de suivi (quand disponible) est envoyé
            après l&apos;expédition.
          </p>
          <p>Livraison actuellement disponible en France, Belgique, Suisse et Luxembourg.</p>
        </div>
      </div>
    </div>
  );
}
