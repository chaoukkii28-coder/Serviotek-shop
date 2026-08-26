import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getProduct } from "@/lib/products";
import { avisDisponibles, enregistrerAvis } from "@/lib/avis-db";

const MAX_AUTEUR = 40;
const MAX_COMMENTAIRE = 1000;
// ~2 Mo en base64 : suffisant pour une photo redimensionnée côté client,
// sans laisser un client malveillant gonfler indéfiniment la ligne en base.
const MAX_PHOTO_BASE64 = 2_800_000;

/**
 * Dépose un avis. L'achat est vérifié auprès de Stripe : seule une commande
 * réellement payée, et contenant ce produit, ouvre le droit de le noter.
 * C'est ce qui distingue un avis vérifié d'un avis de complaisance — et la
 * loi française sanctionne lourdement les faux avis.
 */
export async function POST(req: NextRequest) {
  if (!avisDisponibles) {
    return NextResponse.json(
      { error: "Les avis ne sont pas encore activés sur ce site." },
      { status: 503 }
    );
  }
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Paiement non configuré." }, { status: 500 });
  }

  const corps = await req.json().catch(() => null);
  if (!corps) {
    return NextResponse.json({ error: "Requête illisible." }, { status: 400 });
  }

  const { sessionId, slug, note, auteur, commentaire, photo } = corps as Record<
    string,
    unknown
  >;

  if (typeof sessionId !== "string" || typeof slug !== "string" || !getProduct(slug)) {
    return NextResponse.json({ error: "Commande ou produit inconnu." }, { status: 400 });
  }

  const noteNum = Number(note);
  if (!Number.isInteger(noteNum) || noteNum < 1 || noteNum > 5) {
    return NextResponse.json({ error: "La note doit aller de 1 à 5." }, { status: 400 });
  }

  const nom = typeof auteur === "string" ? auteur.trim().slice(0, MAX_AUTEUR) : "";
  if (nom.length < 2) {
    return NextResponse.json({ error: "Indique un prénom." }, { status: 400 });
  }

  const texte =
    typeof commentaire === "string" && commentaire.trim()
      ? commentaire.trim().slice(0, MAX_COMMENTAIRE)
      : null;

  let photoUrl: string | null = null;
  if (typeof photo === "string" && photo) {
    if (photo.length > MAX_PHOTO_BASE64) {
      return NextResponse.json({ error: "Photo trop lourde." }, { status: 413 });
    }
    if (!/^data:image\/(jpeg|png|webp);base64,/.test(photo)) {
      return NextResponse.json({ error: "Format de photo invalide." }, { status: 400 });
    }
    photoUrl = photo;
  }

  // Vérification de l'achat
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Cette commande n'est pas réglée." },
        { status: 403 }
      );
    }

    const achetes = (session.metadata?.slugs ?? "").split(",").filter(Boolean);
    if (!achetes.includes(slug)) {
      return NextResponse.json(
        { error: "Ce produit ne figure pas dans cette commande." },
        { status: 403 }
      );
    }
  } catch {
    return NextResponse.json({ error: "Commande introuvable." }, { status: 404 });
  }

  const resultat = await enregistrerAvis({
    slug,
    note: noteNum,
    auteur: nom,
    commentaire: texte,
    photo: photoUrl,
    sessionStripe: sessionId,
  });

  if (!resultat.ok) {
    return NextResponse.json({ error: resultat.raison }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
