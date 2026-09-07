import Link from "next/link";
import { derniersAvis } from "@/lib/avis-db";
import { getProduct } from "@/lib/products";
import Etoiles from "@/components/Etoiles";

/**
 * Met en avant, en bas de la page d'accueil, les derniers avis clients
 * laissés sur n'importe quel produit. Rien à mettre à jour à la main : dès
 * qu'un client publie un avis (après un achat vérifié), il apparaît ici.
 * La section ne s'affiche pas tant qu'aucun avis n'existe encore.
 */
export default async function AvisClients() {
  const avis = await derniersAvis(12);
  if (avis.length === 0) return null;

  return (
    <section className="rounded bg-white p-5">
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <h2 className="font-mono text-[11px] tracking-[0.1em] text-grisLabel">
          AVIS CLIENTS
        </h2>
        <span className="text-[13px] text-grisTexte">{avis.length} avis récents</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {avis.map((a) => {
          const produit = getProduct(a.slug);
          return (
            <article key={a.id} className="rounded border border-bordureSep p-4">
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="font-bold text-encre">{a.auteur}</span>
                <Etoiles note={a.note} taille="text-sm" />
              </div>
              {a.commentaire && (
                <p className="text-[14.5px] leading-[1.5] text-grisTexte">{a.commentaire}</p>
              )}
              <p className="mt-2 font-mono text-[11px] text-grisLabel">
                Achat vérifié — {new Date(a.publieLe).toLocaleDateString("fr-FR")}
                {produit && (
                  <>
                    {" · "}
                    <Link href={`/produit/${a.slug}`} className="underline hover:opacity-70">
                      {produit.name}
                    </Link>
                  </>
                )}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
