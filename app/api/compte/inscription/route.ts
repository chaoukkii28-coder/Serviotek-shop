import { NextRequest, NextResponse } from "next/server";
import { compteDisponible, creerCompte } from "@/lib/compte-db";
import { definirCookieSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  if (!compteDisponible || !process.env.SESSION_SECRET) {
    return NextResponse.json(
      { error: "Les comptes clients ne sont pas encore disponibles." },
      { status: 503 }
    );
  }

  const { email, motDePasse } = await req.json();

  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "E-mail invalide." }, { status: 400 });
  }
  if (typeof motDePasse !== "string" || motDePasse.length < 8) {
    return NextResponse.json(
      { error: "Le mot de passe doit faire au moins 8 caractères." },
      { status: 400 }
    );
  }

  const resultat = await creerCompte(email, motDePasse);
  if (!resultat.ok) {
    return NextResponse.json({ error: resultat.raison }, { status: 409 });
  }

  definirCookieSession({ id: resultat.compte.id, email: resultat.compte.email });
  return NextResponse.json({ ok: true });
}
