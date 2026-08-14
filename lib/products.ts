export type Categorie =
  | "audio"
  | "maison"
  | "bricolage"
  | "detection"
  | "bien-etre"
  | "accessoires";

export type Product = {
  slug: string;
  name: string;
  price: number; // en euros
  tagline: string;
  description: string;
  specs: { label: string; value: string }[];
  image: string;
  badge?: string;
  categorie: Categorie;
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
    categorie: "bien-etre",
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
    categorie: "bien-etre",
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
    categorie: "accessoires",
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
    categorie: "audio",
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
    categorie: "detection",
  },
  {
    slug: "barre-de-son-saiyin-40w",
    name: "Barre de son Saiyin 40W",
    price: 94.98,
    tagline: "Un son puissant pour votre salon",
    description:
      "Barre de son 40W offrant un rendu sonore riche, idéale pour améliorer l'audio de votre téléviseur.",
    specs: [
      { label: "Puissance", value: "40W" },
      { label: "Usage", value: "Home cinéma / TV" },
    ],
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800",
    categorie: "audio",
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
    categorie: "accessoires",
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
    categorie: "maison",
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
    categorie: "audio",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800",
  },
  {
    slug: "poubelle-silverlake-70l",
    name: "Poubelle de cuisine automatique SILVERLAKE 70L",
    price: 159.98,
    tagline: "Ouverture automatique, grande capacité",
    description:
      "Poubelle de cuisine automatique 70L en acier Inox avec cerclage, ouverture papillon pour une hygiène optimale.",
    specs: [
      { label: "Capacité", value: "70L" },
      { label: "Matière", value: "Acier Inox" },
      { label: "Ouverture", value: "Automatique, papillon" },
    ],
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800",
    categorie: "maison",
  },
  {
    slug: "ecouteurs-anc-reduction-bruit",
    name: "Casque à réduction de bruit active ANC",
    price: 54.90,
    tagline: "Immersion totale, silence à la demande",
    description:
      "Casque sans fil Bluetooth 5.0 avec réduction de bruit active (ANC), fonction appel et lecture musicale, portée 20 mètres.",
    specs: [
      { label: "Bluetooth", value: "5.0" },
      { label: "Réduction de bruit", value: "Active (ANC)" },
      { label: "Portée", value: "20 mètres" },
      { label: "Coloris disponibles", value: "Noir, Blanc, Rose, Vert, Bleu" },
    ],
    image:
      "https://cf.cjdropshipping.com/20200811/400602831133748.jpg?x-oss-process=image/format,webp,image/resize,m_fill,m_pad,w_1200,h_1200",
    categorie: "audio",
  },
  {
    slug: "prise-connectee-wifi-eu",
    name: "Prise connectée Wi-Fi standard européen 16A",
    price: 24.90,
    tagline: "Pilotez vos appareils à distance",
    description:
      "Prise connectée Wi-Fi au format européen 16A, contrôle à distance via application, coque en PC ignifugé.",
    specs: [
      { label: "Format", value: "Prise EU, 2 trous" },
      { label: "Matière", value: "PC ignifugé" },
      { label: "Connexion", value: "Wi-Fi" },
    ],
    image:
      "https://oss-cf.cjdropshipping.com/product/2025/02/28/05/0e41b5e8-b350-4d53-bd99-29ea818d1f7e_trans.jpeg?x-oss-process=image/resize,m_fill,m_pad,w_1200,h_1200",
    categorie: "maison",
  },
  {
    slug: "camera-solaire-exterieure-wifi",
    name: "Caméra de surveillance solaire Wi-Fi 360°",
    price: 59.90,
    tagline: "Toujours alimentée, jamais hors service",
    description:
      "Caméra de surveillance extérieure alimentée par panneau solaire, détection de mouvement PIR, rotation 360°, vision nocturne infrarouge et couleur, audio bidirectionnel, étanche.",
    specs: [
      { label: "Alimentation", value: "Panneau solaire + batterie intégrée" },
      { label: "Détection", value: "Mouvement PIR" },
      { label: "Rotation", value: "360° horizontal / 120° vertical" },
      { label: "Vision nocturne", value: "Infrarouge + couleur" },
      { label: "Connexion", value: "Wi-Fi 2.4G" },
    ],
    image:
      "https://cf.cjdropshipping.com/d1401982-0ff4-45dd-9707-a8d57df310fc.jpg?x-oss-process=image/resize,m_fill,m_pad,w_1200,h_1200",
    categorie: "detection",
  },
  {
    slug: "sac-a-dos-usb-scolaire",
    name: "Sac à dos étudiant avec port de charge USB",
    price: 34.90,
    tagline: "Prêt pour la rentrée, toujours chargé",
    description:
      "Sac à dos grande capacité en toile, port de charge USB extérieur avec câble intégré, poches latérales pour bouteille et parapluie. Idéal pour la rentrée scolaire.",
    specs: [
      { label: "Matière", value: "Toile" },
      { label: "Port USB", value: "Externe, câble intégré (batterie non incluse)" },
      { label: "Dimensions", value: "43 x 30 x 15 cm" },
      { label: "Coloris disponibles", value: "Noir, Gris, Bleu, Rose, Rouge, Crème" },
    ],
    image:
      "https://cf.cjdropshipping.com/20200301/1339906006201.jpg?x-oss-process=image/resize,m_fill,m_pad,w_1200,h_1200",
    categorie: "accessoires",
  },
  {
    slug: "visseuse-sans-fil-usb",
    name: "Perceuse-visseuse sans fil rechargeable USB",
    price: 44.90,
    tagline: "Compacte, puissante, toujours prête",
    description:
      "Perceuse-visseuse sans fil compacte, batterie lithium rechargeable par USB, rotation bidirectionnelle, LED intégrée pour travailler dans le noir.",
    specs: [
      { label: "Recharge", value: "USB" },
      { label: "Rotation", value: "Bidirectionnelle" },
      { label: "Éclairage", value: "LED intégrée" },
      { label: "Couple max", value: "4 Nm" },
    ],
    image:
      "https://cf.cjdropshipping.com/18a05faa-8af6-49f9-8679-4ac28dc027e8.jpg?x-oss-process=image%2Fformat%2Cwebp",
    categorie: "bricolage",
  },
  {
    slug: "masseur-nuque-ems-chauffant",
    name: "Masseur de nuque EMS chauffant",
    price: 24.90,
    tagline: "Détente instantanée après une longue journée",
    description:
      "Masseur de nuque EMS à micro-courants avec chaleur, 4 modes de massage et 12 niveaux d'intensité, design ergonomique en U, arrêt automatique après 15 minutes.",
    specs: [
      { label: "Technologie", value: "EMS micro-courants" },
      { label: "Modes", value: "4 modes, 12 niveaux d'intensité" },
      { label: "Chauffe", value: "3 secondes" },
      { label: "Alimentation", value: "USB rechargeable" },
      { label: "Sécurité", value: "Arrêt automatique après 15 min" },
    ],
    image:
      "https://cf.cjdropshipping.com/1d8f5985-ac42-49df-b393-b7dc09223cef.jpg?x-oss-process=image/format,webp,image/resize,m_fill,m_pad,w_1200,h_1200",
    categorie: "bien-etre",
  },
];
export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
