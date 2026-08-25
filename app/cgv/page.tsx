import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description:
    "Identité du vendeur, prix, livraison, droit de rétractation de 14 jours et garantie légale de conformité de 2 ans.",
};

export default function CGV() {
  return (
    <div className="min-h-screen bg-fond px-[clamp(12px,2.5vw,22px)] py-16">
      <div className="mx-auto max-w-2xl rounded bg-white p-[clamp(24px,4vw,40px)]">
      <h1 className="mb-6 text-2xl font-bold tracking-[-0.03em]">Conditions générales de vente</h1>
      <div className="space-y-5 text-[14.5px] leading-[1.6] text-grisTexte">
        <section>
          <h2 className="font-bold text-encre mb-1">1. Identité du vendeur</h2>
          <p>Service, SASU au capital de 50 €, RCS Paris 104 280 516, siège social : Bureau 326, 59 rue de Ponthieu, 75008 Paris. Contact : contact@serviotek.com</p>
        </section>
        <section>
          <h2 className="font-bold text-encre mb-1">2. Produits et origine</h2>
          <p>
            Les produits vendus sur ce site peuvent être expédiés directement depuis nos
            fournisseurs, y compris depuis l&apos;étranger. Les délais de livraison indiqués
            sur chaque fiche produit sont des estimations.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-encre mb-1">3. Prix et paiement</h2>
          <p>Les prix sont indiqués en euros, toutes taxes comprises. Le paiement est sécurisé via Stripe.</p>
        </section>
        <section>
          <h2 className="font-bold text-encre mb-1">4. Livraison</h2>
          <p>Délai de livraison : 5 jours ouvrés maximum selon le produit et le fournisseur. En cas de retard important, le client peut contacter le service client pour connaître l&apos;état de sa commande.</p>
        </section>
        <section>
          <h2 className="font-bold text-encre mb-1">5. Droit de rétractation</h2>
          <p>
            Conformément aux articles L221-18 et suivants du Code de la consommation, le client dispose
            d&apos;un délai de 14 jours à compter de la réception du produit pour exercer son droit de
            rétractation, sans avoir à justifier de motif ni à payer de pénalité.
          </p>
          <p className="mt-2">
            Pour exercer ce droit, le client doit notifier sa décision par email à contact@serviotek.com
            avant l&apos;expiration du délai de 14 jours, en précisant le numéro de commande. Le produit
            doit ensuite être retourné dans un délai de 14 jours suivant cette notification, dans son
            état d&apos;origine.
          </p>
          <p className="mt-2">
            Les frais de retour sont à la charge du client, sauf si le produit est défectueux ou
            non conforme, auquel cas les frais sont pris en charge par Service.
          </p>
          <p className="mt-2">
            Le remboursement intervient dans un délai maximal de 14 jours à compter de la réception
            du produit retourné, via le même moyen de paiement que celui utilisé lors de l&apos;achat.
          </p>
          <p className="mt-2">
            Un{" "}
            <a href="/retractation" className="underline hover:opacity-70">
              formulaire type de rétractation
            </a>{" "}
            est mis à disposition. Son usage n&apos;est pas obligatoire : toute déclaration dénuée
            d&apos;ambiguïté exprimant la volonté de se rétracter est recevable.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-encre mb-1">6. Garantie légale de conformité</h2>
          <p>
            Conformément aux articles L217-3 et suivants du Code de la consommation, tout produit
            bénéficie de la garantie légale de conformité pendant 2 ans à compter de la délivrance
            du bien, ainsi que de la garantie légale des vices cachés (articles 1641 et suivants du
            Code civil) pendant 2 ans à compter de la découverte du défaut.
          </p>
          <p className="mt-2">
            En cas de non-conformité, le client peut demander la réparation ou le remplacement du
            produit sans frais. Pour toute demande, contacter contact@serviotek.com.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-encre mb-1">7. Service client</h2>
          <p>Pour toute question, contacter contact@serviotek.com. Nous nous engageons à répondre sous 48h ouvrées.</p>
        </section>
        <section>
          <h2 className="font-bold text-encre mb-1">8. Droit applicable et litiges</h2>
          <p>
            Les présentes CGV sont soumises au droit français. Conformément à l&apos;article L616-1
            du Code de la consommation, en cas de litige, le client peut recourir gratuitement, après
            réclamation écrite préalable restée infructueuse, au médiateur de la consommation suivant :
            CM2C — Centre de la Médiation de la Consommation de Conciliateurs de Justice, 49 rue de
            Ponthieu, 75008 Paris, www.cm2c.net. À défaut de résolution amiable, les tribunaux
            français seront seuls compétents.
          </p>
        </section>
      </div>
      </div>
    </div>
  );
}
