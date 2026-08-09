export type Product = {
  slug: string;
  name: string;
  price: number; // en euros
  tagline: string;
  description: string;
  specs: { label: string; value: string }[];
  image: string;
  badge?: string;
};

export const products: Product[] = [
  {
    slug: "ecouteurs-traducteur",
    name: "Écouteurs traducteur instantané",
    price: 39.9,
    tagline: "Traduction en temps réel dans l'oreille",
    description:
      "Écouteurs sans fil avec traduction vocale instantanée, pour voyager, discuter ou travailler avec des interlocuteurs étrangers sans galérer.",
    specs: [
      { label: "Langues", value: "Multi-langues" },
      { label: "Connexion", value: "Bluetooth" },
      { label: "Batterie", value: "Boîtier de charge inclus" },
      { label: "Usage", value: "Traduction bidirectionnelle" },
    ],
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800",
    badge: "Nouveau",
  },
  {
    slug: "lunettes-ia",
    name: "Lunettes IA connectées",
    price: 59.9,
    tagline: "Un assistant intelligent sur le nez",
    description:
      "Lunettes connectées avec assistant IA intégré : réponses vocales, appels mains libres et notifications discrètes, sans sortir le téléphone.",
    specs: [
      { label: "Connexion", value: "Bluetooth" },
      { label: "Assistant", value: "IA vocale intégrée" },
      { label: "Charge", value: "USB-C" },
      { label: "Audio", value: "Haut-parleurs open-ear" },
    ],
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=800",
    badge: "Nouveau",
  },
  {
    slug: "detecteur-or-performant",
    name: "Détecteur d'or extra performant",
    price: 199,
    tagline: "Détection longue portée, haute sensibilité",
    description:
      "Détecteur de métaux haute performance, optimisé pour la recherche d'or, avec réglages de sensibilité et discrimination des métaux.",
    specs: [
      { label: "Portée", value: "Longue portée" },
      { label: "Sensibilité", value: "Réglable" },
      { label: "Alimentation", value: "Piles / rechargeable" },
      { label: "Usage", value: "Terrain, plage, sol minéralisé" },
    ],
    image: "https://images.unsplash.com/photo-1622819584099-e04ccb1445b1?w=800",
    badge: "Nouveau",
  },
  {
    slug: "testeur-or-electronique",
    name: "Testeur d'or électronique",
    price: 119,
    tagline: "Vérifie la pureté en quelques secondes",
    description:
      "Appareil électronique portable pour tester la pureté de l'or sans produits chimiques, résultat rapide et fiable.",
    specs: [
      { label: "Méthode", value: "Électronique, sans acide" },
      { label: "Résultat", value: "Quelques secondes" },
      { label: "Alimentation", value: "Piles" },
      { label: "Usage", value: "Bijoux, lingots, pièces" },
    ],
    image: "https://images.unsplash.com/photo-1610375461369-d613b564f4c4?w=800",
  },
  {
    slug: "support-telephone-voiture-electrique",
    name: "Support téléphone voiture à charge électrique",
    price: 17.9,
    tagline: "Fixe et recharge en même temps",
    description:
      "Support téléphone pour voiture avec charge électrique intégrée, fixation stable sur grille d'aération, orientation à 360°.",
    specs: [
      { label: "Fixation", value: "Grille d'aération" },
      { label: "Charge", value: "USB / sans fil selon modèle" },
      { label: "Rotation", value: "360°" },
      { label: "Compatibilité", value: "La plupart des smartphones" },
    ],
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800",
  },
  {
    slug: "chargeur-sans-fil-15w",
    name: "Chargeur sans fil rapide 15W",
    price: 13.9,
    tagline: "Charge rapide, posez et rechargez",
    description:
      "Socle de charge sans fil rapide 15W, compatible avec la plupart des smartphones récents, pour une recharge sans câble en un minimum de temps.",
    specs: [
      { label: "Puissance", value: "15 W (charge rapide)" },
      { label: "Norme", value: "Qi" },
      { label: "Indicateur", value: "LED discrète" },
    ],
    image: "https://images.unsplash.com/photo-1622957461301-9c8f7a49e2ff?w=800",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
