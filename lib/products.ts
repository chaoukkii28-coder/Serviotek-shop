
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
export type AmazonData = {
  /** EAN-13 (GS1 France) ou UPC. Sans lui : exemption GTIN à demander. */
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
  /**
   * Informations exigées par le règlement européen GPSR (UE 2023/988) sur
   * chaque fiche produit : coordonnées du fabricant hors UE et avertissements
   * de sécurité en français. Le fabricant vient de la fiche fournisseur
   * réelle (Amazon Business « Informations sur le fabricant », ou Temu
   * « Informations sur le professionnel »), jamais inventé.
   */
  conformite?: {
    fabricant: { nom: string; adresse: string };
    avertissements: string[];
  };
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
    conformite: {
      fabricant: {
        nom: "Shenzhen Trusang Technology Co., Ltd.",
        adresse:
          "A315, Building A, Huafeng International Robot Industrial Park, Xi Xiang Street, Bao'an District, Shenzhen, Guangdong, Chine",
      },
      avertissements: [
        "Étanchéité IP68 : ne pas utiliser pour la natation ou un bain chaud, ni immerger volontairement.",
        "Tenir hors de portée des jeunes enfants (bracelet et petites pièces, risque d'ingestion).",
        "Recharger uniquement avec un câble compatible, sans laisser l'appareil en charge sans surveillance prolongée.",
        "Interrompre l'utilisation et consulter un médecin en cas d'irritation cutanée persistante.",
        "Ne pas exposer à des chocs violents, à la poussière excessive ou à des températures extrêmes.",
        "Les données de fréquence cardiaque et de santé sont indicatives et ne remplacent pas un avis médical.",
      ],
    },
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
    conformite: {
      fabricant: {
        nom: "DG Senya Electronics Technology Co., Ltd.",
        adresse: "NO.52 Nanshe Road Dongfeng, Humen Town, Dongguan, Guangdong, Chine",
      },
      avertissements: [
        "Étanchéité IP68 : ne pas utiliser pour la natation ou un bain chaud, ni immerger volontairement.",
        "Tenir hors de portée des jeunes enfants (bracelet et petites pièces, risque d'ingestion).",
        "Recharger uniquement avec un câble compatible, sans laisser l'appareil en charge sans surveillance prolongée.",
        "Interrompre l'utilisation et consulter un médecin en cas d'irritation cutanée persistante.",
        "Ne pas exposer à des chocs violents ni à des températures extrêmes.",
        "Les données de fréquence cardiaque et de santé sont indicatives et ne remplacent pas un avis médical.",
      ],
    },
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
    conformite: {
      fabricant: {
        nom: "Shenzhenshimoshengchuangxinjishuyouxiangongsi",
        adresse: "Bao'an Qu, Xixiang Jiedao, Tiezai Lu 60 Hao, Shenzhen, Guangdong, Chine",
      },
      avertissements: [
        "Tenir hors de portée des jeunes enfants (petites pièces, risque d'ingestion ou d'étouffement).",
        "Ne pas utiliser à volume élevé de façon prolongée : risque pour l'audition.",
        "Étanchéité IPX6 : résiste à la transpiration et aux projections, mais ne pas immerger dans l'eau.",
        "Ne pas utiliser les écouteurs pendant leur charge.",
        "Interrompre l'utilisation en cas d'inconfort, de gêne auriculaire ou d'irritation.",
        "Ne pas exposer le boîtier de charge à une source de chaleur ou à l'humidité excessive.",
      ],
    },
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
    conformite: {
      fabricant: {
        nom: "Shenzhen Shi Saiyin Dianzi Youxiangongsi",
        adresse:
          "201, 145-5 No. Furui Road, Xintian Community, Fuhai Street, Bao'an District, Shenzhen, Guangdong, 518103, Chine",
      },
      avertissements: [
        "Ne pas exposer l'appareil à l'humidité, aux projections d'eau ou à une chaleur excessive.",
        "Débrancher l'alimentation avant tout nettoyage.",
        "Ne pas obstruer les ouvertures de ventilation lors du montage mural.",
        "Utiliser uniquement le câble et le bloc d'alimentation fournis ou compatibles.",
        "Tenir hors de portée des jeunes enfants (petites pièces, cordons).",
        "Ne pas utiliser à volume élevé de façon prolongée : risque pour l'audition.",
      ],
    },
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
    conformite: {
      fabricant: {
        nom: "Shenzhen Topstar Industry Co., Ltd.",
        adresse:
          "4011, Baoshan Times Building, Minqiang Community, Minzhi Street, Longhua District, Shenzhen, Guangdong, 518000, Chine",
      },
      avertissements: [
        "Utiliser uniquement avec un adaptateur secteur compatible fournissant une puissance suffisante.",
        "Ne pas placer d'objets métalliques (pièces, clés, cartes à bande magnétique) entre le téléphone et le chargeur.",
        "Ne pas recouvrir l'appareil pendant la charge, pour éviter toute surchauffe.",
        "Tenir hors de portée des jeunes enfants (petites pièces, cordon).",
        "Ne pas utiliser si le câble ou le boîtier est endommagé.",
        "Ne pas exposer à l'humidité ou immerger dans l'eau.",
      ],
    },
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
    conformite: {
      fabricant: {
        nom: "Zhengzhou Jiangxu Electronic Commerce Co., Ltd.",
        adresse:
          "4e étage, unité 1, bâtiment 3 Guanjing Junyue, no. 27 rue Longteng 4, Nouveau district de Zhengdong, Zhengzhou, Henan, 450008, Chine",
      },
      avertissements: [
        "Tenir hors de portée des jeunes enfants (petites pièces, risque d'ingestion ou d'étouffement).",
        "Ne pas utiliser à volume élevé de façon prolongée : risque pour l'audition.",
        "Étanchéité IPX7 : résiste à la pluie, à la transpiration et aux éclaboussures, mais ne pas immerger durablement dans l'eau.",
        "Ne pas utiliser les écouteurs pendant leur charge.",
        "Interrompre l'utilisation en cas d'inconfort ou d'irritation auriculaire.",
        "Ne pas exposer le boîtier de charge à une chaleur excessive ou à l'humidité.",
      ],
    },
  },
  {
    slug: "fontaine-eau-chat-automatique",
    name: "Fontaine à eau automatique pour chat en inox",
    price: 39.90,
    tagline: "Une eau fraîche et filtrée, sans fil",
    description:
      "Fontaine à eau automatique en acier inoxydable pour chat et chien, sur batterie rechargeable via câble USB pour une installation libre, sans prise ni câble à proximité de la gamelle. Circulation d'eau qui encourage l'animal à boire davantage, pompe ultra-silencieuse, système de filtration multicouche et grande capacité pour une autonomie de plusieurs jours.",
    specs: [
      { label: "Matière", value: "Acier inoxydable, résistant et facile à nettoyer" },
      { label: "Capacité", value: "Environ 2,6 L" },
      { label: "Pompe", value: "Circulation continue, fonctionnement ultra-silencieux" },
      { label: "Filtration", value: "Filtre multicouche remplaçable" },
      { label: "Alimentation", value: "Batterie rechargeable, recharge par câble USB" },
      { label: "Usage", value: "Chats et petits chiens" },
    ],
    images: [
      "/images/fontaine-eau-chat-automatique/fontaine-1-produit-hero.jpg",
      "https://images.unsplash.com/photo-1626803264630-6053d8672c23?w=1200&auto=format&fit=crop",
    ],
    categorie: "maison",
    badge: "Nouveau",
    conformite: {
      fabricant: {
        nom: "Shenzhenshilanpaimaoyi Co., Ltd.",
        adresse:
          "Floor A, Building C, New Plant, Area A, Fuyuan Factory, Minzhu Jiujiu Industrial Zone, Shatou Community, Shajing Street, Bao'an District, 518101, Guangdong Province, Shenzhen, Chine",
      },
      avertissements: [
        "Tenir hors de portée des jeunes enfants (petites pièces, risque d'ingestion).",
        "Ne pas immerger le boîtier de charge dans l'eau : seul le bac est prévu pour être rempli.",
        "Débrancher avant nettoyage ou remplacement du filtre.",
        "Ne pas utiliser si le câble ou le boîtier est endommagé.",
        "Nettoyer régulièrement pour éviter la prolifération bactérienne.",
        "Surveiller l'animal lors des premières utilisations.",
      ],
    },
  },
  {
    slug: "pistolet-a-clou-sans-fil",
    name: "Pistolet à clou manuel 5 niveaux de puissance",
    price: 34.90,
    tagline: "Cloue vite, cloue sans effort, sans batterie à recharger",
    description:
      "Pistolet à clou manuel en acier à mécanisme à ressort, pour travaux de menuiserie et bricolage courant. 5 niveaux de puissance réglables selon le matériau, poignée ergonomique antidérapante. Aucune batterie à recharger, aucun compresseur nécessaire : prêt à l'emploi immédiatement. Livré complet avec 110 clous ronds, mallette de transport, gants de protection et pièces de rechange.",
    specs: [
      { label: "Type", value: "Manuel, mécanisme à ressort (sans batterie, sans compresseur)" },
      { label: "Puissance", value: "5 niveaux réglables selon le matériau" },
      { label: "Usage", value: "Menuiserie, finitions, bricolage courant" },
      { label: "Poignée", value: "Ergonomique, prise antidérapante" },
      { label: "Contenu du kit", value: "110 clous ronds, mallette de transport, gants de protection, ressorts de rechange" },
    ],
    images: [
      "/images/pistolet-a-clou-sans-fil/pistolet-1-produit-hero.jpg",
      "https://images.unsplash.com/photo-1773430273016-630960da6aa7?w=1200&auto=format&fit=crop",
      "https://images.pexels.com/photos/12172496/pexels-photo-12172496.jpeg?cs=srgb&dl=pexels-sadie-burnell-234744502-12172496.jpg&fm=jpg",
    ],
    categorie: "bricolage",
    badge: "Nouveau",
    conformite: {
      fabricant: {
        nom: "Wangxiaoling",
        adresse:
          "No. 012, Yimin Street, Zhoucun, Yuanzhuang Town, Wenshang County, 272501, Shandong Province, Jining City, Chine",
      },
      avertissements: [
        "Port de lunettes de protection recommandé lors de l'utilisation.",
        "Tenir hors de portée des enfants.",
        "Ne jamais diriger l'appareil vers une personne, un animal ou soi-même.",
        "Utiliser uniquement les clous fournis ou compatibles avec l'appareil.",
        "Ne pas utiliser sur des matériaux inadaptés (métal dur, béton, etc.).",
        "Lire la notice avant la première utilisation.",
      ],
    },
  },
];


/** Quantité maximale d'une même référence par commande. */
export const QUANTITE_MAX = 20;

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
