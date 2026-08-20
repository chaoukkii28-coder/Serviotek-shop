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
    <div className="min-h-screen bg-fond px-5 py-16">
      <div className="mx-auto max-w-xl">
        <div className="mb-6 flex items-center justify-between gap-4 rounded bg-white p-5">
          <div>
            <h1 className="text-2xl font-bold tracking-[-0.03em]">Mon compte</h1>
            <p className="mt-1 text-[14.5px] text-grisTexte">{session.email}</p>
          </div>
          <DeconnexionBouton />
        </div>

        <p className="mb-3 font-mono text-[11px] tracking-[0.1em] text-grisLabel">
          MES COMMANDES
        </p>

        {commandes.length === 0 ? (
          <p className="rounded bg-white px-5 py-6 text-[14.5px] text-grisTexte">
            Aucune commande passée avec cet e-mail pour l&apos;instant.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {commandes.map((c) => (
              <div key={c.id} className="rounded bg-white px-5 py-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[14.5px] text-grisTexte">
                    {new Date(c.creeeLe).toLocaleDateString("fr-FR")}
                  </span>
                  <span className="font-mono font-bold text-encre">
                    {new Intl.NumberFormat("fr-FR", {
                      style: "currency",
                      currency: c.devise.toUpperCase(),
                    }).format(c.totalCentimes / 100)}
                  </span>
                </div>
                <ul className="mt-2 text-[14.5px] text-encre">
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
                    className="mt-3 inline-block font-mono text-[12.5px] text-violet hover:opacity-70"
                  >
                    Voir la facture
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
