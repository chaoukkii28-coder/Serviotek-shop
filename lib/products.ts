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
  images: string[];
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
      "Montre connectée coloris Rose pêche avec grand écran tactile HD 1,91 pouces. Suivi de la fréquence cardiaque et du sommeil 24h/24, plus de 110 modes sportifs, réponse aux appels Bluetooth et notifications intelligentes (SMS, réseaux sociaux).",
    specs: [
      { label: "Couleur", value: "Rose pêche" },
      { label: "Écran", value: "1,91 pouces HD tactile, 200+ cadrans" },
      { label: "Connexion", value: "Bluetooth 5.0, iOS 9.0+ / Android 4.0+" },
      { label: "Suivi santé", value: "Fréquence cardiaque et sommeil 24h/24, 7j/7" },
      { label: "Sport", value: "Plus de 110 modes sportifs" },
      { label: "Fonctions", value: "Appels Bluetooth, notifications intelligentes" },
      { label: "Usage", value: "Suivi d'activité" },
    ],
    images: [
      "/images/montre-connectee-hosgubo/1-produit-hero.jpg",
      "/images/montre-connectee-hosgubo/8-suivi-sante.jpg",
      "/images/montre-connectee-hosgubo/7-modes-sportifs.jpg",
      "/images/montre-connectee-hosgubo/2-frequence-cardiaque.jpg",
      "/images/montre-connectee-hosgubo/3-suivi-sommeil.jpg",
      "/images/montre-connectee-hosgubo/4-ecran-ultra-large.jpg",
      "/images/montre-connectee-hosgubo/5-notifications.jpg",
      "/images/montre-connectee-hosgubo/6-appels-bluetooth.jpg",
    ],
    categorie: "bien-etre",
  },
  {
    slug: "montre-connectee-cillso",
    name: "Montre connectée Cillso",
    price: 47.90,
    tagline: "Style sobre, fonctions complètes",
    description:
      "Montre connectée coloris Noir avec appels Bluetooth 5.3, micro intégré et son Hi-Fi. Plus de 110 modes sportifs, contrôle musique, commande appareil photo à distance et réveil intelligent.",
    specs: [
      { label: "Couleur", value: "Noir" },
      { label: "Connexion", value: "Bluetooth 5.3" },
      { label: "Appels", value: "Micro intégré, historique, 100 contacts favoris" },
      { label: "Sport", value: "Plus de 110 modes sportifs" },
      { label: "Fonctions", value: "Contrôle musique, commande appareil photo, réveil intelligent" },
      { label: "Étanchéité", value: "Résistante à l'eau" },
      { label: "Usage", value: "Suivi d'activité" },
    ],
    images: [
      "/images/montre-connectee-cillso/1-produit-hero.jpg",
      "/images/montre-connectee-cillso/2-appels-bluetooth.jpg",
      "/images/montre-connectee-cillso/3-modes-sportifs.jpg",
      "/images/montre-connectee-cillso/4-multifonctions.jpg",
    ],
    categorie: "bien-etre",
  },
  {
    slug: "ecouteurs-xulinse",
    name: "Écouteurs sans fil BUGANI",
    price: 26.90,
    tagline: "Le son sans les fils, à petit prix",
    description:
      "Écouteurs Bluetooth sans fil BUGANI avec son sans distorsion, double microphone pour des appels cristallins, étanchéité IPX6 résistante à la transpiration et jusqu'à 24h d'autonomie avec le boîtier de charge.",
    specs: [
      { label: "Couleur", value: "Noir" },
      { label: "Connexion", value: "Bluetooth" },
      { label: "Autonomie", value: "6h en continu, 24h avec boîtier de charge" },
      { label: "Étanchéité", value: "IPX6, résistant à la transpiration" },
      { label: "Micro", value: "Double microphone, appels cristallins" },
      { label: "Livré avec", value: "Boîtier de charge" },
    ],
    images: [
      "/images/ecouteurs-xulinse/1-produit-hero.jpg",
      "/images/ecouteurs-xulinse/5-etancheite-ipx6.jpg",
      "/images/ecouteurs-xulinse/2-appels-cristallins.jpg",
      "/images/ecouteurs-xulinse/3-autonomie-24h.jpg",
      "/images/ecouteurs-xulinse/4-son-sans-distorsion.jpg",
    ],
    categorie: "audio",
  },
  {
    slug: "collier-chat-airtag",
    name: "Collier chat avec emplacement AirTag",
    price: 35.90,
    tagline: "Gardez un œil sur votre compagnon",
    description:
      "Collier pour chat avec emplacement intégré pour AirTag, permettant de suivre sa position en temps réel. Bande réfléchissante visible jusqu'à 150m de nuit, boucle de sécurité qui se détache sous traction (max 3kg), taille ajustable de 19 à 32cm.",
    specs: [
      { label: "Couleur", value: "Noir" },
      { label: "Compatibilité", value: "AirTag (non inclus)" },
      { label: "Ajustable", value: "19 à 32 cm de tour de cou" },
      { label: "Poids", value: "15g" },
      { label: "Sécurité", value: "Boucle qui se détache au-delà de 3kg" },
      { label: "Visibilité nocturne", value: "Bande réfléchissante, visible jusqu'à 150m" },
      { label: "Usage", value: "Localisation animal" },
    ],
    images: [
      "/images/collier-chat-airtag/1-produit-hero.jpg",
      "/images/collier-chat-airtag/7-taille-ajustable.jpg",
      "/images/collier-chat-airtag/2-gps-tracking.jpg",
      "/images/collier-chat-airtag/3-visibilite-nocturne.jpg",
      "/images/collier-chat-airtag/4-resistance-3kg.jpg",
      "/images/collier-chat-airtag/5-poids-15g.jpg",
      "/images/collier-chat-airtag/6-etapes-installation.jpg",
      "/images/collier-chat-airtag/8-specs-icones.jpg",
    ],
    categorie: "detection",
  },
  {
    slug: "barre-de-son-saiyin-40w",
    name: "Barre de son Saiyin 40W",
    price: 94.98,
    tagline: "Un son puissant pour votre salon",
    description:
      "Barre de son 40W avec 2 haut-parleurs à pavillon carré, offrant un rendu sonore riche jusqu'à 98dB. Murale et facile à installer, connexions multiples (Bluetooth, optique, subwoofer, AUX), livrée avec télécommande.",
    specs: [
      { label: "Puissance", value: "40W" },
      { label: "Volume maximum", value: "98dB" },
      { label: "Haut-parleurs", value: "2 pavillons carrés" },
      { label: "Dimensions", value: "43 x 6,5 x 9 cm (17 x 2,5 x 3,5 pouces)" },
      { label: "Connexions", value: "Bluetooth, Optique, Subwoofer, AUX" },
      { label: "Installation", value: "Murale ou pose libre, télécommande incluse" },
      { label: "Usage", value: "Home cinéma / TV / gaming" },
    ],
    images: [
      "/images/barre-de-son-saiyin-40w/1-produit-telecommande.jpg",
      "/images/barre-de-son-saiyin-40w/5-gaming-station.jpg",
      "/images/barre-de-son-saiyin-40w/4-mur-montable.jpg",
      "/images/barre-de-son-saiyin-40w/2-specs-40w-98db.jpg",
      "/images/barre-de-son-saiyin-40w/3-connexions-multiples.jpg",
      "/images/barre-de-son-saiyin-40w/6-package-contents.jpg",
    ],
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
    images: [
      "/images/chargeur-induction-iniu-15w/2-charge-telephone.png",
      "/images/chargeur-induction-iniu-15w/1-vitesse-15w.png",
      "/images/chargeur-induction-iniu-15w/3-led-adaptatif.png",
      "/images/chargeur-induction-iniu-15w/4-photo-reelle.jpeg",
    ],
    categorie: "accessoires",
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
    images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800"],
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
    images: [
      "https://cf.cjdropshipping.com/20200811/400602831133748.jpg?x-oss-process=image/resize,m_fill,m_pad,w_1200,h_1200",
      "https://cf.cjdropshipping.com/15a6a07a-cc97-4ba0-be65-62fbc0604528.jpg?x-oss-process=image/resize,m_fill,m_pad,w_1200,h_1200",
      "https://cf.cjdropshipping.com/294d8e07-36de-4d5d-ae30-44a18273bb7c.jpg?x-oss-process=image/resize,m_fill,m_pad,w_1200,h_1200",
      "https://cf.cjdropshipping.com/a0de2b70-1c5a-413e-abac-d8546e816d67.jpg?x-oss-process=image/resize,m_fill,m_pad,w_1200,h_1200",
      "https://cf.cjdropshipping.com/424ceb42-2b08-40da-ac4b-d8b3bfe45bad.jpg?x-oss-process=image/resize,m_fill,m_pad,w_1200,h_1200",
    ],
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
    images: [
      "https://oss-cf.cjdropshipping.com/product/2025/02/28/05/0e41b5e8-b350-4d53-bd99-29ea818d1f7e_trans.jpeg?x-oss-process=image/resize,m_fill,m_pad,w_1200,h_1200",
      "https://oss-cf.cjdropshipping.com/product/2025/02/28/05/4494e548-f8a0-41e3-b51e-2c56ee4eec4b_trans.jpeg?x-oss-process=image/resize,m_fill,m_pad,w_1200,h_1200",
      "https://oss-cf.cjdropshipping.com/product/2025/02/28/05/fea37fd0-afda-42d6-9a9b-84afb5f18831_trans.jpeg?x-oss-process=image/resize,m_fill,m_pad,w_1200,h_1200",
      "https://oss-cf.cjdropshipping.com/product/2025/02/28/05/30c64971-2f04-416c-bdfb-a68d721247b5_trans.jpeg?x-oss-process=image/resize,m_fill,m_pad,w_1200,h_1200",
      "https://oss-cf.cjdropshipping.com/product/2025/02/28/05/d9adb896-b478-4621-a52b-4eabb638bfe5_trans.jpeg?x-oss-process=image/resize,m_fill,m_pad,w_1200,h_1200",
    ],
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
    images: [
      "https://cf.cjdropshipping.com/d1401982-0ff4-45dd-9707-a8d57df310fc.jpg?x-oss-process=image/resize,m_fill,m_pad,w_1200,h_1200",
      "https://cf.cjdropshipping.com/2365cce3-5c1f-405b-929a-6d7425711611.jpg?x-oss-process=image/resize,m_fill,m_pad,w_1200,h_1200",
      "https://cf.cjdropshipping.com/c157345b-ec25-45d9-b6e0-97748532774a.jpg?x-oss-process=image/resize,m_fill,m_pad,w_1200,h_1200",
      "https://cf.cjdropshipping.com/a038eb87-4c31-41b3-8dfd-6405047adf3b.jpg?x-oss-process=image/resize,m_fill,m_pad,w_1200,h_1200",
      "https://cf.cjdropshipping.com/1e80a6fd-0fb7-4e63-a204-69297867deb4.jpg?x-oss-process=image/resize,m_fill,m_pad,w_1200,h_1200",
    ],
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
    images: [
      "https://cf.cjdropshipping.com/20200301/1339906006201.jpg?x-oss-process=image/resize,m_fill,m_pad,w_1200,h_1200",
      "https://cf.cjdropshipping.com/20200301/2680199660260.jpg?x-oss-process=image/resize,m_fill,m_pad,w_1200,h_1200",
      "https://cf.cjdropshipping.com/20200301/836553023551.jpg?x-oss-process=image/resize,m_fill,m_pad,w_1200,h_1200",
      "https://cf.cjdropshipping.com/20200301/2900764033849.jpg?x-oss-process=image/resize,m_fill,m_pad,w_1200,h_1200",
      "https://cf.cjdropshipping.com/20200301/1438272440247.jpg?x-oss-process=image/resize,m_fill,m_pad,w_1200,h_1200",
    ],
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
    images: [
      "https://cf.cjdropshipping.com/18a05faa-8af6-49f9-8679-4ac28dc027e8.jpg?x-oss-process=image/resize,m_fill,m_pad,w_1200,h_1200",
      "https://cf.cjdropshipping.com/a700ad7b-a47e-44b0-8d61-cdfbc054001b.jpg?x-oss-process=image/resize,m_fill,m_pad,w_1200,h_1200",
      "https://cf.cjdropshipping.com/06f4af33-4d33-41ed-9ee2-e92a5c6d4565.jpg?x-oss-process=image/resize,m_fill,m_pad,w_1200,h_1200",
      "https://cf.cjdropshipping.com/8ff94b1f-82e9-4346-98d0-56bb9c886eee.jpg?x-oss-process=image/resize,m_fill,m_pad,w_1200,h_1200",
    ],
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
    images: [
      "https://cf.cjdropshipping.com/1d8f5985-ac42-49df-b393-b7dc09223cef.jpg?x-oss-process=image/resize,m_fill,m_pad,w_1200,h_1200",
      "https://cf.cjdropshipping.com/b81d4c91-8a1f-4e33-985a-32d651ea1355.jpg?x-oss-process=image/resize,m_fill,m_pad,w_1200,h_1200",
      "https://cf.cjdropshipping.com/ef20c35a-e390-4d35-85b0-4562be26f5ab.jpg?x-oss-process=image/resize,m_fill,m_pad,w_1200,h_1200",
      "https://cf.cjdropshipping.com/53158fba-9bd2-4748-81ae-9ae0792e2b82.jpg?x-oss-process=image/resize,m_fill,m_pad,w_1200,h_1200",
      "https://cf.cjdropshipping.com/91b57a83-17d5-4af5-a6f5-718a849ebbfe.jpg?x-oss-process=image/resize,m_fill,m_pad,w_1200,h_1200",
    ],
    categorie: "bien-etre",
  },
  {
    slug: "calculatrice-tablette-ecriture-2en1",
    name: "Calculatrice scientifique 2-en-1 avec tablette d'écriture",
    price: 29.90,
    tagline: "Calculez et notez sur le même appareil",
    description:
      "Calculatrice scientifique pliable avec tablette d'écriture LCD intégrée, écran mat bleu anti-fatigue oculaire, réutilisable à volonté. Idéale pour la rentrée.",
    specs: [
      { label: "Fonctions", value: "Calculatrice scientifique + ardoise LCD effaçable" },
      { label: "Écran", value: "LCD mat bleu, anti-fatigue oculaire" },
      { label: "Format", value: "Pliable, pocket-size" },
      { label: "Matière", value: "ABS" },
    ],
    images: [
      "https://cf.cjdropshipping.com/operation-center/file_202408151000181824023303292198912.jpg?x-oss-process=image/format,webp,image/resize,m_fill,m_pad,w_1200,h_1200",
      "https://cf.cjdropshipping.com/17085600/2402220659380328000.jpg?x-oss-process=image/resize,m_fill,m_pad,w_1200,h_1200",
      "https://cf.cjdropshipping.com/17085600/2402220659380328300.jpg?x-oss-process=image/resize,m_fill,m_pad,w_1200,h_1200",
      "https://cf.cjdropshipping.com/17085600/2402220659380328500.jpg?x-oss-process=image/resize,m_fill,m_pad,w_1200,h_1200",
      "https://cf.cjdropshipping.com/17085600/2402220659380328700.jpg?x-oss-process=image/resize,m_fill,m_pad,w_1200,h_1200",
    ],
    categorie: "accessoires",
  },
];
export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
