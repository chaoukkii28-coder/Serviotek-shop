import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { QUANTITE_MAX, getProduct } from "@/lib/products";

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Stripe n'est pas encore configuré (STRIPE_SECRET_KEY manquant)." },
      { status: 500 }
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { items } = await req.json();

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Panier vide." }, { status: 400 });
  }

  // La quantité vient du navigateur : elle est revalidée ici, sinon un panier
  // trafiqué peut demander 10 000 unités ou une quantité nulle.
  const line_items = [];
  for (const i of items as { slug?: unknown; qty?: unknown }[]) {
    const product = typeof i?.slug === "string" ? getProduct(i.slug) : undefined;
    if (!product) {
      return NextResponse.json(
        { error: "Un produit du panier n'existe plus. Rafraîchis la page." },
        { status: 400 }
      );
    }

    const qty = Number(i?.qty);
    if (!Number.isInteger(qty) || qty < 1 || qty > QUANTITE_MAX) {
      return NextResponse.json(
        { error: `Quantité invalide pour « ${product.name} » (1 à ${QUANTITE_MAX}).` },
        { status: 400 }
      );
    }

    line_items.push({
      quantity: qty,
      price_data: {
        currency: "eur",
        unit_amount: Math.round(product.price * 100),
        product_data: { name: product.name },
      },
    });
  }

  try {
    const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL;
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: line_items as Stripe.Checkout.SessionCreateParams.LineItem[],
      success_url: `${origin}/commande-confirmee?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/panier`,
      shipping_address_collection: { allowed_countries: ["FR", "BE", "CH", "LU"] },
      // Le site n'envoie pas d'e-mail lui-même. Stripe établit la facture et
      // l'adresse au client : c'est la confirmation sur support durable
      // qu'impose l'article L221-13 du Code de la consommation.
      invoice_creation: {
        enabled: true,
        invoice_data: {
          description: "Commande Serviotek",
          // L'article L221-13 impose de confirmer la commande sur support
          // durable, en reprenant les informations de l'article L221-5 :
          // délai de livraison, droit de rétractation, garanties, contact.
          footer: [
            "Serviotek — Service, SASU au capital de 50 €",
            "Bureau 326, 59 rue de Ponthieu, 75008 Paris — RCS Paris 104 280 516",
            "contact@serviotek.com",
            "",
            "Livraison sous 5 jours ouvrés maximum.",
            "Droit de rétractation : 14 jours à compter de la réception, sans justification.",
            "Formulaire de rétractation : https://serviotek-shop.vercel.app/retractation",
            "Garantie légale de conformité de 2 ans et garantie des vices cachés.",
            "Conditions générales de vente : https://serviotek-shop.vercel.app/cgv",
          ].join("\n"),
          custom_fields: [
            { name: "Livraison", value: "5 jours ouvrés max" },
            { name: "Retractation", value: "14 jours" },
          ],
        },
      },
      // Une facture sans adresse de facturation n'est pas conforme.
      billing_address_collection: "required",
      locale: "fr",
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erreur lors de la création du paiement." },
      { status: 500 }
    );
  }
}
