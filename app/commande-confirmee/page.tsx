import Link from "next/link";
import type { Metadata } from "next";
import Stripe from "stripe";
import ViderPanier from "@/components/ViderPanier";
import FormulaireAvis from "@/components/FormulaireAvis";
import { avisDisponibles } from "@/lib/avis-db";
import { getProduct } from "@/lib/products";

export const metadata: Metadata = {
  title: "Commande confirmée",
  robots: { index: false },
};

type Recap = {
  lignes: { nom: string; quantite: number; montant: string }[];
  total: string;
  email: string | null;
  lienFacture: string | null;
  produits: { slug: string; nom: string }[];
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
      produits: (session.metadata?.slugs ?? "")
        .split(",")
        .filter(Boolean)
        .map((slug) => ({ slug, nom: getProduct(slug)?.name ?? slug })),
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
    <div className="min-h-screen bg-fond px-5 py-20">
      <div className="mx-auto max-w-xl">
        <ViderPanier />

        <p className="mb-3 text-center font-mono text-[11.5px] tracking-[0.1em] text-violet">
          PAIEMENT CONFIRMÉ
        </p>
        <h1 className="mb-4 text-center text-3xl font-bold tracking-[-0.03em]">
          Merci pour votre commande !
        </h1>
        <p className="mb-8 text-center text-[14.5px] text-grisTexte">
          {commande?.email
            ? `Un e-mail de confirmation part vers ${commande.email}. `
            : "Vous allez recevoir un e-mail de confirmation. "}
          La livraison intervient sous 5 jours ouvrés maximum, et le numéro de suivi
          vous sera envoyé dès l&apos;expédition.
        </p>

        {commande && commande.lignes.length > 0 && (
          <div className="mb-6 rounded bg-white p-5">
            <p className="mb-4 font-mono text-[11px] tracking-[0.1em] text-grisLabel">
              VOTRE COMMANDE
            </p>
            <dl className="divide-y divide-bordureSep">
              {commande.lignes.map((l) => (
                <div key={l.nom} className="flex justify-between gap-4 py-3 text-[14.5px]">
                  <dt className="text-encre">
                    {l.nom}
                    {l.quantite > 1 && ` × ${l.quantite}`}
                  </dt>
                  <dd className="shrink-0 font-mono font-bold text-encre">{l.montant}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-3 flex justify-between border-t border-bordureSep pt-3">
              <span className="font-bold text-encre">Total</span>
              <span className="font-mono font-bold text-encre">{commande.total}</span>
            </div>
          </div>
        )}

        {commande?.lienFacture && (
          <a
            href={commande.lienFacture}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-8 block rounded-[3px] bg-vert px-5 py-3 text-center font-bold text-vertTexteSombre transition hover:bg-encre hover:text-creme"
          >
            Voir et télécharger ma facture
          </a>
        )}

        {avisDisponibles && commande && commande.produits.length > 0 && searchParams.session_id && (
          <FormulaireAvis
            sessionId={searchParams.session_id}
            produits={commande.produits}
          />
        )}

        <p className="text-center">
          <Link href="/#catalogue" className="font-bold text-violet underline hover:opacity-70">
            Continuer mes achats
          </Link>
        </p>
      </div>
    </div>
  );
}
