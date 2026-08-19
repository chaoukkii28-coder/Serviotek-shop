import Link from "next/link";
import type { Metadata } from "next";
import Stripe from "stripe";
import ViderPanier from "@/components/ViderPanier";
import { LIEN_AVIS, NOM_SERVICE_AVIS, avisActif } from "@/lib/avis";

export const metadata: Metadata = {
  title: "Commande confirmée",
  robots: { index: false },
};

type Recap = {
  lignes: { nom: string; quantite: number; montant: string }[];
  total: string;
  email: string | null;
  lienFacture: string | null;
};

/**
 * Récupère le détail de la commande auprès de Stripe. Le client dispose ainsi
 * de sa facture depuis cette page, sans dépendre du réglage d'envoi d'e-mails
 * du compte Stripe. La facture étant créée de façon asynchrone, on retombe sur
 * le reçu de paiement, lui disponible immédiatement.
 */
async function lireCommande(sessionId: string): Promise<Recap | null> {
  if (!process.env.STRIPE_SECRET_KEY) return null;

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "invoice", "payment_intent.latest_charge"],
    });

    const devise = (session.currency ?? "eur").toUpperCase();
    const format = (centimes: number | null | undefined) =>
      new Intl.NumberFormat("fr-FR", { style: "currency", currency: devise }).format(
        (centimes ?? 0) / 100
      );

    const facture = session.invoice as Stripe.Invoice | null;
    const paiement = session.payment_intent as Stripe.PaymentIntent | null;
    const charge = paiement?.latest_charge as Stripe.Charge | null;

    return {
      lignes: (session.line_items?.data ?? []).map((l) => ({
        nom: l.description ?? "Article",
        quantite: l.quantity ?? 1,
        montant: format(l.amount_total),
      })),
      total: format(session.amount_total),
      email: session.customer_details?.email ?? null,
      lienFacture:
        facture?.hosted_invoice_url ?? facture?.invoice_pdf ?? charge?.receipt_url ?? null,
    };
  } catch {
    // Session inconnue ou expirée : la page reste utilisable sans le détail.
    return null;
  }
}

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const commande = searchParams.session_id
    ? await lireCommande(searchParams.session_id)
    : null;

  return (
    <div className="mx-auto max-w-xl px-5 py-20">
      <ViderPanier />

      <p className="mb-3 text-center font-mono text-sm font-bold text-volt">
        // paiement confirmé
      </p>
      <h1 className="mb-4 text-center font-display text-3xl font-bold">
        Merci pour ta commande !
      </h1>
      <p className="mb-10 text-center font-medium text-graphite">
        {commande?.email
          ? `Un e-mail de confirmation part vers ${commande.email}. `
          : "Tu vas recevoir un e-mail de confirmation. "}
        La livraison intervient sous 5 jours ouvrés maximum, et le numéro de suivi
        te sera envoyé dès l&apos;expédition.
      </p>

      {commande && commande.lignes.length > 0 && (
        <div className="mb-8 rounded-xl border border-wire bg-panel px-5 py-5">
          <p className="mb-4 text-sm font-bold uppercase tracking-wider text-graphite">
            Ta commande
          </p>
          <dl className="divide-y divide-wire">
            {commande.lignes.map((l) => (
              <div key={l.nom} className="flex justify-between gap-4 py-3 text-sm">
                <dt className="font-bold text-graphite">
                  {l.nom}
                  {l.quantite > 1 && ` × ${l.quantite}`}
                </dt>
                <dd className="shrink-0 font-bold text-graphite">{l.montant}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-3 flex justify-between border-t border-wire pt-3">
            <span className="font-bold text-graphite">Total</span>
            <span className="font-bold text-graphite">{commande.total}</span>
          </div>
        </div>
      )}

      {commande?.lienFacture && (
        <a
          href={commande.lienFacture}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-10 block rounded-full bg-volt px-5 py-3 text-center font-bold text-graphite transition hover:opacity-90"
        >
          Voir et télécharger ma facture
        </a>
      )}

      {avisActif && (
        <div className="mb-10 rounded-xl border border-wire bg-panel px-6 py-6">
          <p className="mb-2 font-display font-bold">Un avis, et on te laisse tranquille</p>
          <p className="mb-5 text-sm font-medium text-graphite">
            Serviotek est une jeune boutique : chaque avis compte énormément pour
            nous, et aide les prochains clients à se décider. Trente secondes
            suffisent.
          </p>
          <a
            href={LIEN_AVIS}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border border-graphite px-5 py-2.5 text-sm font-bold text-graphite transition hover:opacity-70"
          >
            Laisser un avis sur {NOM_SERVICE_AVIS}
          </a>
        </div>
      )}

      <p className="text-center">
        <Link href="/#catalogue" className="font-bold underline hover:opacity-70">
          Continuer mes achats
        </Link>
      </p>
    </div>
  );
}
