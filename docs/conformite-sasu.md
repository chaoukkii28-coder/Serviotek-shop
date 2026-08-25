# Conformité du site — Service SASU

État des pages légales et ce qu'il reste à compléter. Recherche faite sur
sources officielles (Légifrance, economie.gouv.fr, BOFiP, éco-organismes) le
2026-08-25. Ce document n'est pas un avis juridique : les points ci-dessous
méritent une relecture par un professionnel avant la mise en vente, en
particulier les points signalés « à confirmer ».

## Ce qui est en place

| Obligation | Où | État |
| --- | --- | --- |
| Identité de l'éditeur (dénomination, forme, capital, RCS, siège) | `/mentions-legales` | ✅ |
| Directeur de la publication | `/mentions-legales` | ✅ |
| Hébergeur et son adresse | `/mentions-legales` | ✅ |
| Identité du vendeur dans les CGV | `/cgv` § 1 | ✅ |
| Prix et modalités de paiement | `/cgv` § 3 | ✅ |
| Délai de livraison annoncé | `/cgv` § 4, `/livraison` | ✅ |
| Droit de rétractation de 14 jours | `/cgv` § 5 | ✅ |
| Formulaire type de rétractation | `/retractation` | ✅ |
| Garantie légale de conformité (2 ans) et vices cachés | `/cgv` § 6 | ✅ |
| Information sur la médiation de la consommation | `/cgv` § 8 | ⚠️ incomplet |
| Politique de confidentialité | `/confidentialité` | ✅ |
| Bandeau cookies | `components/CookieConsent.tsx` | ✅ |

## Ce qui manque — par ordre de priorité

### 1. Médiateur de la consommation — le plus urgent

**Base légale** : l'obligation de fond vient de l'**article L612-1** du Code de
la consommation (garantir un recours effectif à un médiateur), et l'obligation
d'affichage des coordonnées de **l'article L616-1** (même code). Les deux sont
en vigueur depuis le 1ᵉʳ juillet 2016, **sans seuil de chiffre d'affaires** —
l'obligation s'applique dès la première vente B2C. C'est aujourd'hui le seul
point où le site est en infraction constatable avec certitude.

**Organisme** : consulter la liste officielle et à jour sur
[economie.gouv.fr/mediation-conso](https://www.economie.gouv.fr/mediation-conso)
avant d'adhérer — **Médicys**, longtemps utilisé par des e-commerçants, a été
retiré de la liste officielle (CECMC). **CM2C** (cm2c.net) reste une option
généraliste courante pour l'e-commerce, adhésion en ligne en 24-72h.

**Coût** : nettement plus faible que redouté — de l'ordre de **50 €/an**
(ex. CM2C : 48 € pour 3 ans puis 36 €/an) pour l'adhésion, plus 50-300 € par
dossier si un litige est effectivement porté au médiateur (gratuit pour le
consommateur).

**Une fois l'adhésion faite**, compléter la section 8 des CGV avec : nom de
l'organisme, adresse postale, adresse de son site, rappel que le recours est
gratuit et intervient après une réclamation écrite préalable restée sans
réponse satisfaisante.

*Non confirmé sur source primaire* : le montant de l'amende en cas d'absence
(3 000 € / 15 000 € trouvé sur sources secondaires uniquement).

### 2. Régime de TVA à clarifier

**Seuil de franchise en base (art. 293 B du CGI), en vigueur depuis le
1ᵉʳ mars 2025** : **85 000 €** de chiffre d'affaires l'année précédente pour
la vente de marchandises, tolérance jusqu'à **93 500 €** l'année du
dépassement. Ces seuils sont reconduits pour 2026 sans changement.

Une réforme voulait abaisser ce seuil à 25 000 € au 1ᵉʳ mars 2025 ; elle a été
suspendue puis **définitivement abrogée** par la loi n°2025-1044 du
3 novembre 2025 (« loi Midy »). **Ce seuil de 25 000 € n'est jamais entré en
vigueur** — à ignorer si vous l'avez vu mentionné ailleurs.

Une recodification technique (ordonnance n°2025-1247 du 17 déc. 2025, nouveau
Code des impositions sur les biens et services) changera la référence
textuelle de la mention obligatoire, avec tolérance des deux formulations
jusqu'au 31 décembre 2027 — *date de bascule exacte non confirmée avec
certitude (1ᵉʳ septembre 2026 ou 1ᵉʳ janvier 2027 selon les sources)*.

- **Si en franchise** : mention obligatoire sur le site et les factures —
  **« TVA non applicable, article 293 B du CGI »** — aucune TVA facturée.
- **Si assujetti** : numéro de TVA intracommunautaire (format `FR` + 2 chiffres
  + SIREN 9 chiffres) dans les mentions légales et sur les factures (art. 242
  nonies A, annexe II du CGI), taux appliqué indiqué. Demande via l'espace
  professionnel sur impots.gouv.fr, délai 2 à 4 semaines.

**Pour Amazon** : deux seuils distincts à ne pas confondre — le seuil français
ci-dessus, et le **seuil unique intra-UE de 10 000 €** de ventes à distance
cumulées (tous pays UE hors France) qui impose la TVA du pays de destination
(régime OSS possible). Le stockage en FBA dans un pays UE impose en plus un
numéro de TVA local dans **chaque pays de stockage**, sans condition de seuil.

### 3. Documentation technique et marquage CE — le risque le plus élevé

C'est le point le plus engageant : les produits sont sourcés hors UE et
revendus sous le nom de la SASU. En droit européen, quand le fabricant chinois
n'a **aucun représentant établi dans l'UE**, **l'importateur (Service SASU)
est responsable du produit vis-à-vis des autorités**, au même titre qu'un
fabricant — un marquage CE apposé en Chine n'a aucune valeur probante
automatique (confusion fréquente avec le sigle « China Export », visuellement
proche mais sans rapport avec la réglementation UE).

Pour chaque référence vendue (écouteurs Bluetooth, montres connectées,
chargeurs), il faut pouvoir produire sur demande DGCCRF/douanes :
- la **déclaration UE de conformité** du fabricant (directives applicables :
  RED 2014/53/UE pour le sans-fil, DEEE, RoHS) ;
- un **dossier technique** minimal (notices, rapports d'essais) ;
- conservés **10 ans** à partir de la mise sur le marché (durée à vérifier
  précisément article par article de l'annexe RED concernée) ;
- le produit/emballage doit porter le nom et l'adresse de contact de
  l'importateur (obligation propre à l'importateur, distincte du fabricant).

À traiter **produit par produit**, pas de façon générique — c'est le point où
un contrôle serait le plus pénalisant.

### 4. Éco-organisme DEEE et éco-participation

Au sens de l'**article R543-174 du Code de l'environnement**, une entreprise
qui « met sur le marché national, à titre professionnel, des équipements en
provenance d'un pays tiers » est un **« producteur »** DEEE (le terme légal
exact, pas « importateur »). Obligations :

1. Inscription au **registre national des producteurs** (ADEME, plateforme
   SYDEREP) → identifiant unique (IDU) à afficher dans les CGV.
2. Adhésion à un éco-organisme agréé — deux options principales, **distinctes
   l'une de l'autre** (pas de fusion) : **Ecosystem** ou **Ecologic**.
3. **Éco-participation** : montant par barème annuel de l'éco-organisme choisi
   (barèmes publiés en PDF, ex. celui d'Ecologic) — *montants unitaires pour
   écouteurs/montres/chargeurs non récupérés, à consulter directement sur le
   barème avant calcul de marge*. Doit être **affichée séparément du prix**
   sur la fiche produit et au tunnel d'achat. Déclaration périodique
   (généralement trimestrielle) des quantités vendues.
4. Marquage physique du produit : symbole de la **poubelle barrée**.

À intégrer dans le calcul des marges (voir la règle de prix mémorisée : coût
fournisseur × 2, marge Amazon 35 %) comme un coût direct supplémentaire, pas
un simple frais administratif.

### 5. Numéro SIREN — ✅ déjà en place

Nuance découverte à la recherche : les textes imposent le **numéro unique
d'identification (SIREN)**, pas littéralement le SIRET — art. **R123-237 du
Code de commerce** (documents commerciaux) et art. **1-1 de la LCEN**
(mentions légales du site) demandent tous deux SIREN + « RCS » + ville du
greffe, pas le SIRET.

Vérifié dans le code : le SIREN **104 280 516** (confirmé sur le PV de
modification de l'objet social du 15 août 2026) est déjà affiché au bon
format sur `/mentions-legales` (`app/mentions-legales/page.tsx:16`) et `/cgv`
(`app/cgv/page.tsx:17`). **Rien à faire sur ce point.**

### 6. Moyen de contact — risque le plus faible, contrairement à l'audit précédent

**Art. L221-5 du Code de la consommation** impose des « coordonnées postales,
téléphoniques et électroniques », mais la **CJUE (10 juillet 2019, aff.
C-649/17, Amazon EU)** a jugé qu'un numéro de téléphone n'est **pas
obligatoire dans tous les cas** dès lors que d'autres moyens de contact
« direct et efficace » sont proposés (chat en ligne, système de rappel) —
cette jurisprudence s'impose aux juridictions françaises.

Un e-mail avec délai de réponse affiché (déjà 48h ouvrées, § 7 des CGV) est
*a priori* défendable à ce titre. **Nuance non tranchée** : l'article 1-1 de
la LCEN (mentions légales, point 5 ci-dessus) mentionne lui aussi un numéro de
téléphone pour l'identification de l'éditeur — régime juridique distinct de
L221-5, et il n'est pas confirmé que la souplesse de la CJUE s'y applique
aussi. Ajouter un chat en ligne resterait une amélioration utile mais non
urgente.

## Point de vigilance sur le modèle de vente

Les CGV indiquent que les produits sont « expédiés directement depuis nos
fournisseurs, y compris depuis l'étranger ». C'est honnête, et c'est
nécessaire. Le vendeur reste seul responsable vis-à-vis du client (garantie
légale, retards, conformité) — le fournisseur chinois n'est pas opposable au
consommateur, et Service SASU est le « producteur »/importateur au sens
réglementaire pour le marquage CE et les DEEE (voir points 3 et 4).

## Note sur la plateforme européenne RLL

Il n'est plus utile d'ajouter un lien vers la plateforme européenne de
règlement en ligne des litiges : la Commission a mis fin à ce service. Un lien
vers cette plateforme sur un site marchand aujourd'hui pointerait dans le vide.

## Priorité recommandée

1. **Médiateur de la consommation** — coût faible (≈50€/an), procédure
   rapide, seul point en infraction certaine dès aujourd'hui.
2. **Statut TVA** — vérifier le CA réel vs seuil 85 000€/93 500€, afficher la
   bonne mention. Bloquant pour Amazon Marketplace/FBA.
3. **Documentation technique par produit** (déclarations UE de conformité) —
   risque le plus élevé en cas de contrôle, responsabilité non reportable sur
   le fournisseur.
4. **Éco-organisme DEEE** — obligation financière récurrente à intégrer aux
   marges.
5. **SIREN sur mentions légales/factures** — correction rapide et gratuite.
6. **Moyen de contact** — risque modéré grâce à la jurisprudence CJUE, à
   améliorer mais non urgent.
