export default function CGV() {
  return (
    <div className="max-w-2xl mx-auto px-5 py-16">
      <h1 className="font-display font-bold text-2xl mb-6">Conditions générales de vente</h1>
      <div className="space-y-5 text-sm text-mist leading-relaxed">
        <section>
          <h2 className="text-white font-medium mb-1">1. Identité du vendeur</h2>
          <p>Service, SASU au capital de 50 €, RCS Paris 104 280 516, siège social : Bureau 326, 59 rue de Ponthieu, 75008 Paris.</p>
        </section>
        <section>
          <h2 className="text-white font-medium mb-1">2. Produits et origine</h2>
          <p>
            Les produits vendus sur ce site peuvent être expédiés directement depuis nos
            fournisseurs, y compris depuis l&apos;étranger. Les délais de livraison indiqués
            sur chaque fiche produit sont des estimations.
          </p>
        </section>
        <section>
          <h2 className="text-white font-medium mb-1">3. Prix et paiement</h2>
          <p>Les prix sont indiqués en euros, toutes taxes comprises. Le paiement est sécurisé via Stripe.</p>
        </section>
        <section>
          <h2 className="text-white font-medium mb-1">4. Livraison</h2>
          <p>Délai estimé : 7 à 14 jours ouvrés selon le produit et le fournisseur.</p>
        </section>
        <section>
          <h2 className="text-white font-medium mb-1">5. Droit de rétractation</h2>
          <p>
            Conformément au Code de la consommation, tu disposes d&apos;un délai de 14 jours
            pour exercer ton droit de rétractation à compter de la réception du produit.
          </p>
        </section>
        <section>
          <h2 className="text-white font-medium mb-1">6. Service client</h2>
          <p>contact@serviotek.com</p>
        </section>
      </div>
      <p className="text-xs text-mist/60 mt-8">
        [À faire relire par un professionnel du droit avant mise en ligne définitive]
      </p>
    </div>
  );
}
