import { NextRequest, NextResponse } from "next/server";
import { products } from "@/lib/products";
import { fluxCsv, fluxTsv, rapport, type OptionsFlux } from "@/lib/amazon";

/**
 * Fichier d'inventaire Amazon Seller Central.
 *
 *   /api/amazon-feed              → flat file TSV (à recopier dans le modèle Amazon)
 *   /api/amazon-feed?format=csv   → même contenu en CSV, ouvrable dans Excel
 *   /api/amazon-feed?rapport=1    → ce qu'il manque produit par produit, en JSON
 *
 * Paramètres : ?stock=25 (stock par défaut), ?categorie=scolaire, ?base=https://…
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const stockBrut = searchParams.get("stock");
  const stock = stockBrut === null ? 0 : Number.parseInt(stockBrut, 10);
  if (Number.isNaN(stock) || stock < 0) {
    return NextResponse.json(
      { error: "Paramètre « stock » invalide : entier positif attendu." },
      { status: 400 }
    );
  }

  const categorie = searchParams.get("categorie");
  const liste = categorie
    ? products.filter((p) => p.categorie === categorie)
    : products;

  if (liste.length === 0) {
    return NextResponse.json(
      { error: `Aucun produit dans la catégorie « ${categorie} ».` },
      { status: 404 }
    );
  }

  const options: OptionsFlux = {
    quantiteParDefaut: stock,
    ...(searchParams.get("base") ? { baseUrl: searchParams.get("base")! } : {}),
  };

  if (searchParams.get("rapport")) {
    return NextResponse.json(rapport(liste, options));
  }

  const csv = searchParams.get("format") === "csv";
  const jour = new Date().toISOString().slice(0, 10);
  const nom = `serviotek-amazon-${jour}.${csv ? "csv" : "txt"}`;

  return new NextResponse(csv ? fluxCsv(liste, options) : fluxTsv(liste, options), {
    headers: {
      "Content-Type": csv
        ? "text/csv; charset=utf-8"
        : "text/tab-separated-values; charset=utf-8",
      "Content-Disposition": `attachment; filename="${nom}"`,
      "Cache-Control": "no-store",
    },
  });
}
