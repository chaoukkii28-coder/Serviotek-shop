import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const NOM_COOKIE = "serviotek_session";
const DUREE_SECONDES = 60 * 60 * 24 * 30; // 30 jours

export type SessionPayload = { id: number; email: string };

function secret(): string {
  const s = process.env.SESSION_SECRET;
  if (!s) throw new Error("SESSION_SECRET manquant.");
  return s;
}

function encoder(objet: unknown): string {
  return Buffer.from(JSON.stringify(objet)).toString("base64url");
}

function signer(donnees: string): string {
  return createHmac("sha256", secret()).update(donnees).digest("base64url");
}

export function creerJetonSession(payload: SessionPayload): string {
  const corps = encoder({ ...payload, exp: Date.now() + DUREE_SECONDES * 1000 });
  return `${corps}.${signer(corps)}`;
}

export function lireJetonSession(jeton: string | undefined): SessionPayload | null {
  if (!jeton) return null;
  const [corps, signature] = jeton.split(".");
  if (!corps || !signature) return null;

  const signatureAttendue = signer(corps);
  const a = Buffer.from(signature);
  const b = Buffer.from(signatureAttendue);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const donnees = JSON.parse(Buffer.from(corps, "base64url").toString());
    if (typeof donnees.exp !== "number" || donnees.exp < Date.now()) return null;
    return { id: donnees.id, email: donnees.email };
  } catch {
    return null;
  }
}

export function definirCookieSession(payload: SessionPayload) {
  cookies().set(NOM_COOKIE, creerJetonSession(payload), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: DUREE_SECONDES,
  });
}

export function supprimerCookieSession() {
  cookies().delete(NOM_COOKIE);
}

export function utilisateurConnecte(): SessionPayload | null {
  if (!process.env.SESSION_SECRET) return null;
  const jeton = cookies().get(NOM_COOKIE)?.value;
  return lireJetonSession(jeton);
}
