import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getProduct } from "@/lib/products";

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

  const line_items = items
    .map((i: { slug: string; qty: number }) => {
      const product = getProduct(i.slug);
      if (!product) return null;
      return {
        quantity: i.qty,
        price_data: {
          currency: "eur",
          unit_amount: Math.round(product.price * 100),
          product_data: { name: product.name },
        },
      };
    })
    .filter(Boolean);

  if (line_items.length === 0) {
    return NextResponse.json({ error: "Produits invalides." }, { status: 400 });
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
