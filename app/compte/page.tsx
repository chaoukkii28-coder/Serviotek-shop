import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { utilisateurConnecte } from "@/lib/session";
import { commandesDuCompte } from "@/lib/compte-db";
import DeconnexionBouton from "@/components/DeconnexionBouton";

export const metadata: Metadata = { title: "Mon compte", robots: { index: false } };

export default async function ComptePage() {
  const session = utilisateurConnecte();
  if (!session) redirect("/compte/connexion");

  const commandes = await commandesDuCompte(session.email);

  return (
    <div className="mx-auto max-w-xl px-5 py-16">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Mon compte</h1>
          <p className="mt-1 text-sm font-medium text-graphite">{session.email}</p>
        </div>
        <DeconnexionBouton />
      </div>

      <p className="mb-4 text-sm font-bold uppercase tracking-wider text-graphite">
        Mes commandes
      </p>

      {commandes.length === 0 ? (
        <p className="rounded-xl border border-wire bg-panel px-5 py-6 text-sm font-medium text-graphite">
          Aucune commande passée avec cet e-mail pour l'instant.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {commandes.map((c) => (
            <div key={c.id} className="rounded-xl border border-wire bg-panel px-5 py-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-bold text-graphite">
                  {new Date(c.creeeLe).toLocaleDateString("fr-FR")}
                </span>
                <span className="font-bold text-graphite">
                  {new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: c.devise.toUpperCase(),
                  }).format(c.totalCentimes / 100)}
                </span>
              </div>
              <ul className="mt-2 text-sm font-medium text-graphite">
                {c.produits.map((p, i) => (
                  <li key={i}>
                    {p.nom}
                    {p.quantite > 1 && ` × ${p.quantite}`}
                  </li>
                ))}
              </ul>
              {c.lienFacture && (
                <a
                  href={c.lienFacture}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-bold underline hover:opacity-70"
                >
                  Voir la facture
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
