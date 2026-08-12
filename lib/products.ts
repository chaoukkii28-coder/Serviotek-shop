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
    slug: "montre-connectee-hosgubo",
    name: "Montre connectée Hosgubo",
    price: 47.90,
    tagline: "Élégance et suivi santé au poignet",
    description:
      "Montre connectée coloris Rose pêche, pour suivre votre activité et rester joignable au quotidien.",
    specs: [
      { label: "Couleur", value: "Rose pêche" },
      { label: "Connexion", value: "Bluetooth" },
      { label: "Usage", value: "Suivi d'activité" },
    ],
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
  },
  {
    slug: "montre-connectee-cillso",
    name: "Montre connectée Cillso",
    price: 47.90,
    tagline: "Style sobre, fonctions complètes",
    description:
      "Montre connectée coloris Noir, alliant design épuré et fonctions de suivi santé.",
    specs: [
      { label: "Couleur", value: "Noir" },
      { label: "Connexion", value: "Bluetooth" },
      { label: "Usage", value: "Suivi d'activité" },
    ],
    image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=800",
  },
  {
    slug: "support-telephone-voiture-induction",
    name: "Support téléphone voiture à induction 15W",
    price: 62.90,
    tagline: "Chargez votre téléphone en conduisant",
    description:
      "Support de voiture avec charge par induction rapide 15W, fixation stable pour une utilisation en toute sécurité.",
    specs: [
      { label: "Puissance de charge", value: "15W max" },
      { label: "Fixation", value: "Voiture, grille d'aération / pare-brise" },
      { label: "Compatibilité", value: "Smartphones compatibles charge sans fil" },
    ],
    image: "https://images.unsplash.com/photo-1601972602288-3be527b4f18a?w=800",
  },
  {
    slug: "ecouteurs-xulinse",
    name: "Écouteurs sans fil XuLinSe",
    price: 26.90,
    tagline: "Le son sans les fils, à petit prix",
    description:
      "Écouteurs Bluetooth sans fil, disponibles en plusieurs coloris, avec boîtier de charge.",
    specs: [
      { label: "Coloris disponibles", value: "Bleu, Rose, Rose clair" },
      { label: "Connexion", value: "Bluetooth" },
      { label: "Livré avec", value: "Boîtier de charge" },
    ],
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800",
  },
  {
    slug: "collier-chat-airtag",
    name: "Collier chat avec emplacement AirTag",
    price: 35.90,
    tagline: "Gardez un œil sur votre compagnon",
    description:
      "Collier pour chat avec emplacement intégré pour AirTag, permettant la localisation de votre animal.",
    specs: [
      { label: "Couleur", value: "Noir" },
      { label: "Compatibilité", value: "AirTag (non inclus)" },
      { label: "Usage", value: "Localisation animal" },
    ],
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800",
  },
  {
    slug: "barre-de-son-saiyin-40w",
    name: "Barre de son Saiyin 40W",
    price: 142.90,
    tagline: "Un son puissant pour votre salon",
    description:
      "Barre de son 40W offrant un rendu sonore riche, idéale pour améliorer l'audio de votre téléviseur.",
    specs: [
      { label: "Puissance", value: "40W" },
      { label: "Usage", value: "Home cinéma / TV" },
    ],
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800",
  },
  {
    slug: "chargeur-induction-iniu-15w",
    name: "Chargeur à induction INIU 15W",
    price: 48.42,
    tagline: "Charge rapide, lumière nocturne adaptative",
    description:
      "Chargeur à induction 15W à charge rapide avec lumière nocturne adaptative, idéal pour le bureau ou le voyage.",
    specs: [
      { label: "Couleur", value: "Noir" },
      { label: "Puissance de charge", value: "15W max" },
      { label: "Fonction", value: "Lumière nocturne adaptative" },
    ],
    image: "https://images.unsplash.com/photo-1591290619762-c6c9998ee5da?w=800",
  },
  {
    slug: "imprimante-epson-xp-2200",
    name: "Imprimante Epson Expression Home XP-2200",
    price: 146.97,
    tagline: "Impression, numérisation et copie, tout-en-un",
    description:
      "Imprimante 3-en-1 : impression, numérisation, copie. WiFi Direct, ultra-compacte, cartouches d'encre séparées.",
    specs: [
      { label: "Fonctions", value: "Impression, numérisation, copie" },
      { label: "Connexion", value: "WiFi Direct" },
      { label: "Format", value: "Ultra-compacte, A4" },
    ],
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eabd?w=800",
  },
  {
    slug: "xiaomi-redmi-buds-8-active",
    name: "Xiaomi Redmi Buds 8 Active",
    price: 50.97,
    tagline: "Jusqu'à 37h d'autonomie",
    description:
      "Écouteurs sans fil Semi-Intra avec transducteur titane 14,2mm, basses puissantes et réduction de bruit IA lors des appels.",
    specs: [
      { label: "Couleur", value: "Noir" },
      { label: "Autonomie", value: "37h avec boîtier de charge" },
      { label: "Connexion", value: "Bluetooth 5.4" },
      { label: "Étanchéité", value: "IP54" },
    ],
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800",
  },
  {
    slug: "poubelle-silverlake-70l",
    name: "Poubelle de cuisine automatique SILVERLAKE 70L",
    price: 479.94,
    tagline: "Ouverture automatique, grande capacité",
    description:
      "Poubelle de cuisine automatique 70L en acier Inox avec cerclage, ouverture papillon pour une hygiène optimale.",
    specs: [
      { label: "Capacité", value: "70L" },
      { label: "Matière", value: "Acier Inox" },
      { label: "Ouverture", value: "Automatique, papillon" },
    ],
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800",
  },
];
export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
