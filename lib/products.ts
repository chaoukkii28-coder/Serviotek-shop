
export type Categorie =
  | "audio"
  | "maison"
  | "bricolage"
  | "detection"
  | "bien-etre"
  | "accessoires";

/**
 * Informations exigées par Amazon Seller Central et absentes d'une fiche
 * boutique classique. Tant qu'elles ne sont pas remplies, le produit sort
 * dans le rapport de /api/amazon-feed?rapport=1 comme non publiable.
 */
export type AmazonData = {slug: "fontaine-eau-chat-automatique",
    name: "Fontaine à eau automatique pour chat en inox",
    price: 27.90,
    tagline: "Une eau fraîche et filtrée, en continu",
    description:
      "Fontaine à eau automatique en acier inoxydable pour chat et chien, avec circulation continue qui encourage l'animal à boire davantage. Pompe ultra-silencieuse, système de filtration multicouche et grande capacité pour une autonomie de plusieurs jours.",
    specs: [
      { label: "Matière", value: "Acier inoxydable, résistant et facile à nettoyer" },
      { label: "Capacité", value: "Environ 2 L" },
      { label: "Pompe", value: "Circulation continue, fonctionnement ultra-silencieux" },
      { label: "Filtration", value: "Filtre multicouche remplaçable" },
      { label: "Alimentation", value: "USB" },
      { label: "Usage", value: "Chats et petits chiens" },
    ],
    images: [
      "https://images.unsplash.com/photo-1626803264630-6053d8672c23?w=1200&auto=format&fit=crop",
    ],
    categorie: "maison",
    badge: "Nouveau",
  },
  {
    slug: "pistolet-a-clou-sans-fil",
    name: "Pistolet à clou sans fil",
    price: 49.90,
    tagline: "Cloue vite, cloue sans effort",
    description:
      "Pistolet à clou sans fil rechargeable pour travaux de menuiserie et bricolage courant. Poignée ergonomique antidérapante, déclenchement rapide et batterie longue durée pour enchaîner les finitions sans être relié à un compresseur.",
    specs: [
      { label: "Type", value: "Sans fil, sur batterie rechargeable" },
      { label: "Usage", value: "Menuiserie, finitions, bricolage courant" },
      { label: "Poignée", value: "Ergonomique, prise antidérapante" },
      { label: "Alimentation", value: "Batterie rechargeable" },
    ],
    images: [
      "https://images.unsplash.com/photo-1773430273016-630960da6aa7?w=1200&auto=format&fit=crop",
    ],
    categorie: "bricolage",
    badge: "Nouveau",
  },  /** EAN-13 (GS1 France) ou UPC. Sans lui : exemption GTIN à demander. */
  ean?: string;
  /** Marque déposée telle qu'enregistrée chez Amazon. */
  brand?: string;
  /** Fabricant, si différent de la marque. */
  manufacturer?: string;
  /** Valeur feed_product_type du modèle de la catégorie. */
  productType?: string;
  /** ID de rayon Amazon.fr (recommended_browse_nodes). */
  browseNode?: string;
  /** Pays d'origine, ex. « Chine ». */
  countryOfOrigin?: string;
  /** Stock à publier. */
  quantity?: number;
};

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
  amazon?: AmazonData;
  /**
   * Remise temporaire pour le bandeau « Offres du jour » de l'accueil.
   * Le prix barré se calcule depuis `price`, pas stocké en dur ici.
   */
  promo?: { pct: number; until: string };
};

export const products: Product[] = [
  {
    slug: "montre-connectee-hosgubo",
    name: "Montre connectée Hosgubo",
    price: 31.98,
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
    promo: { pct: 22, until: "2026-08-31T23:59:59+02:00" },
  },
  {
    slug: "montre-connectee-cillso",
    name: "Montre connectée Cillso",
    price: 31.98,
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
    price: 13.32,
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
    promo: { pct: 18, until: "2026-08-31T23:59:59+02:00" },
  },
  {
    slug: "collier-chat-airtag",
    name: "Collier chat avec emplacement AirTag",
    price: 18.00,
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
    promo: { pct: 20, until: "2026-08-31T23:59:59+02:00" },
  },
  {
    slug: "barre-de-son-saiyin-40w",
    name: "Barre de son Saiyin 40W",
    price: 80.00,
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
    promo: { pct: 20, until: "2026-08-31T23:59:59+02:00" },
  },
  {
    slug: "chargeur-induction-iniu-15w",
    name: "Chargeur à induction INIU 15W",
    price: 27.98,
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
    promo: { pct: 21, until: "2026-08-31T23:59:59+02:00" },
  },
  {
    slug: "xiaomi-redmi-buds-8-active",
    name: "Xiaomi Redmi Buds 8 Active",
    price: 30.00,
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
    promo: { pct: 20, until: "2026-08-31T23:59:59+02:00" },
  },
  {
    slug: "ecouteurs-anc-reduction-bruit",
    name: "Casque à réduction de bruit active ANC",
    price: 17.98,
    tagline: "Immersion totale, silence à la demande",
    description:
      "Écouteurs sans fil Bluetooth 5.4 avec son stéréo Hi-Fi (transducteurs 13mm), micro haute définition à finition acier premium pour des appels clairs, étanchéité IPX7 et jusqu'à 40h d'autonomie avec le boîtier de charge USB-C.",
    specs: [
      { label: "Bluetooth", value: "5.4" },
      { label: "Son", value: "Stéréo Hi-Fi, transducteurs 13mm" },
      { label: "Autonomie", value: "5h en continu, 40h avec boîtier de charge" },
      { label: "Charge", value: "USB-C, charge rapide" },
      { label: "Étanchéité", value: "IPX7, résistant pluie/transpiration/éclaboussures" },
      { label: "Micro", value: "Haute définition, finition acier premium" },
      { label: "Coloris disponibles", value: "Noir, Blanc, Rose, Vert, Bleu" },
    ],
    images: [
      "/images/ecouteurs-anc-reduction-bruit/1-produit-hero-rose.jpg",
      "/images/ecouteurs-anc-reduction-bruit/2-etancheite-ipx7.jpg",
      "/images/ecouteurs-anc-reduction-bruit/3-autonomie-40h.jpg",
      "/images/ecouteurs-anc-reduction-bruit/4-micro-acier-premium.jpg",
      "/images/ecouteurs-anc-reduction-bruit/5-son-stereo-hifi-blanc.jpg",
      "/images/ecouteurs-anc-reduction-bruit/6-bluetooth-5-4-blanc.jpg",
    ],
    categorie: "audio",
    promo: { pct: 23, until: "2026-08-31T23:59:59+02:00" },
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
    promo: { pct: 20, until: "2026-08-31T23:59:59+02:00" },
  },
  {
    slug: "camera-solaire-exterieure-wifi",
    name: "Caméra de surveillance solaire Wi-Fi 360°",
    price: 60.00,
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
    promo: { pct: 20, until: "2026-08-31T23:59:59+02:00" },
  },
  {
    slug: "visseuse-sans-fil-usb",
    name: "Perceuse-visseuse sans fil rechargeable USB",
    price: 40.00,
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
    promo: { pct: 15, until: "2026-08-31T23:59:59+02:00" },
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
    promo: { pct: 24, until: "2026-08-31T23:59:59+02:00" },
  },
  {
    slug: "calculatrice-tablette-ecriture-2en1",
    name: "Calculatrice scientifique 2-en-1 avec tablette d'écriture",
    price: 13.00,
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
    promo: { pct: 20, until: "2026-08-31T23:59:59+02:00" },
  },
  {
    slug: "projecteur-galaxie-etoiles-led",
    name: "Projecteur Galaxie & Étoiles LED",
    price: 33.00,
    tagline: "Transformez votre plafond en ciel étoilé",
    description:
      "Projecteur d'ambiance galaxie et étoiles avec effet nébuleuse multicolore, rotation 360° et haut-parleur Bluetooth intégré. Télécommande incluse, minuterie automatique et 4 vitesses de rotation pour une ambiance chambre, salon ou soirée.",
    specs: [
      { label: "Couleurs projetées", value: "Bleu, violet, vert, rose (nébuleuse multicolore)" },
      { label: "Coloris boîtier", value: "Noir, Blanc" },
      { label: "Connexion", value: "Bluetooth (haut-parleur intégré), télécommande incluse" },
      { label: "Rotation", value: "360°, 4 vitesses réglables" },
      { label: "Minuterie", value: "Arrêt automatique programmable (1h / 2h / 4h)" },
      { label: "Alimentation", value: "USB rechargeable" },
      { label: "Usage", value: "Décoration d'ambiance, chambre, soirée, cadeau" },
    ],
    images: [
      "https://images.unsplash.com/photo-1595520519880-a86c48ea536c?w=1200&auto=format&fit=crop",
    ],
    categorie: "maison",
  },
];


/** Quantité maximale d'une même référence par commande. */
export const QUANTITE_MAX = 20;

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
