import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formulaire de rétractation",
  description:
    "Formulaire type de rétractation à compléter et à renvoyer pour annuler une commande dans les 14 jours suivant sa réception.",
};

/**
 * Formulaire type de rétractation. Le professionnel doit le fournir au
 * consommateur (article L221-5 du Code de la consommation, modèle fixé en
 * annexe de l'article R221-1). Son absence allonge le délai de rétractation.
 */
export default function Retractation() {
  return (
    <div className="max-w-2xl mx-auto px-5 py-16">
      <h1 className="font-display font-bold text-2xl mb-6">
        Formulaire de rétractation
      </h1>

      <div className="space-y-4 text-sm text-mist leading-relaxed">
        <p>
          Vous disposez de 14 jours à compter de la réception de votre commande pour
          vous rétracter, sans avoir à vous justifier. Complétez le formulaire
          ci-dessous et envoyez-le à{" "}
          <a href="mailto:contact@serviotek.com" className="underline hover:text-white">
            contact@serviotek.com
          </a>
          . L&apos;usage de ce formulaire n&apos;est pas obligatoire : toute
          déclaration dénuée d&apos;ambiguïté suffit.
        </p>

        <div className="border border-wire rounded-xl p-5 space-y-3 bg-panel/40">
          <p className="text-white">
            À l&apos;attention de Service, SASU — Bureau 326, 59 rue de Ponthieu,
            75008 Paris — contact@serviotek.com
          </p>

          <p>
            Je vous notifie par la présente ma rétractation du contrat portant sur la
            vente du bien ci-dessous :
          </p>

          <ul className="space-y-2 list-none">
            <li>Désignation du produit : ______________________________</li>
            <li>Numéro de commande : ______________________________</li>
            <li>Commandé le : ____ / ____ / ________</li>
            <li>Reçu le : ____ / ____ / ________</li>
            <li>Nom du consommateur : ______________________________</li>
            <li>Adresse du consommateur : ______________________________</li>
            <li>Date : ____ / ____ / ________</li>
            <li>
              Signature (uniquement en cas de notification sur papier) :
              ______________________
            </li>
          </ul>
        </div>

        <p>
          Après réception de votre notification, renvoyez le produit dans un délai de
          14 jours, dans son état d&apos;origine. Le remboursement intervient au plus
          tard 14 jours après réception du produit retourné, par le moyen de paiement
          utilisé lors de l&apos;achat. Les frais de retour restent à votre charge,
          sauf si le produit est défectueux ou non conforme.
        </p>

        <p>
          Détail des conditions dans nos{" "}
          <a href="/cgv" className="underline hover:text-white">
            conditions générales de vente
          </a>
          .
        </p>
      </div>
    </div>
  );
}
