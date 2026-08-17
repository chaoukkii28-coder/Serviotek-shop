import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { NOMS_FAMILLES, type Famille } from "@/lib/products";

/**
 * Vignette de remplacement, en attendant les photos du fournisseur.
 *
 * Elle affiche le nom du produit sur un aplat propre plutôt que de répéter
 * la même photo d'illustration sur des dizaines de fiches. Ce n'est pas une
 * photo produit : elle ne doit jamais partir sur Amazon, qui exige le visuel
 * du produit réellement vendu.
 */

const COULEURS: Record<Famille, { fond: string; accent: string }> = {
  ecriture: { fond: "#1E3A5F", accent: "#7FB3FF" },
  papier: { fond: "#1F4437", accent: "#7FE0B0" },
  classement: { fond: "#4A3418", accent: "#FFC46B" },
  geometrie: { fond: "#3A1F4D", accent: "#D19BFF" },
  bureau: { fond: "#14304A", accent: "#6FD4E8" },
  arts: { fond: "#4D1F2E", accent: "#FF9BB5" },
  sacs: { fond: "#2C2C3E", accent: "#B7BDD6" },
};

const DEFAUT = { fond: "#1A1B20", accent: "#C8FF3D" };

export function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const nom = (searchParams.get("nom") ?? "Serviotek").slice(0, 90);
  const familleBrute = searchParams.get("famille") ?? "";
  const famille = (familleBrute in NOMS_FAMILLES ? familleBrute : null) as Famille | null;
  const { fond, accent } = famille ? COULEURS[famille] : DEFAUT;

  // Les titres longs doivent rester lisibles dans un carré de 800 px.
  const taille = nom.length > 55 ? 40 : nom.length > 35 ? 48 : 58;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: fond,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 56,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 4,
            color: accent,
          }}
        >
          SERVIOTEK
        </div>

        <div
          style={{
            display: "flex",
            fontSize: taille,
            fontWeight: 700,
            lineHeight: 1.15,
            color: "#FFFFFF",
          }}
        >
          {nom}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 22,
            color: accent,
          }}
        >
          <div style={{ display: "flex", width: 40, height: 4, background: accent }} />
          {famille ? NOMS_FAMILLES[famille] : "Catalogue"}
        </div>
      </div>
    ),
    { width: 800, height: 800 }
  );
}
