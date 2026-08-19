"use client";

import { useState } from "react";

/** Dépôt d'un avis après achat. La note se choisit en cliquant une étoile. */
export default function FormulaireAvis({
  sessionId,
  produits,
}: {
  sessionId: string;
  produits: { slug: string; nom: string }[];
}) {
  const [slug, setSlug] = useState(produits[0]?.slug ?? "");
  const [note, setNote] = useState(0);
  const [survol, setSurvol] = useState(0);
  const [auteur, setAuteur] = useState("");
  const [commentaire, setCommentaire] = useState("");
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [envoye, setEnvoye] = useState(false);

  async function soumettre(e: React.FormEvent) {
    e.preventDefault();
    setErreur(null);

    if (note < 1) return setErreur("Choisis une note en cliquant sur les étoiles.");
    if (auteur.trim().length < 2) return setErreur("Indique ton prénom.");

    setEnvoi(true);
    try {
      const res = await fetch("/api/avis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, slug, note, auteur, commentaire }),
      });
      const data = await res.json();
      if (res.ok) setEnvoye(true);
      else setErreur(data.error ?? "L'avis n'a pas pu être envoyé.");
    } catch {
      setErreur("Connexion impossible. Réessaie dans un instant.");
    } finally {
      setEnvoi(false);
    }
  }

  if (envoye) {
    return (
      <div className="mb-10 rounded-xl border border-wire bg-panel px-6 py-6 text-center">
        <p className="font-display text-lg font-bold text-graphite">Merci pour ton avis !</p>
        <p className="mt-2 text-sm font-medium text-graphite">
          Il apparaît dès maintenant sur la fiche du produit.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={soumettre} className="mb-10 rounded-xl border border-wire bg-panel px-6 py-6">
      <p className="mb-1 font-display font-bold text-graphite">Ton avis compte</p>
      <p className="mb-5 text-sm font-medium text-graphite">
        Serviotek est une jeune boutique. Ton retour aide les prochains clients à
        se décider — trente secondes suffisent.
      </p>

      {produits.length > 1 && (
        <select
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="mb-4 w-full rounded-lg border border-wire bg-panel px-3 py-2 text-sm font-bold text-graphite"
        >
          {produits.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.nom}
            </option>
          ))}
        </select>
      )}

      <div className="mb-4 flex items-center gap-1" onMouseLeave={() => setSurvol(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setNote(n)}
            onMouseEnter={() => setSurvol(n)}
            aria-label={`${n} étoile${n > 1 ? "s" : ""}`}
            className={`text-3xl leading-none transition ${
              n <= (survol || note) ? "text-amber-500" : "text-wire"
            }`}
          >
            ★
          </button>
        ))}
      </div>

      <input
        value={auteur}
        onChange={(e) => setAuteur(e.target.value)}
        placeholder="Ton prénom"
        maxLength={40}
        className="mb-3 w-full rounded-lg border border-wire bg-panel px-3 py-2 text-sm font-medium text-graphite"
      />
      <textarea
        value={commentaire}
        onChange={(e) => setCommentaire(e.target.value)}
        placeholder="Ce que tu en penses (facultatif)"
        rows={3}
        maxLength={1000}
        className="mb-4 w-full rounded-lg border border-wire bg-panel px-3 py-2 text-sm font-medium text-graphite"
      />

      {erreur && <p className="mb-3 text-sm font-bold text-red-600">{erreur}</p>}

      <button
        type="submit"
        disabled={envoi}
        className="w-full rounded-full bg-volt px-5 py-3 font-bold text-graphite transition hover:opacity-90 disabled:opacity-50"
      >
        {envoi ? "Envoi…" : "Publier mon avis"}
      </button>
    </form>
  );
}
