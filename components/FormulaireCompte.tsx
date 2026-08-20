"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/** Formulaire partagé pour l'inscription et la connexion. */
export default function FormulaireCompte({ mode }: { mode: "inscription" | "connexion" }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  async function soumettre(e: React.FormEvent) {
    e.preventDefault();
    setErreur(null);
    setEnvoi(true);

    try {
      const res = await fetch(`/api/compte/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, motDePasse }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/compte");
        router.refresh();
      } else {
        setErreur(data.error ?? "Une erreur est survenue.");
      }
    } catch {
      setErreur("Connexion impossible. Réessayez dans un instant.");
    } finally {
      setEnvoi(false);
    }
  }

  return (
    <form onSubmit={soumettre} className="rounded bg-white px-6 py-6">
      <label className="mb-1.5 block font-mono text-[10.5px] tracking-[0.05em] text-grisLabel">
        E-MAIL
      </label>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4 w-full rounded-[3px] border border-bordureChamp p-3 text-[14.5px] text-encre outline-none"
      />

      <label className="mb-1.5 block font-mono text-[10.5px] tracking-[0.05em] text-grisLabel">
        MOT DE PASSE
      </label>
      <input
        type="password"
        required
        minLength={mode === "inscription" ? 8 : undefined}
        value={motDePasse}
        onChange={(e) => setMotDePasse(e.target.value)}
        className="mb-4 w-full rounded-[3px] border border-bordureChamp p-3 text-[14.5px] text-encre outline-none"
      />
      {mode === "inscription" && (
        <p className="mb-4 -mt-2 text-[12.5px] text-grisDiscret">8 caractères minimum.</p>
      )}

      {erreur && <p className="mb-3 text-sm font-bold text-red-600">{erreur}</p>}

      <button
        type="submit"
        disabled={envoi}
        className="w-full rounded-[3px] bg-vert py-3 font-bold text-vertTexteSombre transition hover:bg-encre hover:text-creme disabled:opacity-50"
      >
        {envoi ? "…" : mode === "inscription" ? "Créer mon compte" : "Se connecter"}
      </button>
    </form>
  );
}
