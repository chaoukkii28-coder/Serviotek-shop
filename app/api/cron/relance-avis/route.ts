import { NextRequest, NextResponse } from "next/server";
import { commandesARelancerPourAvis, marquerRelanceAvisEnvoyee } from "@/lib/compte-db";
import { urlAbsolue } from "@/lib/site";

/**
 * Déclenché quotidiennement par le cron Vercel (voir vercel.json). Relance
 * par e-mail les clients dont la commande a plus de 7 jours pour leur
 * proposer de laisser un avis — jamais de faux avis générés, uniquement une
 * invitation envoyée à de vrais acheteurs (voir docs/avis-clients.md).
 */
export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "RESEND_API_KEY manquant." }, { status: 500 });
  }

  const commandes = await commandesARelancerPourAvis();
  let envoyes = 0;
  const echecs: string[] = [];

  for (const commande of commandes) {
    const lienAvis = urlAbsolue(
      `/commande-confirmee?session_id=${encodeURIComponent(commande.sessionStripe)}`
    );
    const listeProduits = commande.produits.map((p) => `- ${p.nom}`).join("\n");

    try {
      const reponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Serviotek <avis@serviotek.com>",
          to: commande.email,
          subject: "Votre avis compte pour nous",
          text: `Bonjour,

Vous avez récemment commandé sur Serviotek :
${listeProduits}

Votre avis nous aide beaucoup — et aide aussi les prochains clients à choisir.
Pouvez-vous prendre une minute pour noter votre commande ?

${lienAvis}

Merci,
L'équipe Serviotek`,
        }),
      });

      if (!reponse.ok) {
        echecs.push(commande.sessionStripe);
        continue;
      }

      await marquerRelanceAvisEnvoyee(commande.sessionStripe);
      envoyes++;
    } catch {
      echecs.push(commande.sessionStripe);
    }
  }

  return NextResponse.json({ envoyes, echecs: echecs.length });
}
