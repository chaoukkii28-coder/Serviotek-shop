import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

/**
 * Les factures créées via invoice_creation lors du Checkout ne sont pas
 * envoyées par e-mail automatiquement par Stripe : il faut le déclencher
 * explicitement une fois la facture finalisée, d'où ce webhook.
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

    if (invoiceId) {
      try {
        await stripe.invoices.sendInvoice(invoiceId);
      } catch (err) {
        // La facture peut déjà avoir été envoyée ou n'être pas encore finalisée :
        // ce n'est pas bloquant, le client garde de toute façon le lien depuis le site.
        console.error("Échec de l'envoi de la facture par e-mail", err);
      }
    }
  }

  return NextResponse.json({ received: true });
}
