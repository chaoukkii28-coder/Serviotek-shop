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
    <div className="min-h-screen bg-fond px-[clamp(12px,2.5vw,22px)] py-16">
      <div className="mx-auto max-w-2xl rounded bg-white p-[clamp(24px,4vw,40px)]">
        <h1 className="mb-6 text-2xl font-bold tracking-[-0.03em]">
          Formulaire de rétractation
        </h1>

        <div className="space-y-4 text-[14.5px] leading-[1.6] text-grisTexte">
          <p>
            Vous disposez de 14 jours à compter de la réception de votre commande pour
            vous rétracter, sans avoir à vous justifier. Complétez le formulaire
            ci-dessous et envoyez-le à{" "}
            <a href="mailto:service@serviotek.com" className="text-violet underline hover:opacity-70">
              service@serviotek.com
            </a>
            . L&apos;usage de ce formulaire n&apos;est pas obligatoire : toute
            déclaration dénuée d&apos;ambiguïté suffit.
          </p>

          <div className="space-y-3 rounded border border-bordureSep bg-fond p-5">
            <p className="font-bold text-encre">
              À l&apos;attention de Service, SASU — Bureau 326, 59 rue de Ponthieu,
              75008 Paris — service@serviotek.com
            </p>

            <p>
              Je vous notifie par la présente ma rétractation du contrat portant sur la
              vente du bien ci-dessous :
            </p>

            <ul className="list-none space-y-2">
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
            <a href="/cgv" className="text-violet underline hover:opacity-70">
              conditions générales de vente
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
