import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

const URL_BASE =
  process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? process.env.NEON_DATABASE_URL;

export const compteDisponible = Boolean(URL_BASE);

const sql = URL_BASE ? neon(URL_BASE) : null;

let tablesPretes: Promise<void> | null = null;

function preparerTables(): Promise<void> {
  if (!sql) return Promise.resolve();
  if (!tablesPretes) {
    tablesPretes = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS comptes (
          id SERIAL PRIMARY KEY,
          email TEXT NOT NULL UNIQUE,
          mot_de_passe_hash TEXT NOT NULL,
          cree_le TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS commandes (
          id SERIAL PRIMARY KEY,
          session_stripe TEXT NOT NULL UNIQUE,
          email TEXT NOT NULL,
          total_centimes INTEGER NOT NULL,
          devise TEXT NOT NULL,
          produits JSONB NOT NULL,
          lien_facture TEXT,
          creee_le TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS commandes_email_idx ON commandes (lower(email))`;
    })();
  }
  return tablesPretes;
}

export type Compte = { id: number; email: string };

export async function creerCompte(
  email: string,
  motDePasse: string
): Promise<{ ok: true; compte: Compte } | { ok: false; raison: string }> {
  if (!sql) return { ok: false, raison: "Comptes indisponibles pour le moment." };
  await preparerTables();

  const emailNormalise = email.trim().toLowerCase();
  const existant = await sql`SELECT id FROM comptes WHERE email = ${emailNormalise}`;
  if (existant.length > 0) {
    return { ok: false, raison: "Un compte existe déjà avec cet e-mail." };
  }

  const hash = await bcrypt.hash(motDePasse, 12);
  const [ligne] = await sql`
    INSERT INTO comptes (email, mot_de_passe_hash)
    VALUES (${emailNormalise}, ${hash})
    RETURNING id, email
  `;
  return { ok: true, compte: { id: ligne.id, email: ligne.email } };
}

export async function verifierIdentifiants(
  email: string,
  motDePasse: string
): Promise<Compte | null> {
  if (!sql) return null;
  await preparerTables();

  const emailNormalise = email.trim().toLowerCase();
  const [ligne] = await sql`
    SELECT id, email, mot_de_passe_hash FROM comptes WHERE email = ${emailNormalise}
  `;
  if (!ligne) return null;

  const valide = await bcrypt.compare(motDePasse, ligne.mot_de_passe_hash);
  return valide ? { id: ligne.id, email: ligne.email } : null;
}

export type CommandeResumee = {
  id: number;
  totalCentimes: number;
  devise: string;
  produits: { nom: string; quantite: number }[];
  lienFacture: string | null;
  creeeLe: string;
};

export async function commandesDuCompte(email: string): Promise<CommandeResumee[]> {
  if (!sql) return [];
  await preparerTables();

  const lignes = await sql`
    SELECT id, total_centimes, devise, produits, lien_facture, creee_le
    FROM commandes
    WHERE lower(email) = ${email.trim().toLowerCase()}
    ORDER BY creee_le DESC
    LIMIT 50
  `;

  return lignes.map((l) => ({
    id: l.id,
    totalCentimes: l.total_centimes,
    devise: l.devise,
    produits: l.produits,
    lienFacture: l.lien_facture,
    creeeLe: l.creee_le,
  }));
}

export async function enregistrerCommande(entree: {
  sessionStripe: string;
  email: string;
  totalCentimes: number;
  devise: string;
  produits: { nom: string; quantite: number }[];
  lienFacture: string | null;
}): Promise<void> {
  if (!sql) return;
  await preparerTables();

  await sql`
    INSERT INTO commandes (session_stripe, email, total_centimes, devise, produits, lien_facture)
    VALUES (
      ${entree.sessionStripe},
      ${entree.email},
      ${entree.totalCentimes},
      ${entree.devise},
      ${JSON.stringify(entree.produits)},
      ${entree.lienFacture}
    )
    ON CONFLICT (session_stripe) DO NOTHING
  `;
}
