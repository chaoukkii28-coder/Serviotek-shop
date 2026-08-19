import { neon } from "@neondatabase/serverless";

/**
 * Stockage des avis clients.
 *
 * La connexion vient de DATABASE_URL, posée automatiquement par l'intégration
 * Neon de Vercel (Storage › Create Database). Tant qu'elle est absente, le
 * site fonctionne normalement : aucun avis n'est affiché ni accepté, plutôt
 * que de planter.
 */
const URL_BASE =
  process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? process.env.NEON_DATABASE_URL;

export const avisDisponibles = Boolean(URL_BASE);

export type Avis = {
  id: number;
  slug: string;
  note: number;
  auteur: string;
  commentaire: string | null;
  publieLe: string;
};

export type ResumeAvis = { moyenne: number; total: number };

function connexion() {
  if (!URL_BASE) throw new Error("Base de données non configurée");
  return neon(URL_BASE);
}

let tablePrete: Promise<void> | null = null;

/** Crée la table au premier accès : aucune migration à lancer à la main. */
function preparerTable() {
  if (!tablePrete) {
    const sql = connexion();
    tablePrete = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS avis (
          id SERIAL PRIMARY KEY,
          slug TEXT NOT NULL,
          note SMALLINT NOT NULL CHECK (note BETWEEN 1 AND 5),
          auteur TEXT NOT NULL,
          commentaire TEXT,
          session_stripe TEXT NOT NULL,
          publie_le TIMESTAMPTZ NOT NULL DEFAULT now(),
          UNIQUE (slug, session_stripe)
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS avis_slug_idx ON avis (slug)`;
    })();
  }
  return tablePrete;
}

/** Avis d'un produit, du plus récent au plus ancien. */
export async function avisDuProduit(slug: string): Promise<Avis[]> {
  if (!avisDisponibles) return [];
  try {
    await preparerTable();
    const sql = connexion();
    const lignes = await sql`
      SELECT id, slug, note, auteur, commentaire, publie_le
      FROM avis WHERE slug = ${slug}
      ORDER BY publie_le DESC LIMIT 50
    `;
    return lignes.map((l) => ({
      id: Number(l.id),
      slug: String(l.slug),
      note: Number(l.note),
      auteur: String(l.auteur),
      commentaire: l.commentaire ? String(l.commentaire) : null,
      publieLe: new Date(l.publie_le as string).toISOString(),
    }));
  } catch {
    return [];
  }
}

/**
 * Moyenne et nombre d'avis. Sert aussi aux données structurées : Google exige
 * que la note déclarée corresponde à des avis réellement visibles sur la page.
 */
export async function resumeDuProduit(slug: string): Promise<ResumeAvis | null> {
  if (!avisDisponibles) return null;
  try {
    await preparerTable();
    const sql = connexion();
    const [ligne] = await sql`
      SELECT COUNT(*)::int AS total, COALESCE(AVG(note), 0)::float AS moyenne
      FROM avis WHERE slug = ${slug}
    `;
    const total = Number(ligne?.total ?? 0);
    if (total === 0) return null;
    return { total, moyenne: Math.round(Number(ligne.moyenne) * 10) / 10 };
  } catch {
    return null;
  }
}

/**
 * Enregistre un avis. La contrainte d'unicité (produit, session Stripe)
 * empêche de noter deux fois le même article avec la même commande.
 */
export async function enregistrerAvis(entree: {
  slug: string;
  note: number;
  auteur: string;
  commentaire: string | null;
  sessionStripe: string;
}): Promise<{ ok: true } | { ok: false; raison: string }> {
  if (!avisDisponibles) {
    return { ok: false, raison: "Les avis ne sont pas encore activés." };
  }
  try {
    await preparerTable();
    const sql = connexion();
    await sql`
      INSERT INTO avis (slug, note, auteur, commentaire, session_stripe)
      VALUES (${entree.slug}, ${entree.note}, ${entree.auteur},
              ${entree.commentaire}, ${entree.sessionStripe})
      ON CONFLICT (slug, session_stripe) DO NOTHING
    `;
    return { ok: true };
  } catch {
    return { ok: false, raison: "L'avis n'a pas pu être enregistré." };
  }
}
