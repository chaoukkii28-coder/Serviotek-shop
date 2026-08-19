import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { enregistrerCommande } from "@/lib/compte-db";

/**
 * Les factures créées via invoice_creation lors du Checkout ne sont pas
 * envoyées par e-mail automatiquement par Stripe : il faut le déclencher
 * explicitement une fois la facture finalisée, d'où ce webhook. Il enregistre
 * aussi la commande en base pour l'historique du compte client.
 */
export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Webhook non configuré." }, { status: 500 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const signature = req.headers.get("stripe-signature");
  const payload = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature ?? "",
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Signature webhook Stripe invalide", err);
    return NextResponse.json({ error: "Signature invalide." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const invoiceId =
      typeof session.invoice === "string" ? session.invoice : session.invoice?.id;

    let lienFacture: string | null = null;
    if (invoiceId) {
      try {
        await stripe.invoices.sendInvoice(invoiceId);
      } catch (err) {
        // La facture peut déjà avoir été envoyée ou n'être pas encore finalisée :
        // ce n'est pas bloquant, le client garde de toute façon le lien depuis le site.
        console.error("Échec de l'envoi de la facture par e-mail", err);
      }
      try {
        const facture = await stripe.invoices.retrieve(invoiceId);
        lienFacture = facture.hosted_invoice_url ?? facture.invoice_pdf ?? null;
      } catch (err) {
        console.error("Impossible de récupérer la facture", err);
      }
    }

    const email = session.customer_details?.email;
    if (email) {
      try {
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
          limit: 100,
        });
        await enregistrerCommande({
          sessionStripe: session.id,
          email,
          totalCentimes: session.amount_total ?? 0,
          devise: session.currency ?? "eur",
          produits: lineItems.data.map((l) => ({
            nom: l.description ?? "Article",
            quantite: l.quantity ?? 1,
          })),
          lienFacture,
        });
      } catch (err) {
        console.error("Échec de l'enregistrement de la commande", err);
      }
    }
  }

  return NextResponse.json({ received: true });
}
