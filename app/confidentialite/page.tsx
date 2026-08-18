import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Données collectées, finalités, durée de conservation et exercice de vos droits (RGPD).",
};

export default function Confidentialite() {
  return (
    <div className="max-w-2xl mx-auto px-5 py-16">
      <h1 className="font-display font-bold text-2xl mb-6">Politique de confidentialité</h1>
      <div className="space-y-5 text-sm text-mist leading-relaxed">
        <section>
          <h2 className="text-white font-medium mb-1">1. Responsable du traitement</h2>
          <p>
            Le responsable du traitement des données à caractère personnel collectées sur ce site est
            Service, SASU au capital de 50 €, RCS Paris 104 280 516, siège social : Bureau 326, 59 rue
            de Ponthieu, 75008 Paris. Contact : contact@serviotek.com
          </p>
        </section>
        <section>
          <h2 className="text-white font-medium mb-1">2. Données collectées</h2>
          <p>Dans le cadre de l&apos;utilisation du site et de la passation de commandes, nous collectons :</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Identité : nom, prénom, adresse email</li>
            <li>Coordonnées : adresse postale de livraison et de facturation, numéro de téléphone</li>
            <li>Données de commande : produits achetés, montant, numéro de transaction, historique de commandes</li>
            <li>Données de paiement : traitées directement par Stripe, notre prestataire de paiement. Nous ne stockons aucune donnée bancaire sur nos serveurs.</li>
            <li>Données de navigation : adresse IP, cookies techniques nécessaires au fonctionnement du site (panier, session)</li>
          </ul>
        </section>
        <section>
          <h2 className="text-white font-medium mb-1">3. Finalités du traitement</h2>
          <p>Ces données sont collectées pour :</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Traiter et livrer les commandes</li>
            <li>Gérer la relation client (service après-vente, retours, réclamations)</li>
            <li>Respecter nos obligations légales et comptables</li>
            <li>Améliorer le fonctionnement du site</li>
          </ul>
        </section>
        <section>
          <h2 className="text-white font-medium mb-1">4. Base légale</h2>
          <p>
            Le traitement de vos données repose sur l&apos;exécution du contrat de vente (article 6.1.b du RGPD)
            pour la gestion des commandes, ainsi que sur le respect d&apos;obligations légales (article 6.1.c
            du RGPD) pour la conservation des factures.
          </p>
        </section>
        <section>
          <h2 className="text-white font-medium mb-1">5. Destinataires des données</h2>
          <p>
            Vos données sont destinées à Service et à ses prestataires techniques strictement nécessaires
            au fonctionnement du site : Stripe (paiement), Vercel (hébergement), et le ou les transporteurs
            chargés de la livraison. Aucune donnée n&apos;est vendue ou cédée à des tiers à des fins commerciales.
          </p>
        </section>
        <section>
          <h2 className="text-white font-medium mb-1">6. Durée de conservation</h2>
          <p>
            Les données relatives aux commandes sont conservées pendant la durée nécessaire à la gestion
            de la relation commerciale, puis archivées pendant 10 ans conformément aux obligations
            comptables et fiscales. Les données de prospection, le cas échéant, sont conservées 3 ans
            à compter du dernier contact.
          </p>
        </section>
        <section>
          <h2 className="text-white font-medium mb-1">7. Cookies</h2>
          <p>
            Ce site utilise des cookies strictement nécessaires à son fonctionnement (panier, session
            de navigation) qui ne requièrent pas de consentement préalable. Aucun cookie de mesure
            d&apos;audience ou publicitaire n&apos;est déposé sans votre consentement explicite, recueilli via
            le bandeau prévu à cet effet.
          </p>
        </section>
        <section>
          <h2 className="text-white font-medium mb-1">8. Vos droits</h2>
          <p>Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants :</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Droit d&apos;accès à vos données personnelles</li>
            <li>Droit de rectification en cas de données inexactes</li>
            <li>Droit à l&apos;effacement (droit à l&apos;oubli)</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit à la portabilité de vos données</li>
            <li>Droit d&apos;opposition au traitement</li>
          </ul>
          <p className="mt-2">
            Pour exercer ces droits, contactez-nous à contact@serviotek.com. Nous nous engageons à
            répondre dans un délai maximal d&apos;un mois.
          </p>
        </section>
        <section>
          <h2 className="text-white font-medium mb-1">9. Réclamation</h2>
          <p>
            Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation
            auprès de la Commission Nationale de l&apos;Informatique et des Libertés (CNIL) : www.cnil.fr
          </p>
        </section>
        <section>
          <h2 className="text-white font-medium mb-1">10. Sécurité</h2>
          <p>
            Service met en œuvre des mesures techniques et organisationnelles appropriées pour protéger
            vos données contre tout accès, modification, divulgation ou destruction non autorisés,
            notamment via le chiffrement des paiements par Stripe et l&apos;hébergement sécurisé chez Vercel.
          </p>
        </section>
      </div>
    </div>
  );
}
