import { products as catalogue, type Categorie, type Product } from "@/lib/products";
import { SITE_URL } from "@/lib/site";

/**
 * Génération du fichier d'inventaire Amazon Seller Central à partir du
 * catalogue du site. Les noms de colonnes sont ceux des « flat files »
 * Amazon : ils se recopient tels quels dans le modèle téléchargé depuis
 * Seller Central (le jeu de colonnes exact dépend de la catégorie choisie).
 */

/** Préfixe des SKU vendeur. Doit rester stable : c'est la clé d'Amazon. */
const SKU_PREFIX = "SVT-";

/**
 * Valeurs appliquées aux produits qui ne définissent pas leur propre bloc
 * `amazon`. Elles évitent d'avoir à répéter la même information sur chaque fiche.
 *
 * Restent volontairement vides parce qu'elles ne se devinent pas :
 * - l'EAN, propre à chaque référence ;
 * - le feed_product_type, qui se lit dans le modèle téléchargé sur Seller
 *   Central (voir MODELE_CONSEILLE pour le modèle à prendre par catégorie).
 */
export const DEFAUTS_AMAZON = {
  brand: "Serviotek",
  manufacturer: "Serviotek",
  countryOfOrigin: "Chine",
} as const;

/** Limites imposées par Amazon sur les champs texte. */
const MAX_ITEM_NAME = 200;
const MAX_DESCRIPTION = 2000;
const MAX_BULLET = 500;
const MAX_BULLETS = 5;
const MAX_OTHER_IMAGES = 8;
const MAX_KEYWORDS_BYTES = 250;
const MAX_SKU = 40;

export const AMAZON_COLUMNS = [
  "feed_product_type",
  "item_sku",
  "external_product_id",
  "external_product_id_type",
  "brand_name",
  "item_name",
  "manufacturer",
  "part_number",
  "standard_price",
  "currency",
  "quantity",
  "condition_type",
  "product_description",
  "bullet_point1",
  "bullet_point2",
  "bullet_point3",
  "bullet_point4",
  "bullet_point5",
  "main_image_url",
  "other_image_url1",
  "other_image_url2",
  "other_image_url3",
  "other_image_url4",
  "other_image_url5",
  "other_image_url6",
  "other_image_url7",
  "other_image_url8",
  "country_of_origin",
  "recommended_browse_nodes",
  "generic_keywords",
  "update_delete",
] as const;

export type AmazonColumn = (typeof AMAZON_COLUMNS)[number];
export type AmazonRow = Record<AmazonColumn, string>;

/**
 * Modèle de fichier Seller Central conseillé par catégorie du site.
 * À confirmer dans Seller Central (Catalogue › Ajouter des produits en
 * masse) : Amazon renomme régulièrement ses modèles.
 */
export const MODELE_CONSEILLE: Record<Categorie, string> = {
  audio: "Électronique grand public",
  maison: "Maison",
  bricolage: "Bricolage / Outillage",
  detection: "Électronique grand public",
  "bien-etre": "Santé et soins du corps",
  accessoires: "Électronique grand public",
};

const LIBELLE_CATEGORIE: Record<Categorie, string> = {
  audio: "audio",
  maison: "maison connectée",
  bricolage: "bricolage",
  detection: "détection surveillance",
  "bien-etre": "bien-être",
  accessoires: "accessoires",
};

/** Remplace tabulations et retours à la ligne : ils casseraient le TSV. */
function assainir(valeur: string): string {
  return valeur.replace(/[\t\r\n]+/g, " ").replace(/\s{2,}/g, " ").trim();
}

function tronquer(valeur: string, max: number): string {
  const propre = assainir(valeur);
  return propre.length <= max ? propre : `${propre.slice(0, max - 1).trimEnd()}…`;
}

/**
 * Les photos du site sont livrées telles que le fournisseur les a fournies :
 * format panoramique, bandes noires sur les côtés. Une version carrée 1600 px
 * sur fond blanc, conforme aux exigences Amazon, est générée dans
 * public/images-amazon — c'est elle qu'il faut envoyer.
 */
export function versionAmazon(source: string): string {
  if (!source.startsWith("/images/")) return source;
  return source.replace("/images/", "/images-amazon/").replace(/\.(png|jpeg)$/i, ".jpg");
}

/** Amazon télécharge les images : les chemins locaux doivent devenir absolus. */
export function urlImageAbsolue(source: string, baseUrl: string = SITE_URL): string {
  if (/^https?:\/\//i.test(source)) return source;
  return `${baseUrl.replace(/\/$/, "")}/${source.replace(/^\//, "")}`;
}

export function skuDepuisSlug(slug: string): string {
  return `${SKU_PREFIX}${slug}`.slice(0, MAX_SKU).toUpperCase();
}

/**
 * Valide la clé de contrôle d'un GTIN (EAN-13, UPC-12, GTIN-14).
 * Évite d'envoyer à Amazon un code saisi de travers.
 */
export function gtinValide(code: string): boolean {
  const chiffres = code.replace(/\D/g, "");
  if (![8, 12, 13, 14].includes(chiffres.length)) return false;

  const corps = chiffres.slice(0, -1).split("").reverse().map(Number);
  const cle = Number(chiffres.slice(-1));
  const somme = corps.reduce((acc, n, i) => acc + n * (i % 2 === 0 ? 3 : 1), 0);

  return (10 - (somme % 10)) % 10 === cle;
}

function typeIdentifiant(code: string): string {
  const longueur = code.replace(/\D/g, "").length;
  if (longueur === 12) return "UPC";
  if (longueur === 14) return "GTIN";
  return "EAN";
}

/** Argumentaire : accroche commerciale puis les specs les plus parlantes. */
export function pointsCles(product: Product): string[] {
  const depuisSpecs = product.specs.map((s) => `${s.label} : ${s.value}`);
  return [product.tagline, ...depuisSpecs]
    .map((b) => tronquer(b, MAX_BULLET))
    .filter(Boolean)
    .slice(0, MAX_BULLETS);
}

function motsCles(product: Product): string {
  const source = [
    LIBELLE_CATEGORIE[product.categorie],
    ...product.name.split(/\s+/),
    ...product.specs.map((s) => s.value),
  ]
    .join(" ")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((mot) => mot.length > 2);

  const uniques: string[] = [];
  for (const mot of source) {
    if (!uniques.includes(mot)) uniques.push(mot);
  }

  // Amazon compte les mots-clés en octets, pas en caractères.
  const encodeur = new TextEncoder();
  const retenus: string[] = [];
  let taille = 0;
  for (const mot of uniques) {
    const cout = encodeur.encode(retenus.length === 0 ? mot : ` ${mot}`).length;
    if (taille + cout > MAX_KEYWORDS_BYTES) break;
    retenus.push(mot);
    taille += cout;
  }

  return retenus.join(" ");
}

/**
 * Sélection de lancement : les seules références réellement publiables
 * aujourd'hui, parce qu'elles ont de vraies photos produit (4 à 8 chacune,
 * hébergées dans public/images) et recadrées au format Amazon.
 *
 * Le reste du catalogue attend : ses visuels viennent du fournisseur ou de
 * banques d'images, qu'Amazon refuse.
 */
export const SELECTION_LANCEMENT: readonly string[] = [
  "montre-connectee-hosgubo",
  "montre-connectee-cillso",
  "ecouteurs-anc-reduction-bruit",
  "ecouteurs-xulinse",
  "barre-de-son-saiyin-40w",
  "collier-chat-airtag",
  "chargeur-induction-iniu-15w",
];

export type OptionsFlux = {
  /** Domaine public du site, utilisé pour rendre les images absolues. */
  baseUrl?: string;
  /** Stock appliqué aux produits sans quantité définie. */
  quantiteParDefaut?: number;
};

export function ligneAmazon(product: Product, options: OptionsFlux = {}): AmazonRow {
  const { baseUrl = SITE_URL, quantiteParDefaut = 0 } = options;
  const amazon = product.amazon ?? {};

  const images = product.images.map((src) => urlImageAbsolue(versionAmazon(src), baseUrl));
  const bullets = pointsCles(product);
  const ean = amazon.ean?.replace(/\s/g, "") ?? "";

  const ligne = Object.fromEntries(AMAZON_COLUMNS.map((c) => [c, ""])) as AmazonRow;

  ligne.feed_product_type = amazon.productType ?? "";
  ligne.item_sku = skuDepuisSlug(product.slug);
  ligne.external_product_id = ean;
  ligne.external_product_id_type = ean ? typeIdentifiant(ean) : "";
  ligne.brand_name = amazon.brand ?? DEFAUTS_AMAZON.brand;
  ligne.item_name = tronquer(product.name, MAX_ITEM_NAME);
  ligne.manufacturer =
    amazon.manufacturer ?? amazon.brand ?? DEFAUTS_AMAZON.manufacturer;
  ligne.part_number = product.slug;
  ligne.standard_price = product.price.toFixed(2);
  ligne.currency = "EUR";
  ligne.quantity = String(amazon.quantity ?? quantiteParDefaut);
  ligne.condition_type = "New";
  ligne.product_description = tronquer(product.description, MAX_DESCRIPTION);

  bullets.forEach((bullet, i) => {
    ligne[`bullet_point${i + 1}` as AmazonColumn] = bullet;
  });

  ligne.main_image_url = images[0] ?? "";
  images.slice(1, MAX_OTHER_IMAGES + 1).forEach((url, i) => {
    ligne[`other_image_url${i + 1}` as AmazonColumn] = url;
  });

  ligne.country_of_origin =
    amazon.countryOfOrigin ?? DEFAUTS_AMAZON.countryOfOrigin;
  ligne.recommended_browse_nodes = amazon.browseNode ?? "";
  ligne.generic_keywords = motsCles(product);
  ligne.update_delete = "Update";

  return ligne;
}

export function fluxTsv(
  liste: readonly Product[] = catalogue,
  options: OptionsFlux = {}
): string {
  const lignes = liste.map((p) => ligneAmazon(p, options));
  const entete = AMAZON_COLUMNS.join("\t");
  const corps = lignes.map((l) => AMAZON_COLUMNS.map((c) => l[c]).join("\t"));

  return [entete, ...corps].join("\n");
}

function champCsv(valeur: string): string {
  return /[",;\n]/.test(valeur) ? `"${valeur.replace(/"/g, '""')}"` : valeur;
}

export function fluxCsv(
  liste: readonly Product[] = catalogue,
  options: OptionsFlux = {}
): string {
  const lignes = liste.map((p) => ligneAmazon(p, options));
  const entete = AMAZON_COLUMNS.map(champCsv).join(",");
  const corps = lignes.map((l) => AMAZON_COLUMNS.map((c) => champCsv(l[c])).join(","));

  // BOM : sans lui Excel casse les accents des descriptions françaises.
  return `﻿${[entete, ...corps].join("\n")}`;
}

export type ControleProduit = {
  slug: string;
  nom: string;
  sku: string;
  bloquants: string[];
  avertissements: string[];
  modeleConseille: string;
};

/**
 * Passe chaque produit au crible des exigences Amazon.
 * « bloquants » = le produit sera rejeté à l'upload tant que ce n'est pas rempli.
 * « avertissements » = accepté, mais susceptible d'être suspendu ensuite.
 */
export function controler(product: Product, options: OptionsFlux = {}): ControleProduit {
  const { baseUrl = SITE_URL, quantiteParDefaut = 0 } = options;
  const amazon = product.amazon ?? {};
  const bloquants: string[] = [];
  const avertissements: string[] = [];

  if (!amazon.ean) {
    bloquants.push(
      "Code EAN/GTIN manquant — à obtenir auprès de GS1 France, ou demander une exemption GTIN à Amazon"
    );
  } else if (!gtinValide(amazon.ean)) {
    bloquants.push(`Code EAN « ${amazon.ean} » invalide (clé de contrôle incorrecte)`);
  }

  if (!amazon.brand && !DEFAUTS_AMAZON.brand) {
    bloquants.push("Marque (brand_name) manquante");
  }
  if (!amazon.productType) {
    bloquants.push(
      `Type de produit (feed_product_type) manquant — modèle conseillé : ${MODELE_CONSEILLE[product.categorie]}`
    );
  }
  if (!amazon.countryOfOrigin && !DEFAUTS_AMAZON.countryOfOrigin) {
    bloquants.push("Pays d'origine manquant");
  }

  const quantite = amazon.quantity ?? quantiteParDefaut;
  if (quantite <= 0) {
    bloquants.push("Stock à 0 — l'offre ne sera pas visible à l'achat");
  }

  if (product.images.length === 0) {
    bloquants.push("Aucune image");
  } else {
    const urls = product.images.map((src) => urlImageAbsolue(src, baseUrl));

    if (urls.some((u) => u.includes("/api/vignette"))) {
      avertissements.push(
        "Vignette générée, pas une photo : Amazon exige le visuel du produit réellement vendu"
      );
    }
    if (urls.some((u) => u.includes("images.unsplash.com"))) {
      avertissements.push(
        "Photo d'illustration Unsplash : Amazon exige la photo du produit réellement vendu"
      );
    }
    if (urls.some((u) => u.includes("cjdropshipping.com"))) {
      avertissements.push(
        "Images hébergées chez le fournisseur (CJdropshipping) : vérifier les droits d'usage et l'hébergement à long terme"
      );
    }
    if (urls.some((u) => u.includes("x-oss-process="))) {
      avertissements.push(
        "URL d'image avec paramètres de redimensionnement : Amazon exige au moins 1000 px sur le plus grand côté"
      );
    }
    if (urls.some((u) => u.includes("/images-amazon/"))) {
      avertissements.push(
        "Photos recadrées au format Amazon (1600 px, fond blanc) — vérifier que la principale montre bien le produit seul"
      );
    }
    if (product.images.length < 3) {
      avertissements.push(
        `${product.images.length} image(s) seulement : viser 5 à 7 photos, la principale sur fond blanc pur`
      );
    }
  }

  if (!amazon.brand) {
    avertissements.push(
      `Marque non définie sur le produit : « ${DEFAUTS_AMAZON.brand} » est appliquée par défaut`
    );
  }
  if (!amazon.countryOfOrigin) {
    avertissements.push(
      `Pays d'origine non défini : « ${DEFAUTS_AMAZON.countryOfOrigin} » est appliqué par défaut`
    );
  }
  if (product.name.length > MAX_ITEM_NAME) {
    avertissements.push(`Titre tronqué à ${MAX_ITEM_NAME} caractères`);
  }
  if (product.description.length > MAX_DESCRIPTION) {
    avertissements.push(`Description tronquée à ${MAX_DESCRIPTION} caractères`);
  }
  if (pointsCles(product).length < MAX_BULLETS) {
    avertissements.push(
      `${pointsCles(product).length} puce(s) sur ${MAX_BULLETS} : ajouter des specs enrichit la fiche`
    );
  }

  return {
    slug: product.slug,
    nom: product.name,
    sku: skuDepuisSlug(product.slug),
    bloquants,
    avertissements,
    modeleConseille: MODELE_CONSEILLE[product.categorie],
  };
}

export type RapportAmazon = {
  genereLe: string;
  baseUrl: string;
  total: number;
  pretsAPublier: number;
  aCompleter: number;
  produits: ControleProduit[];
};

export function rapport(
  liste: readonly Product[] = catalogue,
  options: OptionsFlux = {}
): RapportAmazon {
  const produits = liste.map((p) => controler(p, options));

  return {
    genereLe: new Date().toISOString(),
    baseUrl: options.baseUrl ?? SITE_URL,
    total: produits.length,
    pretsAPublier: produits.filter((p) => p.bloquants.length === 0).length,
    aCompleter: produits.filter((p) => p.bloquants.length > 0).length,
    produits,
  };
}
