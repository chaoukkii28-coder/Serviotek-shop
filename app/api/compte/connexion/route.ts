import { NextRequest, NextResponse } from "next/server";
import { compteDisponible, verifierIdentifiants } from "@/lib/compte-db";
import { definirCookieSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  if (!compteDisponible || !process.env.SESSION_SECRET) {
    return NextResponse.json(
      { error: "Les comptes clients ne sont pas encore disponibles." },
      { status: 503 }
    );
  }

  const { email, motDePasse } = await req.json();
  if (typeof email !== "string" || typeof motDePasse !== "string") {
    return NextResponse.json({ error: "Identifiants invalides." }, { status: 400 });
  }

  const compte = await verifierIdentifiants(email, motDePasse);
  if (!compte) {
    return NextResponse.json({ error: "E-mail ou mot de passe incorrect." }, { status: 401 });
  }

  definirCookieSession({ id: compte.id, email: compte.email });
  return NextResponse.json({ ok: true });
}
