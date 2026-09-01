"use client";

import { useState } from "react";

/**
 * Pas de service d'envoi d'e-mails configuré côté serveur (comme pour les
 * avis ou les comptes, cette fonctionnalité dépendrait d'un service externe
 * à connecter). En attendant, le formulaire ouvre le logiciel de messagerie
 * du visiteur avec le message prérempli — ça marche sans aucune infra, mais
 * ça suppose un client mail configuré sur l'appareil.
 */
export default function FormulaireContact() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [commande, setCommande] = useState("");
  const [message, setMessage] = useState("");

  function envoyer(e: React.FormEvent) {
    e.preventDefault();
    const sujet = commande ? `Contact site — commande ${commande}` : "Contact site";
    const corps = [
      `De : ${nom} (${email})`,
      commande && `Numéro de commande : ${commande}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:service@serviotek.com?subject=${encodeURIComponent(
      sujet
    )}&body=${encodeURIComponent(corps)}`;
  }

  return (
    <form onSubmit={envoyer} className="flex flex-col gap-4">
      <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(160px,1fr))]">
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[10.5px] tracking-[0.05em] text-grisLabel">NOM</span>
          <input
            required
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="rounded-[3px] border border-bordureChamp p-3 text-[14.5px] text-encre outline-none"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[10.5px] tracking-[0.05em] text-grisLabel">E-MAIL</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-[3px] border border-bordureChamp p-3 text-[14.5px] text-encre outline-none"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="font-mono text-[10.5px] tracking-[0.05em] text-grisLabel">
          NUMÉRO DE COMMANDE (FACULTATIF)
        </span>
        <input
          value={commande}
          onChange={(e) => setCommande(e.target.value)}
          className="rounded-[3px] border border-bordureChamp p-3 text-[14.5px] text-encre outline-none"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="font-mono text-[10.5px] tracking-[0.05em] text-grisLabel">MESSAGE</span>
        <textarea
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="resize-y rounded-[3px] border border-bordureChamp p-3 text-[14.5px] text-encre outline-none"
        />
      </label>

      <button
        type="submit"
        className="h-[46px] w-fit rounded-[3px] bg-vert px-[26px] font-bold text-vertTexteSombre hover:bg-encre hover:text-creme"
      >
        Envoyer le message
      </button>
      <p className="text-[12.5px] text-grisDiscret">
        Ouvre votre logiciel de messagerie avec le message prérempli, à destination de
        service@serviotek.com.
      </p>
    </form>
  );
}
