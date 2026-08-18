import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Livraison & délais",
  description:
    "Livraison sous 5 jours ouvrés maximum en France, Belgique, Suisse et Luxembourg, avec numéro de suivi.",
};

export default function Livraison() {
  return (
    <div className="max-w-2xl mx-auto px-5 py-16">
      <h1 className="font-display font-bold text-2xl mb-6">Livraison &amp; délais</h1>
      <div className="space-y-4 text-sm text-mist leading-relaxed">
        <p>
          Nos produits sont expédiés directement par nos fournisseurs partenaires.
          Le délai de livraison est de <strong className="font-bold text-graphite">5 jours ouvrés maximum</strong>,
          selon le produit et la destination.
        </p>
        <p>
          Un e-mail de confirmation avec numéro de suivi (quand disponible) est envoyé
          après l&apos;expédition.
        </p>
        <p>Livraison actuellement disponible en France, Belgique, Suisse et Luxembourg.</p>
      </div>
    </div>
  );
}
